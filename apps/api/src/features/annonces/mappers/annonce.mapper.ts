import { FileServiceInterface } from '@/common/services/file.service';
import { UserMapper } from '@/features/users/mappers/user.mapper';
import { AnnonceDto } from '../dto/annonce.dto';
import { Annonce } from '../entities/annonce.entity';

export class AnnonceMapper {
  static async toDto(
    annonce: Annonce,
    fileService?: FileServiceInterface,
  ): Promise<AnnonceDto> {
    return {
      id: annonce.id,
      title: annonce.title,
      description: annonce.description,
      price: annonce.price,
      latitude: annonce.latitude,
      longitude: annonce.longitude,
      created_at: annonce.created_at,
      user: await UserMapper.toDto(annonce.user, fileService),
    };
  }
}
