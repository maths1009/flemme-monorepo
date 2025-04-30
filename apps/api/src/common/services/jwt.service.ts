import { TokenPayload } from '@/common/interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtService {
  constructor(
    private jwtService: NestJwtService,
    private configService: ConfigService,
  ) {}

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

  /**
   * Verify JWT token
   * @param token JWT token string to verify
   * @returns Decoded token payload or null if invalid
   */
  async verifyToken(token: string): Promise<TokenPayload | null> {
    try {
      const payload = await this.jwtService.verifyAsync<TokenPayload>(token, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      });
      return payload;
    } catch (error) {
      return null;
    }
  }

  /**
   * Extract token from authorization header
   * @param request Express request object
   * @returns Token string or undefined if not found
   */
  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  /**
   * Create token payload from user data
   * @param userId User ID
   * @param email User email
   * @param roleId User role ID
   * @returns TokenPayload object
   */
  createTokenPayload(
    userId: number,
    email: string,
    roleId?: number,
  ): TokenPayload {
    return {
      sub: userId,
      email,
      ...(roleId !== undefined && { role_id: roleId }),
    };
  }
}
