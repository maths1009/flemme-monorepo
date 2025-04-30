import { TokenPayload } from '@/common/interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(
    private jwtService: NestJwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Creates token payload with just the user id
   * @param userId User ID
   * @returns TokenPayload with just the sub field containing the user ID
   */
  createTokenPayload(userId: number): TokenPayload {
    return {
      sub: userId,
    };
  }

  /**
   * Sign JWT token with payload
   * @param payload TokenPayload containing user information
   * @returns Signed JWT token string
   */
  signToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
    });
  }
}
