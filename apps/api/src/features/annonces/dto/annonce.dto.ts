import { UserDto } from '@/features/users/dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AnnonceDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  created_at: Date;

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
