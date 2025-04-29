import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  firstname: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  lastname: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(12)
  password: string;

  @IsPhoneNumber()
  phone_number: string;
}
