import { ApiProperty } from '@nestjs/swagger';

export class CreateAnnonceDto {
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
