import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { FILE_SERVICE } from '@/common/services/file.service';
import { createMockRepository } from '@/common/testing/test-utils';
import { AnnoncesService } from '@/features/annonces/annonces.service';
import { Tracking } from './entities/tracking.entity';
import { TrackingStatusEnum } from './enum/tracking-status.enum';
import { TrackingsService } from './trackings.service';

describe('TrackingsService', () => {
  let service: TrackingsService;
  let repository: DeepMocked<Repository<Tracking>>;
  let annoncesService: DeepMocked<AnnoncesService>;
  let configService: DeepMocked<ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrackingsService,
        {
          provide: getRepositoryToken(Tracking),
          useValue: createMockRepository(),
        },
        {
          provide: AnnoncesService,
          useValue: createMock<AnnoncesService>(),
        },
        {
          provide: ConfigService,
          useValue: createMock<ConfigService>(),
        },
        {
          provide: FILE_SERVICE,
          useValue: createMock(),
        },
      ],
    }).compile();

    service = module.get<TrackingsService>(TrackingsService);
    repository = module.get(getRepositoryToken(Tracking));
    annoncesService = module.get(AnnoncesService);
    configService = module.get(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createDto = { annonce_id: 'annonce-1' };
    const accepterId = 'user-2';
    const creatorId = 'user-1';

    it('should create a tracking successfully', async () => {
      annoncesService.findOne.mockResolvedValue({
        id: 'annonce-1',
        price: 100,
        user_id: creatorId,
      } as any);

      repository.findOne.mockResolvedValue(null);

      configService.get.mockImplementation(key => {
        if (key === 'TRACKING_ACCEPTANCE_DEADLINE_HOURS') return 24;
        if (key === 'TRACKING_COMPLETION_DEADLINE_HOURS') return 48;
        return null;
      });

      repository.create.mockReturnValue({
        id: 'tracking-1',
        status: TrackingStatusEnum.IN_PROGRESS,
      } as any);

      repository.save.mockResolvedValue({
        id: 'tracking-1',
        status: TrackingStatusEnum.IN_PROGRESS,
      } as any);

      const result = await service.create(createDto, accepterId);

      expect(result).toBeDefined();
      expect(annoncesService.findOne).toHaveBeenCalledWith(createDto.annonce_id);
      expect(repository.create).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if annonce not found', async () => {
      annoncesService.findOne.mockResolvedValue(null);

      await expect(service.create(createDto, accepterId)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if user is creator', async () => {
      annoncesService.findOne.mockResolvedValue({
        id: 'annonce-1',
        price: 100,
        user_id: accepterId, // Same as accepter
      } as any);

      await expect(service.create(createDto, accepterId)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if tracking already exists', async () => {
      annoncesService.findOne.mockResolvedValue({
        id: 'annonce-1',
        price: 100,
        user_id: creatorId,
      } as any);

      repository.findOne.mockResolvedValue({
        id: 'existing-tracking',
        status: TrackingStatusEnum.IN_PROGRESS,
      } as any);

      await expect(service.create(createDto, accepterId)).rejects.toThrow(BadRequestException);
    });
  });

  describe('accept', () => {
    const trackingId = 'tracking-1';
    const userId = 'user-1';

    it('should accept tracking successfully', async () => {
      const tracking = {
        acceptance_deadline: dayjs().add(1, 'day').toDate(),
        accepter_id: 'other-user',
        creator_id: userId,
        id: trackingId,
        status: TrackingStatusEnum.IN_PROGRESS,
      };

      repository.findOne.mockResolvedValue(tracking as any);
      repository.save.mockImplementation(async entity => entity as any);

      const result = await service.accept(trackingId, userId);

      expect(result.creator_accepted_at).toBeDefined();
      expect(repository.save).toHaveBeenCalled();
    });

    it('should throw BadRequest if status is not IN_PROGRESS', async () => {
      const tracking = {
        acceptance_deadline: dayjs().add(1, 'day').toDate(),
        id: trackingId,
        status: TrackingStatusEnum.COMPLETED,
      };
      repository.findOne.mockResolvedValue(tracking as any);

      await expect(service.accept(trackingId, userId)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequest if unauthorized user', async () => {
      const tracking = {
        acceptance_deadline: dayjs().add(1, 'day').toDate(),
        accepter_id: 'other-2',
        creator_id: 'other-1',
        id: trackingId,
        status: TrackingStatusEnum.IN_PROGRESS,
      };
      repository.findOne.mockResolvedValue(tracking as any);

      await expect(service.accept(trackingId, userId)).rejects.toThrow(BadRequestException);
    });
  });

  describe('checkDeadlines', () => {
    it('should put tracking in dispute if acceptance deadline expired', async () => {
      const tracking = {
        acceptance_deadline: dayjs().subtract(1, 'hour').toDate(), // Expired
        creator_accepted_at: null,
        id: 'tracking-1',
        status: TrackingStatusEnum.IN_PROGRESS,
      };
      repository.findOne.mockResolvedValue(tracking as any);

      await expect(service.accept('tracking-1', 'user-1')).rejects.toThrow(BadRequestException);
      expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({ status: TrackingStatusEnum.DISPUTE }));
    });

    it('should throw BadRequest if tracking is already in dispute', async () => {
      const tracking = {
        acceptance_deadline: dayjs().add(1, 'hour').toDate(),
        id: 'tracking-1',
        status: TrackingStatusEnum.DISPUTE,
      };
      repository.findOne.mockResolvedValue(tracking as any);

      await expect(service.accept('tracking-1', 'user-1')).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should return tracking if found', async () => {
      const tracking = { id: 'track-1' };
      repository.findOne.mockResolvedValue(tracking as any);

      expect(await service.findOne('track-1')).toEqual(tracking);
    });

    it('should throw NotFoundException if not found', async () => {
      repository.findOne.mockResolvedValue(null);
      await expect(service.findOne('track-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('complete', () => {
    const trackingId = 'tracking-1';
    const userId = 'creator-1';

    it('should complete tracking successfully', async () => {
      const tracking = {
        acceptance_deadline: dayjs().add(1, 'day').toDate(),
        accepter_accepted_at: new Date(),
        completion_deadline: dayjs().add(1, 'day').toDate(),
        creator_accepted_at: new Date(),
        creator_id: userId,
        id: trackingId,
        status: TrackingStatusEnum.IN_PROGRESS,
      };

      repository.findOne.mockResolvedValue(tracking as any);
      configService.get.mockReturnValue(24); // DEADLINE HOURS
      repository.save.mockImplementation(async entity => entity as any);

      const result = await service.complete(trackingId, userId);
      expect(result.creator_completed_at).toBeDefined();
      expect(result.confirmation_deadline).toBeDefined();
    });

    it('should throw BadRequest if not creator', async () => {
      const tracking = {
        acceptance_deadline: dayjs().add(1, 'day').toDate(),
        creator_id: 'other',
        id: trackingId,
        status: TrackingStatusEnum.IN_PROGRESS,
      };
      repository.findOne.mockResolvedValue(tracking as any);

      await expect(service.complete(trackingId, userId)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequest if not accepted by both', async () => {
      const tracking = {
        acceptance_deadline: dayjs().add(1, 'day').toDate(),
        accepter_accepted_at: null, // Not accepted
        creator_accepted_at: new Date(),
        creator_id: userId,
        id: trackingId,
        status: TrackingStatusEnum.IN_PROGRESS,
      };
      repository.findOne.mockResolvedValue(tracking as any);

      await expect(service.complete(trackingId, userId)).rejects.toThrow(BadRequestException);
    });
  });

  describe('confirm', () => {
    const trackingId = 'tracking-1';
    const userId = 'accepter-1';

    it('should confirm tracking successfully', async () => {
      const tracking = {
        acceptance_deadline: dayjs().add(1, 'day').toDate(),
        accepter_id: userId,
        confirmation_deadline: dayjs().add(1, 'day').toDate(),
        creator_completed_at: new Date(),
        id: trackingId,
        status: TrackingStatusEnum.IN_PROGRESS,
      };

      repository.findOne.mockResolvedValue(tracking as any);
      repository.save.mockImplementation(async entity => entity as any);

      const result = await service.confirm(trackingId, userId);
      expect(result.status).toBe(TrackingStatusEnum.COMPLETED);
      expect(result.accepter_confirmed_at).toBeDefined();
    });

    it('should throw BadRequest if creator has not completed', async () => {
      const tracking = {
        acceptance_deadline: dayjs().add(1, 'day').toDate(),
        accepter_id: userId,
        creator_completed_at: null, // Not completed
        id: trackingId,
        status: TrackingStatusEnum.IN_PROGRESS,
      };
      repository.findOne.mockResolvedValue(tracking as any);

      await expect(service.confirm(trackingId, userId)).rejects.toThrow(BadRequestException);
    });
  });

  describe('cancel', () => {
    const trackingId = 'tracking-1';
    const userId = 'user-1';

    it('should cancel tracking successfully', async () => {
      const tracking = {
        acceptance_deadline: dayjs().add(1, 'day').toDate(),
        creator_id: userId,
        id: trackingId,
        status: TrackingStatusEnum.IN_PROGRESS,
      };
      repository.findOne.mockResolvedValue(tracking as any);
      repository.save.mockImplementation(async entity => entity as any);

      const result = await service.cancel(trackingId, userId);
      expect(result.status).toBe(TrackingStatusEnum.CANCELLED);
    });

    it('should throw BadRequest if already completed', async () => {
      const tracking = {
        id: trackingId,
        status: TrackingStatusEnum.COMPLETED,
      };
      repository.findOne.mockResolvedValue(tracking as any);

      await expect(service.cancel(trackingId, userId)).rejects.toThrow(BadRequestException);
    });
  });
});
