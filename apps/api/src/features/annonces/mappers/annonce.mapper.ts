import { FileServiceInterface } from '@/common/services/file.service';
import { userToDto } from '@/features/users/mappers/user.mapper';
import { AnnonceDto } from '../dto/annonce.dto';
import { Annonce } from '../entities/annonce.entity';

export const annonceToDto = async (annonce: Annonce, fileService?: FileServiceInterface): Promise<AnnonceDto> => {
  return {
    created_at: annonce.created_at,
    description: annonce.description,
    id: annonce.id,
    latitude: annonce.latitude,
    longitude: annonce.longitude,
    price: annonce.price,
    title: annonce.title,
    updated_at: annonce.updated_at,
    user: await userToDto(annonce.user, fileService),
  };
};
