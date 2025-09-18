import { RoleEnum } from '@/features/roles/enum/role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}