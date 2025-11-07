import { ApiProperty } from '@nestjs/swagger';

export class UploadProfilePictureDto {
  @ApiProperty({
    description: 'Profile picture, max 5MB',
    format: 'binary',
    type: 'string',
  })
  file: Express.Multer.File;
}
