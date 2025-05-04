import { SafeUser } from '@/common/interfaces';
import { JwtService } from '@/common/services';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { DeviceType, OsType } from '../sessions/entities/session.entity';
import { SessionsService } from '../sessions/sessions.service';
import { User } from '../users/entities/user.entity';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private sessionsService: SessionsService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<SafeUser | null> {
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      const { password, role_id, ...result } = user;
      return result;
    }
    return null;
  }

  async register(registerDto: RegisterDto): Promise<RegisterResponseDto> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    /* user */
    const user = this.usersRepository.create({
      ...registerDto,
      password: hashedPassword,
    });
    const savedUser = await this.usersRepository.save(user);
    const { password, role_id, ...result } = savedUser;

    /* sessions */
    const session = await this.sessionsService.create(
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

  async login(
    user: SafeUser,
    deviceType: DeviceType,
    osType: OsType,
  ): Promise<LoginResponseDto> {
    /* session */
    const session = await this.sessionsService.create(
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
}
