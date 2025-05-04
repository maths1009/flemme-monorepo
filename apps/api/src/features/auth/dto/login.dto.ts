import { SafeUser } from '@/common/interfaces';
import { User } from '@/features/users/entities/user.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(12)
  password: string;
}

export class LoginResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty({ type: OmitType(User, ['password', 'role_id']) })
  user: SafeUser;
}
