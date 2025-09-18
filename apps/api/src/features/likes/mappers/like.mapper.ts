import { FileServiceInterface } from '@/common/services/file.service';
import { AnnonceMapper } from '@/features/annonces/mappers/annonce.mapper';
import { LikeDto } from '../dto/like.dto';
import { Like } from '../entities/like.entity';

export class LikeMapper {
  static async toDto(
    like: Like,
    fileService?: FileServiceInterface,
  ): Promise<LikeDto> {
    return {
      id: like.id,
      created_at: like.created_at,
      annonce: await AnnonceMapper.toDto(like.annonce, fileService),
    };
  }
}
