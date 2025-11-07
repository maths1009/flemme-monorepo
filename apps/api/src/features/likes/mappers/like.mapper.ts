import { FileServiceInterface } from '@/common/services/file.service';
import { annonceToDto } from '@/features/annonces/mappers/annonce.mapper';
import { LikeDto } from '../dto/like.dto';
import { Like } from '../entities/like.entity';

export const likeToDto = async (like: Like, fileService?: FileServiceInterface): Promise<LikeDto> => {
  return {
    annonce: await annonceToDto(like.annonce, fileService),
    created_at: like.created_at,
    id: like.id,
  };
};
