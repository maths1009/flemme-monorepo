import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  email_verified: boolean;

  @ApiPropertyOptional()
  email_verification_code?: string;

  @ApiPropertyOptional()
  email_verification_expired_at?: Date;

  @ApiPropertyOptional()
  profile_picture_url?: string;

  @ApiProperty()
  created_at: Date;

  @ApiPropertyOptional()
  suspended_at?: Date;

  @ApiProperty()
  notif_enabled: boolean;

  @ApiProperty()
  score: number;
}
