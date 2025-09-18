import { PaginationDto } from '@/common/dto/pagination.dto';
import { AnnonceDto } from '@/features/annonces/dto/annonce.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateLikeDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsUUID()
  annonce_id: string;
}

export class LikeDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty({ type: AnnonceDto })
  annonce: AnnonceDto;
}

export class LikeParamsDto extends PaginationDto {
  @ApiPropertyOptional({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  user_id?: string;
}
