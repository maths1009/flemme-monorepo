import { PaginatedResponseDto } from '@/common/dto/pagination.dto';
import {
  FILE_SERVICE,
  FileServiceInterface,
} from '@/common/services/file.service';
import { PaginationService } from '@/common/services/pagination.service';
import { AnnoncesService } from '@/features/annonces/annonces.service';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateLikeDto, LikeDto, LikeParamsDto } from './dto/like.dto';
import { Like } from './entities/like.entity';
import { LikeErrorMessages } from './errors/like-error-messages.enum';
import { LikeMapper } from './mappers/like.mapper';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
    private readonly paginationService: PaginationService,
    private readonly annoncesService: AnnoncesService,
    @Inject(FILE_SERVICE)
    private readonly fileService: FileServiceInterface,
  ) {}

  async create(
    createLikeDto: CreateLikeDto,
    userId: string,
  ): Promise<Like> {
    const { annonce_id } = createLikeDto;

    const annonce = await this.annoncesService.findOne(annonce_id);
    
    if (!annonce) {
      throw new NotFoundException(LikeErrorMessages.ANNONCE_NOT_FOUND);
    }

    if (annonce.user_id === userId) {
      throw new BadRequestException(LikeErrorMessages.CANNOT_LIKE_YOURSELF);
    }

    const existingLike = await this.likesRepository.findOne({
      where: {
        user_id: userId,
        annonce_id,
      },
    });

    if (existingLike) {
      throw new BadRequestException(LikeErrorMessages.LIKE_ALREADY_EXISTS);
    }

    const like = this.likesRepository.create({
      user_id: userId,
      annonce_id,
    });

    return this.likesRepository.save(like);
  }

  async findAll(
    params: LikeParamsDto,
    userId: string,
  ): Promise<PaginatedResponseDto<LikeDto>> {
    if(userId !== params.user_id) {
      throw new BadRequestException(LikeErrorMessages.CANNOT_VIEW_OTHER_LIKES);
    }
    const options: FindManyOptions<Like> = {
      where: { user_id: params.user_id },
      relations: [
        'user',
        'annonce',
        'user.role',
        'annonce.user',
        'annonce.user.role',
      ],
      order: { created_at: 'DESC' },
    };

    return this.paginationService.paginate<Like, LikeDto>(
      this.likesRepository,
      params,
      options,
      async (likes) =>
        Promise.all(likes.map((like) => LikeMapper.toDto(like, this.fileService))),
    );
  }

  async findOne(id: string): Promise<Like> {
    const like = await this.likesRepository.findOne({
      where: { id },
      relations: ['user', 'annonce', 'user.role', 'annonce.user', 'annonce.user.role'],
    });

    if (!like) {
      throw new NotFoundException(LikeErrorMessages.LIKE_NOT_FOUND);
    }

    return like;
  }

  async delete(id: string, userId: string): Promise<void> {
    const like = await this.findOne(id);

    if (like.user_id !== userId) {
      throw new BadRequestException(LikeErrorMessages.CANNOT_DELETE_OTHER_LIKE);
    }

    await this.likesRepository.delete(id);
  }
}
