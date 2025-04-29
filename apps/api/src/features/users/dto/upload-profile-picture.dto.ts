import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UploadProfilePictureDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Photo de profil (JPG, PNG, max 5MB)',
  })
  @IsOptional()
  file?: Express.Multer.File;
}
