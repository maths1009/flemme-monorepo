import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FILE_SERVICE } from '@/common/services/file.service';
import { PaginationService } from '@/common/services/pagination.service';
import { createMockRepository } from '@/common/testing/test-utils';
import { AnnoncesService } from './annonces.service';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { Annonce } from './entities/annonce.entity';
import { AnnonceErrorMessages } from './errors/annonce-error-message';

describe('AnnoncesService', () => {
  let service: AnnoncesService;
  let repository: DeepMocked<Repository<Annonce>>;
  let paginationService: DeepMocked<PaginationService>;
  let fileService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnnoncesService,
        {
          provide: getRepositoryToken(Annonce),
          useValue: createMockRepository(),
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

    service = module.get<AnnoncesService>(AnnoncesService);
    repository = module.get(getRepositoryToken(Annonce));
    paginationService = module.get(PaginationService);
    fileService = module.get(FILE_SERVICE);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createDto: CreateAnnonceDto = {
      description: 'Description',
      latitude: 48.85,
      longitude: 2.35,
      price: 100,
      title: 'New Annonce',
    };
    const userId = 'user-1';

    it('should create and return an annonce', async () => {
      const savedAnnonce = {
        ...createDto,
        created_at: new Date(),
        id: '1',
        updated_at: new Date(),
        user: { id: userId, role: { name: 'USER' } } as any,
        user_id: userId,
      };
      repository.create.mockReturnValue(savedAnnonce);
      repository.save.mockResolvedValue(savedAnnonce);
      repository.findOne.mockResolvedValue(savedAnnonce);

      const result = await service.create(createDto, userId);

      expect(repository.create).toHaveBeenCalledWith({ ...createDto, user_id: userId });
      expect(repository.save).toHaveBeenCalledWith(savedAnnonce);
      expect(result).toBeDefined();
    });
  });

  describe('findAll', () => {
    const userId = 'user-1';

    it('should return paginated annonces (basic query)', async () => {
      const dto = { limit: 10, page: 1 };
      const paginatedResult = { items: [], meta: {} };

      paginationService.paginate.mockResolvedValue(paginatedResult as any);

      const result = await service.findAll(dto, userId);

      expect(result).toEqual(paginatedResult);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('annonce');
      // Verify basic where clause
      const queryBuilder = repository.createQueryBuilder();
      expect(queryBuilder.where).toHaveBeenCalledWith('annonce.user_id != :user_id', { user_id: userId });
    });

    it('should handle geospatial query parameters', async () => {
      const dto = { distance: 10, latitude: 48.85, limit: 10, longitude: 2.35, page: 1 };
      const paginatedResult = { items: [], meta: {} };
      paginationService.paginate.mockResolvedValue(paginatedResult as any);

      await service.findAll(dto, userId);

      const queryBuilder = repository.createQueryBuilder();
      expect(queryBuilder.addSelect).toHaveBeenCalledWith(expect.stringContaining('6371 * acos'), 'distance');
      expect(queryBuilder.setParameter).toHaveBeenCalledWith('latitude', 48.85);
      expect(queryBuilder.setParameter).toHaveBeenCalledWith('longitude', 2.35);
      expect(queryBuilder.setParameter).toHaveBeenCalledWith('maxDistance', 10);
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(expect.stringContaining('<= :maxDistance'));
      expect(queryBuilder.orderBy).toHaveBeenCalledWith('distance', 'ASC');
    });

    it('should filter by specific userId when provided', async () => {
      const dto = { limit: 10, page: 1, userId: 'target-user' };
      const paginatedResult = { items: [], meta: {} };
      paginationService.paginate.mockResolvedValue(paginatedResult as any);

      await service.findAll(dto, userId);

      const queryBuilder = repository.createQueryBuilder();
      expect(queryBuilder.where).toHaveBeenCalledWith('annonce.user_id = :targetUserId', {
        targetUserId: 'target-user',
      });
    });
  });

  describe('findOne', () => {
    it('should return annonce if found', async () => {
      const annonce = { id: 'annonce-1' };
      repository.findOne.mockResolvedValue(annonce as any);

      const result = await service.findOne('annonce-1');

      expect(result).toEqual(annonce);
      expect(repository.findOne).toHaveBeenCalledWith(expect.objectContaining({ where: { id: 'annonce-1' } }));
    });

    it('should return null if not found', async () => {
      repository.findOne.mockResolvedValue(null);
      const result = await service.findOne('annonce-1');
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    const updateDto = {
      description: 'Updated Description',
      latitude: 45,
      longitude: 2,
      price: 200,
      title: 'Updated',
    };
    const userId = 'user-1';

    it('should update annonce if user owns it', async () => {
      const annonce = { id: 'annonce-1', user_id: userId };
      repository.preload.mockResolvedValue(annonce as any);
      repository.save.mockResolvedValue(annonce as any);

      await service.update('annonce-1', updateDto, userId);

      expect(repository.preload).toHaveBeenCalledWith({ id: 'annonce-1', ...updateDto });
      expect(repository.save).toHaveBeenCalledWith(annonce);
    });

    it('should throw NotFoundException if annonce not found or not owned', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.update('annonce-1', updateDto, userId)).rejects.toThrow(NotFoundException);
      await expect(service.update('annonce-1', updateDto, userId)).rejects.toThrow(
        AnnonceErrorMessages.ANNONCE_NOT_FOUND,
      );
    });
  });

  describe('delete', () => {
    const userId = 'user-1';

    it('should delete annonce if user owns it', async () => {
      const annonce = { id: 'annonce-1', user_id: userId };
      repository.findOne.mockResolvedValue(annonce as any);
      repository.delete.mockResolvedValue({ affected: 1 } as any);

      await service.delete('annonce-1', userId);

      expect(repository.delete).toHaveBeenCalledWith('annonce-1');
    });

    it('should throw NotFoundException if annonce not found or not owned', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.delete('annonce-1', userId)).rejects.toThrow(NotFoundException);
      await expect(service.delete('annonce-1', userId)).rejects.toThrow(AnnonceErrorMessages.ANNONCE_NOT_FOUND);
    });
  });
});
