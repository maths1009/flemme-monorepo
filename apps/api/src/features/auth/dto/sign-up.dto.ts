import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  firstname: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  lastname: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(12)
  password: string;

  @ApiProperty()
  @IsPhoneNumber()
  phone_number: string;
}
