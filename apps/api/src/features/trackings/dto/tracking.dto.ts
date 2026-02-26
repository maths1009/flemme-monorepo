import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { AnnonceDto } from '@/features/annonces/dto/annonce.dto';
import { PublicUserDto } from '@/features/users/dto/user.dto';
import { TrackingStatusEnum } from '../enum/tracking-status.enum';

export class CreateTrackingDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsUUID()
  annonce_id: string;
}

export class AcceptTrackingDto {
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  accepted?: boolean;
}

export class CompleteTrackingDto {
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  completed?: boolean;
}

export class ConfirmTrackingDto {
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  confirmed?: boolean;
}

export class CancelTrackingDto {
  @ApiPropertyOptional({ example: 'Reason for cancellation' })
  @IsOptional()
  reason?: string;
}

export class TrackingDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ type: AnnonceDto })
  annonce: AnnonceDto;

  @ApiProperty({ type: PublicUserDto })
  creator: PublicUserDto;

  @ApiProperty({ type: PublicUserDto })
  accepter: PublicUserDto;

  @ApiProperty()
  negotiated_price: number;

  @ApiProperty({ enum: TrackingStatusEnum })
  status: TrackingStatusEnum;

  @ApiPropertyOptional({ example: '2025-01-01T00:00:00.000Z' })
  creator_accepted_at?: Date | null;

  @ApiPropertyOptional({ example: '2025-01-01T00:00:00.000Z' })
  accepter_accepted_at?: Date | null;

  @ApiPropertyOptional({ example: '2025-01-01T00:00:00.000Z' })
  creator_completed_at?: Date | null;

  @ApiPropertyOptional({ example: '2025-01-01T00:00:00.000Z' })
  accepter_confirmed_at?: Date | null;

  @ApiPropertyOptional({ example: '2025-01-01T00:00:00.000Z' })
  cancelled_at?: Date | null;

  @ApiPropertyOptional({ example: '123e4567-e89b-12d3-a456-426614174000' })
  cancelled_by?: string | null;

  @ApiProperty()
  acceptance_deadline: Date;

  @ApiPropertyOptional({ example: '2025-01-01T00:00:00.000Z' })
  completion_deadline?: Date | null;

  @ApiPropertyOptional({ example: '2025-01-01T00:00:00.000Z' })
  confirmation_deadline?: Date | null;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

export class TrackingParamsDto extends PaginationDto {
  @ApiPropertyOptional({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsOptional()
  annonce_id?: string;

  @ApiPropertyOptional({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsOptional()
  creator_id?: string;

  @ApiPropertyOptional({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsOptional()
  accepter_id?: string;

  @ApiPropertyOptional({ enum: TrackingStatusEnum })
  @IsOptional()
  status?: TrackingStatusEnum;
}
