import { BucketEnum } from '@/common/enums';
import { FileServiceInterface } from '@/common/services/file.service';
import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

export const userToDto = async (user: User, fileService?: FileServiceInterface): Promise<UserDto> => {
  let profilePictureUrl: string | undefined;

  if (fileService) {
    const filename = `${user.id}.png`;
    const bucket = BucketEnum.PROFILE_PICTURE;
    const fileExists = await fileService.exists(filename, bucket);

    if (fileExists) {
      profilePictureUrl = await fileService.getSignedUrl(filename, bucket, 3600);
    }
  }

  return {
    average_response_time: user.average_response_time,
    email: user.email,
    email_verified: user.email_verified,
    firstname: user.firstname,
    id: user.id,
    lastname: user.lastname,
    notif_enabled: user.notif_enabled,
    profile_picture_url: profilePictureUrl,
    role: user.role?.name,
    score: user.score,
    suspended_at: user.suspended_at,
    updated_at: user.updated_at,
    username: user.username,
  };
};
