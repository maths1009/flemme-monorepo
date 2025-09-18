import { SessionsService } from '@/features/sessions/sessions.service';
import { UsersService } from '@/features/users/users.service';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { EmailService } from '@/common/services/email.service';
import {
  FILE_SERVICE,
  FileServiceInterface,
} from '@/common/services/file.service';
import { generateOtpCode } from '@/common/utils/2fa.util';
import { comparePasswords } from '@/common/utils/password.util';
import { UserDto } from '@/features/users/dto/user.dto';
import { User } from '@/features/users/entities/user.entity';
import { UserMapper } from '@/features/users/mappers/user.mapper';
import * as dayjs from 'dayjs';
import { UserErrorMessages } from '../users/errors/user-error-message';
import { LoginResponseDto } from './dto/login.dto';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';
import { AuthErrorMessages } from './errors/auth-error-messages.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private sessionsService: SessionsService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private configService: ConfigService,
    @Inject(FILE_SERVICE)
    private readonly fileService: FileServiceInterface,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto | null> {
    const user = await this.usersService.findByEmail(email);

    if (!user) return null;

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) return null;

    return UserMapper.toDto(user);
  }

  async sendEmailVerificationEmail(user: User): Promise<void> {
    if (user.email_verified) {
      throw new BadRequestException(AuthErrorMessages.EMAIL_ALREADY_VERIFIED);
    }

    const verificationCode = generateOtpCode(6);
    await this.emailService.sendEmailVerificationEmail(
      user.email,
      user.firstname,
      verificationCode,
    );
    user.email_verification_code = verificationCode;
    user.email_verification_expired_at = dayjs().add(15, 'minutes').toDate();
    await this.usersService.update(user.id, user);
  }

  async register(
    registerDto: RegisterDto,
    userAgent?: string,
    ip?: string,
  ): Promise<RegisterResponseDto> {
    const user = await this.usersService.create(registerDto);

    const session = await this.sessionsService.create(user.id, userAgent, ip);

    const payload: JwtPayload = { sessionId: session.id };
    const access_token = this.jwtService.sign(payload);

    await this.sendEmailVerificationEmail(user);

    return {
      user: await UserMapper.toDto(user, this.fileService),
      access_token,
    };
  }

  async login(user: User, userAgent?: string, ip?: string): Promise<LoginResponseDto> {
    const session = await this.sessionsService.create(user.id, userAgent, ip);

    const payload: JwtPayload = { sessionId: session.id };
    const access_token = this.jwtService.sign(payload);

    return {
      user: await UserMapper.toDto(user, this.fileService),
      access_token,
    };
  }

  async logout(sessionId: string): Promise<void> {
    await this.sessionsService.delete(sessionId);
  }

  async logoutAll(userId: string): Promise<void> {
    await this.sessionsService.deleteUserSessions(userId);
  }

  async verifyEmail(userId: string, code: number): Promise<void> {
    const user = await this.usersService.findOne(userId);
    switch (true) {
      case !user:
        throw new NotFoundException(UserErrorMessages.USER_NOT_FOUND);
      case user?.email_verified:
        throw new BadRequestException(AuthErrorMessages.EMAIL_ALREADY_VERIFIED);
      case user?.email_verification_code !== code:
        throw new BadRequestException(
          AuthErrorMessages.INVALID_VERIFICATION_CODE,
        );
      case dayjs().isAfter(dayjs(user?.email_verification_expired_at)):
        throw new BadRequestException(
          AuthErrorMessages.VERIFICATION_CODE_EXPIRED,
        );
    }

    await this.emailService.sendWelcomeEmail(user.email, user.firstname);

    user.email_verified = true;
    user.email_verification_code = null;
    user.email_verification_expired_at = null;
    await this.usersService.update(userId, user);
  }
}
