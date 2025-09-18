import { FileServiceInterface } from '@/common/services/file.service';
import { UserMapper } from '@/features/users/mappers/user.mapper';
import { FeedbackDto } from '../dto/feedback.dto';
import { Feedback } from '../entities/feedback.entity';

export class FeedbackMapper {
  static async toDto(
    feedback: Feedback,
    fileService?: FileServiceInterface,
  ): Promise<FeedbackDto> {
    return {
      id: feedback.id,
      rating: feedback.rating,
      message: feedback.message,
      created_at: feedback.created_at,
      receiver: await UserMapper.toDto(feedback.receiver, fileService),
      sender: await UserMapper.toDto(feedback.sender, fileService),
    };
  }
}
