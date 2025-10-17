import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '@/features/users/dto/user.dto';

export class AnnonceDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;

  @ApiProperty({ type: UserDto })
  user: UserDto;
}

export class UpdateAnnonceDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;
}
