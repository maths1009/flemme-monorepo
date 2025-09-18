import { FileServiceInterface } from '@/common/services/file.service';
import { BucketEnum } from '@/common/enums';
import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

export class UserMapper {
  static async toDto(
    user: User,
    fileService?: FileServiceInterface,
  ): Promise<UserDto> {
    let profilePictureUrl: string | undefined;

    if (fileService) {
      const filename = `${user.id}.png`;
      const bucket = BucketEnum.PROFILE_PICTURE;
      const fileExists = await fileService.exists(filename, bucket);

      if (fileExists) {
        profilePictureUrl = await fileService.getSignedUrl(
          filename,
          bucket,
          3600,
        );
      }
    }

    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      suspended_at: user.suspended_at,
      email: user.email,
      notif_enabled: user.notif_enabled,
      score: user.score,
      email_verified: user.email_verified,
      role: user.role?.name,
      profile_picture_url: profilePictureUrl,
      average_response_time: user.average_response_time,
      updated_at: user.updated_at,
    };
  }
}
