import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignOutAllDto {
  @ApiProperty()
  @IsString()
  userId: number;
}
