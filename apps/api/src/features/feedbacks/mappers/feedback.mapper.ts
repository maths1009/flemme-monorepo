import { FileServiceInterface } from '@/common/services/file.service';
import { userToDto } from '@/features/users/mappers/user.mapper';
import { FeedbackDto } from '../dto/feedback.dto';
import { Feedback } from '../entities/feedback.entity';

export const feedbackToDto = async (feedback: Feedback, fileService?: FileServiceInterface): Promise<FeedbackDto> => {
  return {
    created_at: feedback.created_at,
    id: feedback.id,
    message: feedback.message,
    rating: feedback.rating,
    receiver: await userToDto(feedback.receiver, fileService),
    sender: await userToDto(feedback.sender, fileService),
  };
};
