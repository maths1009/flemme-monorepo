import { AuthErrorMessages } from '@/features/auth/errors/auth-error-messages.enum';
import { SessionsService } from '@/features/sessions/sessions.service';
import { UserErrorMessages } from '@/features/users/errors/user-error-message';
import { UsersService } from '@/features/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import * as dayjs from 'dayjs';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private sessionsService: SessionsService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: JwtPayload): Promise<Request['user']> {
    const { sessionId } = payload;

    if (!sessionId)
      throw new UnauthorizedException(AuthErrorMessages.INVALID_TOKEN);

    const session = await this.sessionsService.findOne(sessionId);

    if (!session)
      throw new UnauthorizedException(AuthErrorMessages.SESSION_NOT_FOUND);

    if (dayjs().isAfter(dayjs(session.expired_at))) {
      await this.sessionsService.delete(sessionId);
      throw new UnauthorizedException(AuthErrorMessages.SESSION_EXPIRED);
    }

    const user = await this.usersService.findOne(session.user_id);

    if (!user)
      throw new UnauthorizedException(UserErrorMessages.USER_NOT_FOUND);

    await this.sessionsService.updateLastUsed(sessionId);

    const { password, ...userWithoutPassword } = user;

    return { ...userWithoutPassword, sessionId, role: user.role?.name };
  }
}
