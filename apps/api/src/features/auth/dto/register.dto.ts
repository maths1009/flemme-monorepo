import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { UserDto } from '@/features/users/dto/user.dto';
import { PASSWORD_REGEX } from '../auth.helper';
import { AuthErrorMessages } from '../errors/auth-error-messages.enum';

export class RegisterDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({ example: 'johndoe', required: false })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123!' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(PASSWORD_REGEX, {
    message: AuthErrorMessages.WEAK_PASSWORD,
  })
  password: string;
}

export class RegisterResponseDto {
  @ApiProperty({ type: () => UserDto })
  user: UserDto;
}
