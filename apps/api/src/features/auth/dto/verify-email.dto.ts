import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({ example: 123456 })
  @IsNumber()
  code: number;
}
