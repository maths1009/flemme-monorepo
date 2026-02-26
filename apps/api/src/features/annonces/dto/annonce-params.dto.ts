import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { PaginationDto } from '@/common/dto/pagination.dto';

export class AnnonceParamsDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiProperty({
    default: 5,
    description: 'Distance in kilometers',
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  distance?: number = 5;
}
