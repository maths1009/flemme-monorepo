import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from '@/common/utils/password';
import { SessionsService } from '@/features/sessions/sessions.service';
import { UserDto } from '@/features/users/dto/user.dto';
import { User } from '@/features/users/entities/user.entity';
import { userToDto } from '@/features/users/mappers/user.mapper';
import { UsersService } from '@/features/users/users.service';
import { LoginResponseDto } from './dto/login.dto';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private sessionsService: SessionsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto | null> {
    const user = await this.usersService.findByEmail(email);

    if (!user) return null;

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) return null;

    return userToDto(user);
  }

  async register(registerDto: RegisterDto, userAgent: string): Promise<RegisterResponseDto> {
    const user = await this.usersService.create(registerDto);

    const session = await this.sessionsService.create(user.id, userAgent);

    const payload: JwtPayload = { sessionId: session.id };
    const access_token = this.jwtService.sign(payload);

    return { access_token, user: userToDto(user) };
  }

  async login(user: User, userAgent: string): Promise<LoginResponseDto> {
    const session = await this.sessionsService.create(user.id, userAgent);

    const payload: JwtPayload = { sessionId: session.id };
    const access_token = this.jwtService.sign(payload);

    return { access_token, user: userToDto(user) };
  }

  async logout(sessionId: number): Promise<void> {
    await this.sessionsService.delete(sessionId);
  }

  async logoutAll(userId: number): Promise<void> {
    await this.sessionsService.deleteUserSessions(userId);
  }
}
