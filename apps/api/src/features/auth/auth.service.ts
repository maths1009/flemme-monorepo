import { randomBytes } from 'node:crypto';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dayjs from 'dayjs';
import { RedisClientType } from 'redis';
import { REDIS_SESSION_PREFIX } from '@/common/constants/redis.constants';
import { REDIS_CLIENT } from '@/common/modules';
import { EmailService } from '@/common/services/email.service';
import { FILE_SERVICE, FileServiceInterface } from '@/common/services/file.service';
import { generateOtpCode } from '@/common/utils/2fa.util';
import { comparePasswords, hashPassword } from '@/common/utils/password.util';
import { DevicesService } from '@/features/devices/devices.service';
import { UserDto } from '@/features/users/dto/user.dto';
import { User } from '@/features/users/entities/user.entity';
import { userToDto } from '@/features/users/mappers/user.mapper';
import { UsersService } from '@/features/users/users.service';
import { UserErrorMessages } from '../users/errors/user-error-message';
import { LoginResponseDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ConfirmResetPasswordDto, RequestResetPasswordDto } from './dto/reset-password.dto';
import { AuthErrorMessages } from './errors/auth-error-messages.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private devicesService: DevicesService,
    private emailService: EmailService,
    private configService: ConfigService,
    @Inject(FILE_SERVICE)
    private readonly fileService: FileServiceInterface,
    @Inject(REDIS_CLIENT) private readonly redisClient: RedisClientType,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto | null> {
    const user = await this.usersService.findByEmail(email);

    if (!user) return null;

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) return null;

    return userToDto(user);
  }

  async sendEmailVerificationEmail(user: User): Promise<void> {
    if (user.email_verified) {
      throw new BadRequestException(AuthErrorMessages.EMAIL_ALREADY_VERIFIED);
    }

    const verificationCode = generateOtpCode(6);
    await this.emailService.sendEmailVerificationEmail(user.email, user.firstname, verificationCode);
    const email_verification_code = verificationCode;
    const email_verification_expired_at = dayjs().add(15, 'minutes').toDate();
    await this.usersService.update(user.id, { email_verification_code, email_verification_expired_at });
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const user = await this.usersService.create(registerDto);

    await this.sendEmailVerificationEmail(user);

    return user;
  }

  async login(user: User, sessionId: string, userAgent?: string, ip?: string): Promise<LoginResponseDto> {
    await this.devicesService.create(sessionId, user.id, userAgent, ip);

    return {
      user: await userToDto(user, this.fileService),
    };
  }

  async logout(sessionId: string): Promise<void> {
    await this.devicesService.delete(sessionId);
    await this.redisClient.del(`${REDIS_SESSION_PREFIX}${sessionId}`);
  }

  async logoutAll(userId: string): Promise<void> {
    const sessions = await this.devicesService.findAllByUser(userId);

    for (const session of sessions) {
      await this.redisClient.del(`${REDIS_SESSION_PREFIX}${session.id}`);
    }

    await this.devicesService.deleteUserSessions(userId);
  }

  async verifyEmail(userId: string, code: number): Promise<void> {
    const user = await this.usersService.findOne(userId);
    switch (true) {
      case !user:
        throw new NotFoundException(UserErrorMessages.USER_NOT_FOUND);
      case user?.email_verified:
        throw new BadRequestException(AuthErrorMessages.EMAIL_ALREADY_VERIFIED);
      case user?.email_verification_code !== code:
        throw new BadRequestException(AuthErrorMessages.INVALID_VERIFICATION_CODE);
      case dayjs().isAfter(dayjs(user?.email_verification_expired_at)):
        throw new BadRequestException(AuthErrorMessages.VERIFICATION_CODE_EXPIRED);
    }

    await this.emailService.sendWelcomeEmail(user.email, user.firstname);

    user.email_verified = true;
    user.email_verification_code = null;
    user.email_verification_expired_at = null;
    await this.usersService.update(userId, user);
  }

  async requestPasswordReset(requestResetPasswordDto: RequestResetPasswordDto): Promise<void> {
    const { email } = requestResetPasswordDto;

    const user = await this.usersService.findByEmail(email);

    //! SECURITY: If user not found, do nothing and return
    if (!user) return;

    const resetToken = randomBytes(32).toString('hex');
    const resetExpiry = dayjs().add(1, 'hour').toDate();

    const password_reset_token = resetToken;
    const password_reset_expired_at = resetExpiry;
    await this.usersService.update(user.id, { password_reset_expired_at, password_reset_token });

    const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${resetToken}`;

    await this.emailService.sendResetPasswordEmail(user.email, user.firstname, resetUrl);
  }

  async confirmPasswordReset(confirmResetPasswordDto: ConfirmResetPasswordDto): Promise<void> {
    const { token, newPassword } = confirmResetPasswordDto;

    const user = await this.usersService.findByPasswordResetToken(token);

    if (!user) {
      throw new BadRequestException(AuthErrorMessages.INVALID_RESET_TOKEN);
    }

    if (dayjs().isAfter(dayjs(user.password_reset_expired_at))) {
      throw new BadRequestException(AuthErrorMessages.RESET_TOKEN_EXPIRED);
    }

    const hashedPassword = await hashPassword(newPassword);
    const password_reset_token = null;
    const password_reset_expired_at = null;

    await this.usersService.update(user.id, {
      password: hashedPassword,
      password_reset_expired_at,
      password_reset_token,
    });
    await this.logoutAll(user.id);
  }
}
