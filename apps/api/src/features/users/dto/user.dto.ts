import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RoleEnum } from '@/features/roles/enum/role.enum';

export class UserDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

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
  suspended_at?: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  notif_enabled: boolean;

  @ApiProperty()
  score: number;

  @ApiProperty()
  average_response_time: number;

  @ApiProperty({ enum: RoleEnum })
  role?: RoleEnum;

  @ApiPropertyOptional()
  profile_picture_url?: string;
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
