import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class SignOutDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  sessionId: number;
}
