import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FILE_SERVICE } from '@/common/services/file.service';
import { PaginationService } from '@/common/services/pagination.service';
import { createMockRepository } from '@/common/testing/test-utils';
import { AnnoncesService } from '@/features/annonces/annonces.service';
import { CreateLikeDto } from './dto/like.dto';
import { Like } from './entities/like.entity';
import { LikeErrorMessages } from './errors/like-error-messages.enum';
import { LikesService } from './likes.service';

describe('LikesService', () => {
  let service: LikesService;
  let repository: DeepMocked<Repository<Like>>;
  let annoncesService: DeepMocked<AnnoncesService>;
  let paginationService: DeepMocked<PaginationService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikesService,
        {
          provide: getRepositoryToken(Like),
          useValue: createMockRepository(),
        },
        {
          provide: AnnoncesService,
          useValue: createMock<AnnoncesService>(),
        },
        {
          provide: PaginationService,
          useValue: createMock<PaginationService>(),
        },
        {
          provide: FILE_SERVICE,
          useValue: createMock(),
        },
      ],
    }).compile();

    service = module.get<LikesService>(LikesService);
    repository = module.get(getRepositoryToken(Like));
    annoncesService = module.get(AnnoncesService);
    paginationService = module.get(PaginationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createDto: CreateLikeDto = { annonce_id: 'annonce-1' };
    const userId = 'user-1';

    it('should create like successfully', async () => {
      annoncesService.findOne.mockResolvedValue({ id: 'annonce-1', user_id: 'other-user' } as any);
      repository.findOne.mockResolvedValue(null);
      repository.create.mockReturnValue(createDto as any);
      repository.save.mockResolvedValue(createDto as any);

      const result = await service.create(createDto, userId);

      expect(result).toBeDefined();
      expect(repository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if annonce not found', async () => {
      annoncesService.findOne.mockResolvedValue(null);
      await expect(service.create(createDto, userId)).rejects.toThrow(NotFoundException);
      await expect(service.create(createDto, userId)).rejects.toThrow(LikeErrorMessages.ANNONCE_NOT_FOUND);
    });

    it('should throw BadRequestException if self-like', async () => {
      annoncesService.findOne.mockResolvedValue({ id: 'annonce-1', user_id: userId } as any);
      await expect(service.create(createDto, userId)).rejects.toThrow(BadRequestException);
      await expect(service.create(createDto, userId)).rejects.toThrow(LikeErrorMessages.CANNOT_LIKE_YOURSELF);
    });

    it('should throw BadRequestException if like already exists', async () => {
      annoncesService.findOne.mockResolvedValue({ id: 'annonce-1', user_id: 'other-user' } as any);
      repository.findOne.mockResolvedValue({ id: 'like-1' } as any);

      await expect(service.create(createDto, userId)).rejects.toThrow(BadRequestException);
      await expect(service.create(createDto, userId)).rejects.toThrow(LikeErrorMessages.LIKE_ALREADY_EXISTS);
    });
  });

  describe('findAll', () => {
    it('should return paginated likes for user', async () => {
      const params = { user_id: 'user-1' } as any;
      const paginatedResult = { items: [], meta: {} };
      paginationService.paginate.mockResolvedValue(paginatedResult as any);

      const result = await service.findAll(params, 'user-1');

      expect(result).toEqual(paginatedResult);
      expect(paginationService.paginate).toHaveBeenCalled();
    });

    it('should throw BadRequestException if viewing other likes', async () => {
      const params = { user_id: 'other-user' } as any;
      await expect(service.findAll(params, 'user-1')).rejects.toThrow(BadRequestException);
      await expect(service.findAll(params, 'user-1')).rejects.toThrow(LikeErrorMessages.CANNOT_VIEW_OTHER_LIKES);
    });
  });

  describe('findOne', () => {
    it('should return like if found', async () => {
      const like = { id: 'like-1' };
      repository.findOne.mockResolvedValue(like as any);

      const result = await service.findOne('like-1');
      expect(result).toEqual(like);
    });

    it('should throw NotFoundException if not found', async () => {
      repository.findOne.mockResolvedValue(null);
      await expect(service.findOne('like-1')).rejects.toThrow(NotFoundException);
      await expect(service.findOne('like-1')).rejects.toThrow(LikeErrorMessages.LIKE_NOT_FOUND);
    });
  });

  describe('delete', () => {
    const likeId = 'like-1';
    const userId = 'user-1';

    it('should delete like if user owns it', async () => {
      const like = { id: likeId, user_id: userId };
      repository.findOne.mockResolvedValue(like as any);
      repository.delete.mockResolvedValue({ affected: 1 } as any);

      await service.delete(likeId, userId);

      expect(repository.delete).toHaveBeenCalledWith(likeId);
    });

    it('should throw BadRequestException if not owner', async () => {
      const like = { id: likeId, user_id: 'other-user' };
      repository.findOne.mockResolvedValue(like as any);

      await expect(service.delete(likeId, userId)).rejects.toThrow(BadRequestException);
      await expect(service.delete(likeId, userId)).rejects.toThrow(LikeErrorMessages.CANNOT_DELETE_OTHER_LIKE);
    });
  });
});
