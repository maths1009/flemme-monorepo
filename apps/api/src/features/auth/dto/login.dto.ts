import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { MyProfileDto } from '@/features/users/dto/user.dto';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({ type: () => MyProfileDto })
  user: MyProfileDto;
}
