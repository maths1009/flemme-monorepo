import { RoleEnum } from '@/features/roles/enum/role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  email_verified: boolean;

  @ApiPropertyOptional()
  suspended_at?: Date;

  @ApiProperty()
  notif_enabled: boolean;

  @ApiProperty()
  score: number;

  @ApiProperty({ enum: RoleEnum })
  role: RoleEnum;

  @ApiPropertyOptional()
  profile_picture_url?: string;
}
