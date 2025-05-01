import { TokenPayload } from '@/common/interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';

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
  sign(payload: TokenPayload): string {
    const expiresIn = this.configService.get('ACCESS_TOKEN_EXPIRES_IN');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: expiresIn,
    });
  }

  /**
   * Calculate expiration date from token expires_in configuration
   * @returns Date object for token expiration
   */
  getTokenExpirationDate(): Date {
    const expiresIn = this.configService.get<string>(
      'ACCESS_TOKEN_EXPIRES_IN',
    ) as `${number}${'s' | 'm' | 'h' | 'd'}`;

    return dayjs()
      .add(
        parseInt(expiresIn.slice(0, -1), 10),
        expiresIn.slice(-1) as 's' | 'm' | 'h' | 'd',
      )
      .toDate();
  }
}
