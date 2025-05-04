import { TokenPayload } from '@/common/interfaces';
import { SessionsService } from '@/features/sessions/sessions.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    readonly configService: ConfigService,
    private sessionsService: SessionsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_TOKEN_SECRET') as string,
      passReqToCallback: true,
    });
  }

  async validate(_req: Request, payload: TokenPayload): Promise<TokenPayload> {
    await this.sessionsService.validateSession(payload.sid, payload.sub);
    return payload;
  }
}
