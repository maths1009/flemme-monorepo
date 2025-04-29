import { UserDto } from '@/features/users/dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
  @ApiProperty({ type: () => UserDto })
  user: UserDto;
  @ApiProperty()
  access_token: string;
}
