import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { UserDto } from '@/features/users/dto/user.dto';

export class CreateFeedbackDto {
  @ApiProperty({ example: 5, maximum: 5, minimum: 1 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 'Excellent service, très professionnel !' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsUUID()
  receiver_id: string;
}

export class UpdateFeedbackDto {
  @ApiProperty({ example: 4, maximum: 5, minimum: 1, required: false })
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiProperty({ example: 'Très bon service, je recommande !', required: false })
  @IsString()
  message?: string;
}

export class FeedbackDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty({ type: UserDto })
  receiver: UserDto;

  @ApiProperty({ type: UserDto })
  sender: UserDto;
}

export class FeedbackParamsDto extends PaginationDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  @IsUUID()
  @IsOptional()
  receiver_id?: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  @IsUUID()
  @IsOptional()
  sender_id?: string;
}
