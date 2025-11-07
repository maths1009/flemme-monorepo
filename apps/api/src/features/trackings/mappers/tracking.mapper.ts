import { FileServiceInterface } from '@/common/services/file.service';
import { annonceToDto } from '@/features/annonces/mappers/annonce.mapper';
import { userToDto } from '@/features/users/mappers/user.mapper';
import { TrackingDto } from '../dto/tracking.dto';
import { Tracking } from '../entities/tracking.entity';

export const trackingToDto = async (tracking: Tracking, fileService?: FileServiceInterface): Promise<TrackingDto> => {
  return {
    acceptance_deadline: tracking.acceptance_deadline,
    accepter: await userToDto(tracking.accepter, fileService),
    accepter_accepted_at: tracking.accepter_accepted_at,
    accepter_confirmed_at: tracking.accepter_confirmed_at,
    annonce: await annonceToDto(tracking.annonce, fileService),
    cancelled_at: tracking.cancelled_at,
    cancelled_by: tracking.cancelled_by,
    completion_deadline: tracking.completion_deadline,
    confirmation_deadline: tracking.confirmation_deadline,
    created_at: tracking.created_at,
    creator: await userToDto(tracking.creator, fileService),
    creator_accepted_at: tracking.creator_accepted_at,
    creator_completed_at: tracking.creator_completed_at,
    id: tracking.id,
    negotiated_price: tracking.negotiated_price,
    status: tracking.status,
    updated_at: tracking.updated_at,
  };
};
