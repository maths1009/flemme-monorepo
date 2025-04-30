import { isUnique } from '@/common/decorators';
import { SafeUser } from '@/common/interfaces';
import { User } from '@/features/users/entities/user.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';
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
  @isUnique({ tableName: 'users', column: 'username' })
  username: string;

  @ApiProperty()
  @IsEmail()
  @isUnique({ tableName: 'users', column: 'email' })
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(12)
  password: string;

  @ApiProperty()
  @IsPhoneNumber()
  @isUnique({ tableName: 'users', column: 'phone_number' })
  phone_number: string;
}

export class SignUpResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty({ type: OmitType(User, ['password', 'role_id']) })
  user: SafeUser;
}
