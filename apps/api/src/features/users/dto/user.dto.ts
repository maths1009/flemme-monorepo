import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RoleEnum } from '@/features/roles/enum/role.enum';

/**
 * Public user info - visible to all users (profile pages, annonces, feedbacks, tracking)
 */
export class PublicUserDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiPropertyOptional()
  username?: string;

  @ApiPropertyOptional()
  profile_picture_url?: string;

  @ApiProperty()
  score: number;

  @ApiProperty()
  average_response_time: number;
}

/**
 * Private user info - only visible to the connected user (my profile)
 */
export class MyProfileDto extends PublicUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  email_verified: boolean;

  @ApiPropertyOptional()
  suspended_at?: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  notif_enabled: boolean;

  @ApiProperty({ enum: RoleEnum })
  role?: RoleEnum;
}

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  firstname?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  lastname?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  username?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  email?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  notif_enabled?: boolean;
}
