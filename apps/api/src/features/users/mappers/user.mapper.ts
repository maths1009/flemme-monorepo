import { BucketEnum } from '@/common/enums';
import { FileServiceInterface } from '@/common/services/file.service';
import { MyProfileDto, PublicUserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

/**
 * Get profile picture URL for a user
 */
const getProfilePictureUrl = async (
  userId: string,
  fileService?: FileServiceInterface,
): Promise<string | undefined> => {
  if (!fileService) return undefined;

  try {
    const filename = `${userId}.png`;
    const bucket = BucketEnum.PROFILE_PICTURE;
    const fileExists = await fileService.exists(filename, bucket);

    if (fileExists) {
      return await fileService.getSignedUrl(filename, bucket, 3600);
    }
  } catch {
    // MinIO/S3 unavailable — gracefully degrade
  }
  return undefined;
};

/**
 * Map User entity to PublicUserDto (public info visible to all users)
 */
export const userToPublicDto = async (
  user: User,
  fileService?: FileServiceInterface,
): Promise<PublicUserDto> => {
  const profilePictureUrl = await getProfilePictureUrl(user.id, fileService);

  return {
    average_response_time: user.average_response_time,
    firstname: user.firstname,
    id: user.id,
    lastname: user.lastname,
    profile_picture_url: profilePictureUrl,
    score: user.score,
    username: user.username,
  };
};

/**
 * Map User entity to MyProfileDto (private info for connected user only)
 */
export const userToMyProfileDto = async (
  user: User,
  fileService?: FileServiceInterface,
): Promise<MyProfileDto> => {
  const publicDto = await userToPublicDto(user, fileService);

  return {
    ...publicDto,
    email: user.email,
    email_verified: user.email_verified,
    notif_enabled: user.notif_enabled,
    role: user.role?.name,
    suspended_at: user.suspended_at,
    updated_at: user.updated_at,
  };
};
