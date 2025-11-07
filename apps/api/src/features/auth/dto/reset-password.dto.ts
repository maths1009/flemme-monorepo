import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { PASSWORD_REGEX } from '../auth.helper';
import { AuthErrorMessages } from '../errors/auth-error-messages.enum';

export class RequestResetPasswordDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class ConfirmResetPasswordDto {
  @ApiProperty({ example: 'abc123def456' })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({ example: 'NewPassword123!' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(PASSWORD_REGEX, {
    message: AuthErrorMessages.WEAK_PASSWORD,
  })
  newPassword: string;
}
