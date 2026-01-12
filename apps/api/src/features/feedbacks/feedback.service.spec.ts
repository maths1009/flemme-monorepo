import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FILE_SERVICE } from '@/common/services/file.service';
import { PaginationService } from '@/common/services/pagination.service';
import { createMockRepository } from '@/common/testing/test-utils';
import { UsersService } from '@/features/users/users.service';
import { Feedback } from './entities/feedback.entity';
import { FeedbackErrorMessages } from './errors/feedback-error-messages.enum';
import { FeedbackService } from './feedback.service';

describe('FeedbackService', () => {
  let service: FeedbackService;
  let repository: DeepMocked<Repository<Feedback>>;
  let usersService: DeepMocked<UsersService>;
  let paginationService: DeepMocked<PaginationService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedbackService,
        {
          provide: getRepositoryToken(Feedback),
          useValue: createMockRepository(),
        },
        {
          provide: UsersService,
          useValue: createMock<UsersService>(),
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

    service = module.get<FeedbackService>(FeedbackService);
    repository = module.get(getRepositoryToken(Feedback));
    usersService = module.get(UsersService);
    paginationService = module.get(PaginationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createDto = { message: 'Good', rating: 5, receiver_id: 'receiver-1' };
    const senderId = 'sender-1';

    it('should create feedback successfully', async () => {
      usersService.findOne.mockResolvedValue({ id: 'receiver-1' } as any);
      repository.findOne.mockResolvedValue(null); // No duplicate
      repository.create.mockReturnValue(createDto as any);
      repository.save.mockResolvedValue(createDto as any);

      const result = await service.create(createDto, senderId);

      expect(result).toBeDefined();
      expect(repository.save).toHaveBeenCalled();
    });

    it('should throw BadRequestException if sender is receiver', async () => {
      await expect(service.create({ ...createDto, receiver_id: senderId }, senderId)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.create({ ...createDto, receiver_id: senderId }, senderId)).rejects.toThrow(
        FeedbackErrorMessages.CANNOT_FEEDBACK_YOURSELF,
      );
    });

    it('should throw NotFoundException if receiver not found', async () => {
      usersService.findOne.mockResolvedValue(null);
      await expect(service.create(createDto, senderId)).rejects.toThrow(NotFoundException);
      await expect(service.create(createDto, senderId)).rejects.toThrow(FeedbackErrorMessages.RECEIVER_NOT_FOUND);
    });

    it('should throw BadRequestException if feedback already exists', async () => {
      usersService.findOne.mockResolvedValue({ id: 'receiver-1' } as any);
      repository.findOne.mockResolvedValue({ id: 'feedback-1' } as any);

      await expect(service.create(createDto, senderId)).rejects.toThrow(BadRequestException);
      await expect(service.create(createDto, senderId)).rejects.toThrow(FeedbackErrorMessages.FEEDBACK_ALREADY_EXISTS);
    });
  });

  describe('findAll', () => {
    it('should return paginated feedbacks', async () => {
      const params = { sender_id: 'user-1' } as any;
      const paginatedResult = { items: [], meta: {} };
      paginationService.paginate.mockResolvedValue(paginatedResult as any);

      const result = await service.findAll(params, 'user-1');

      expect(result).toEqual(paginatedResult);
      expect(paginationService.paginate).toHaveBeenCalled();
    });

    it('should throw BadRequestException if viewing other feedbacks', async () => {
      const params = { sender_id: 'other-user' } as any;
      await expect(service.findAll(params, 'user-1')).rejects.toThrow(BadRequestException);
      await expect(service.findAll(params, 'user-1')).rejects.toThrow(
        FeedbackErrorMessages.CANNOT_VIEW_OTHER_FEEDBACKS,
      );
    });
  });

  describe('findOne', () => {
    it('should return feedback if found', async () => {
      const feedback = { id: 'feedback-1' };
      repository.findOne.mockResolvedValue(feedback as any);

      const result = await service.findOne('feedback-1');
      expect(result).toEqual(feedback);
    });

    it('should throw NotFoundException if not found', async () => {
      repository.findOne.mockResolvedValue(null);
      await expect(service.findOne('feedback-1')).rejects.toThrow(NotFoundException);
      await expect(service.findOne('feedback-1')).rejects.toThrow(FeedbackErrorMessages.FEEDBACK_NOT_FOUND);
    });
  });

  describe('update', () => {
    const updateDto = { message: 'Updated' };
    const feedbackId = 'feedback-1';
    const userId = 'user-1';

    it('should update feedback if sender owns it', async () => {
      const feedback = { id: feedbackId, sender_id: userId };
      repository.findOne
        .mockResolvedValueOnce(feedback as any) // findOne check
        .mockResolvedValueOnce(feedback as any); // return after update

      repository.update.mockResolvedValue({ affected: 1 } as any);

      await service.update(feedbackId, updateDto, userId);

      expect(repository.update).toHaveBeenCalledWith(feedbackId, updateDto);
    });

    it('should throw BadRequestException if not owner', async () => {
      const feedback = { id: feedbackId, sender_id: 'other-user' };
      repository.findOne.mockResolvedValue(feedback as any);

      await expect(service.update(feedbackId, updateDto, userId)).rejects.toThrow(BadRequestException);
      await expect(service.update(feedbackId, updateDto, userId)).rejects.toThrow(
        FeedbackErrorMessages.CANNOT_MODIFY_OTHER_FEEDBACK,
      );
    });
  });

  describe('delete', () => {
    const feedbackId = 'feedback-1';
    const userId = 'user-1';

    it('should delete feedback if sender owns it', async () => {
      const feedback = { id: feedbackId, sender_id: userId };
      repository.findOne.mockResolvedValue(feedback as any);
      repository.delete.mockResolvedValue({ affected: 1 } as any);

      await service.delete(feedbackId, userId);

      expect(repository.delete).toHaveBeenCalledWith(feedbackId);
    });

    it('should throw BadRequestException if not owner', async () => {
      const feedback = { id: feedbackId, sender_id: 'other-user' };
      repository.findOne.mockResolvedValue(feedback as any);

      await expect(service.delete(feedbackId, userId)).rejects.toThrow(BadRequestException);
      await expect(service.delete(feedbackId, userId)).rejects.toThrow(
        FeedbackErrorMessages.CANNOT_MODIFY_OTHER_FEEDBACK,
      );
    });
  });
});
