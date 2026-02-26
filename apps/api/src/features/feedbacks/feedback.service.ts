import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { PaginatedResponseDto } from '@/common/dto/pagination.dto';
import { FILE_SERVICE, FileServiceInterface } from '@/common/services/file.service';
import { PaginationService } from '@/common/services/pagination.service';
import { UsersService } from '@/features/users/users.service';
import { CreateFeedbackDto, FeedbackDto, FeedbackParamsDto, UpdateFeedbackDto } from './dto/feedback.dto';
import { Feedback } from './entities/feedback.entity';
import { FeedbackErrorMessages } from './errors/feedback-error-messages.enum';
import { feedbackToDto } from './mappers/feedback.mapper';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    private readonly paginationService: PaginationService,
    private readonly usersService: UsersService,
    @Inject(FILE_SERVICE)
    private readonly fileService: FileServiceInterface,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto, senderId: string): Promise<Feedback> {
    const { receiver_id, rating, message } = createFeedbackDto;

    if (senderId === receiver_id) {
      throw new BadRequestException(FeedbackErrorMessages.CANNOT_FEEDBACK_YOURSELF);
    }

    const receiver = await this.usersService.findOne(receiver_id);
    if (!receiver) {
      throw new NotFoundException(FeedbackErrorMessages.RECEIVER_NOT_FOUND);
    }

    const existingFeedback = await this.feedbackRepository.findOne({
      where: {
        receiver_id,
        sender_id: senderId,
      },
    });

    if (existingFeedback) {
      throw new BadRequestException(FeedbackErrorMessages.FEEDBACK_ALREADY_EXISTS);
    }

    const feedback = this.feedbackRepository.create({
      message,
      rating,
      receiver_id,
      sender_id: senderId,
    });

    return this.feedbackRepository.save(feedback);
  }

  async findAll(params: FeedbackParamsDto, userId: string): Promise<PaginatedResponseDto<FeedbackDto>> {
    if (params.sender_id !== undefined && userId !== params.sender_id) {
      throw new BadRequestException(FeedbackErrorMessages.CANNOT_VIEW_OTHER_FEEDBACKS);
    }
    const options: FindManyOptions<Feedback> = {
      order: { created_at: 'DESC' },
      relations: ['receiver', 'sender', 'receiver.role', 'sender.role'],
      where: {
        ...(params.receiver_id && { receiver_id: params.receiver_id }),
        ...(params.sender_id && { sender_id: params.sender_id }),
      },
    };

    return this.paginationService.paginate<Feedback, FeedbackDto>(
      this.feedbackRepository,
      params,
      options,
      async feedbacks => Promise.all(feedbacks.map(feedback => feedbackToDto(feedback, this.fileService))),
    );
  }

  async findOne(id: string): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findOne({
      relations: ['receiver', 'sender', 'receiver.role', 'sender.role'],
      where: { id },
    });

    if (!feedback) {
      throw new NotFoundException(FeedbackErrorMessages.FEEDBACK_NOT_FOUND);
    }

    return feedback;
  }

  async update(id: string, updateFeedbackDto: UpdateFeedbackDto, userId: string): Promise<Feedback> {
    const feedback = await this.findOne(id);

    if (feedback.sender_id !== userId) {
      throw new BadRequestException(FeedbackErrorMessages.CANNOT_MODIFY_OTHER_FEEDBACK);
    }

    this.feedbackRepository.merge(feedback, updateFeedbackDto);
    return await this.feedbackRepository.save(feedback);
  }

  async delete(id: string, userId: string): Promise<void> {
    const feedback = await this.feedbackRepository.findOne({ where: { id } });

    if (!feedback) {
      throw new NotFoundException(FeedbackErrorMessages.FEEDBACK_NOT_FOUND);
    }

    if (feedback.sender_id !== userId) {
      throw new BadRequestException(FeedbackErrorMessages.CANNOT_MODIFY_OTHER_FEEDBACK);
    }

    await this.feedbackRepository.delete(id);
  }
}
