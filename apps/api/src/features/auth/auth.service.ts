import { SafeUser } from '@/common/interfaces';
import { JwtService } from '@/common/services';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { DeviceType, OsType } from '../sessions/entities/session.entity';
import { SessionsService } from '../sessions/sessions.service';
import { User } from '../users/entities/user.entity';
import { SignInDto, SignInResponseDto } from './dto/sign-in.dto';
import { SignOutAllDto } from './dto/sign-out-all.dto';
import { SignOutDto } from './dto/sign-out.dto';
import { SignUpDto, SignUpResponseDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private sessionsService: SessionsService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser(signInDto: SignInDto): Promise<SafeUser | null> {
    const user = await this.usersRepository.findOne({
      where: { email: signInDto.email },
    });
    if (user && (await bcrypt.compare(signInDto.password, user.password))) {
      const { password, role_id, ...result } = user;
      return result;
    }
    return null;
  }

  async signUp(signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    /* user */
    const user = this.usersRepository.create({
      ...signUpDto,
      password: hashedPassword,
    });
    const savedUser = await this.usersRepository.save(user);
    const { password, role_id, ...result } = savedUser;

    /* sessions */
    const session = await this.sessionsService.createSession(
      savedUser.id,
      DeviceType.OTHER,
      OsType.OTHER,
    );

    /* token */
    const token = this.jwtService.sign({
      sid: session.id,
      sub: savedUser.id,
    });

    return {
      access_token: token,
      user: result,
    };
  }

  async signIn(
    user: SafeUser,
    deviceType: DeviceType,
    osType: OsType,
  ): Promise<SignInResponseDto> {
    /* session */
    const session = await this.sessionsService.createSession(
      user.id,
      deviceType,
      osType,
    );

    /* token */
    const token = this.jwtService.sign({
      sid: session.id,
      sub: user.id,
    });

    return {
      access_token: token,
      user,
    };
  }

  async signOut(signOutDto: SignOutDto): Promise<string> {
    await this.sessionsService.invalidateSession(
      signOutDto.sessionId,
      signOutDto.userId,
    );
    return 'Successfully signed out';
  }

  async signOutAllDevices(signOutAllDto: SignOutAllDto): Promise<string> {
    await this.sessionsService.invalidateAllSessions(signOutAllDto.userId);
    return 'Successfully signed out from all devices';
  }
}
