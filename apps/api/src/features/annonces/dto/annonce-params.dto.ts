import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class AnnonceParamsDto extends PaginationDto {
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
    required: false,
    default: 5,
    description: 'Distance in kilometers',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  distance?: number = 5;
}
