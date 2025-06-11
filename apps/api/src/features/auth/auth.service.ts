import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SessionsService } from '../sessions/sessions.service';
import { UsersService } from '../users/users.service';

import { comparePasswords } from '@/common/utils/password';
import { UserDto } from '@/features/users/dto/user.dto';
import { User } from '../users/entities/user.entity';
import { LoginResponseDto } from './dto/login.dto';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private sessionsService: SessionsService,
    private jwtService: JwtService,
  ) {}

  private toUserDto(user: User): UserDto {
    const { password, ...userDto } = user;
    return userDto;
  }

  async validateUser(email: string, password: string): Promise<UserDto | null> {
    const user = await this.usersService.findByEmail(email);

    if (!user) return null;

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) return null;

    return this.toUserDto(user);
  }

  async register(
    registerDto: RegisterDto,
    userAgent: string,
  ): Promise<RegisterResponseDto> {
    const user = await this.usersService.create(registerDto);

    const session = await this.sessionsService.create(user.id, userAgent);

    const payload: JwtPayload = { sessionId: session.id };
    const access_token = this.jwtService.sign(payload);

    return { user: this.toUserDto(user), access_token };
  }

  async login(user: User, userAgent: string): Promise<LoginResponseDto> {
    const session = await this.sessionsService.create(user.id, userAgent);

    const payload: JwtPayload = { sessionId: session.id };
    const access_token = this.jwtService.sign(payload);

    return { user: this.toUserDto(user), access_token };
  }

  async logout(sessionId: number): Promise<void> {
    await this.sessionsService.delete(sessionId);
  }

  async logoutAll(userId: number): Promise<void> {
    await this.sessionsService.deleteUserSessions(userId);
  }
}
