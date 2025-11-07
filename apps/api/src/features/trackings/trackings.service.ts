import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { FILE_SERVICE } from '@/common/services/file.service';
import { Env } from '@/common/utils';
import { AnnoncesService } from '@/features/annonces/annonces.service';
import { CreateTrackingDto } from './dto/tracking.dto';
import { Tracking } from './entities/tracking.entity';
import { TrackingStatusEnum } from './enum/tracking-status.enum';
import { TrackingErrorMessages } from './errors/tracking-error-messages.enum';

@Injectable()
export class TrackingsService {
  constructor(
    @InjectRepository(Tracking)
    @Inject(FILE_SERVICE)
    private trackingsRepository: Repository<Tracking>,
    private readonly annoncesService: AnnoncesService,
    private readonly configService: ConfigService<Env>,
  ) {}

  async create(createTrackingDto: CreateTrackingDto, accepterId: string): Promise<Tracking> {
    const { annonce_id } = createTrackingDto;

    const annonce = await this.annoncesService.findOne(annonce_id);
    if (!annonce) {
      throw new NotFoundException(TrackingErrorMessages.ANNONCE_NOT_FOUND);
    }

    if (annonce.user_id === accepterId) {
      throw new BadRequestException(TrackingErrorMessages.CANNOT_CREATE_TRACKING_FOR_OWN_ANNONCE);
    }

    const existingTracking = await this.trackingsRepository.findOne({
      where: {
        annonce_id,
        status: TrackingStatusEnum.IN_PROGRESS,
      },
    });

    if (existingTracking) {
      throw new BadRequestException(TrackingErrorMessages.TRACKING_ALREADY_EXISTS);
    }

    const acceptanceDeadlineHours = this.configService.get('TRACKING_ACCEPTANCE_DEADLINE_HOURS')!;
    const completionDeadlineHours = this.configService.get('TRACKING_COMPLETION_DEADLINE_HOURS')!;

    const acceptanceDeadline = dayjs().add(acceptanceDeadlineHours, 'hours').toDate();
    const completionDeadline = dayjs().add(completionDeadlineHours, 'hours').toDate();

    const tracking = this.trackingsRepository.create({
      acceptance_deadline: acceptanceDeadline,
      accepter_id: accepterId,
      annonce_id,
      completion_deadline: completionDeadline,
      creator_id: annonce.user_id,
      negotiated_price: annonce.price,
      status: TrackingStatusEnum.IN_PROGRESS,
    });

    return this.trackingsRepository.save(tracking);
  }

  async accept(trackingId: string, userId: string): Promise<Tracking> {
    const tracking = await this.findOne(trackingId);
    await this.checkDeadlines(tracking);

    if (tracking.status !== TrackingStatusEnum.IN_PROGRESS) {
      throw new BadRequestException(
        tracking.status === TrackingStatusEnum.CANCELLED
          ? TrackingErrorMessages.TRACKING_CANCELLED
          : TrackingErrorMessages.CANNOT_MODIFY_COMPLETED_TRACKING,
      );
    }

    if (tracking.creator_id !== userId && tracking.accepter_id !== userId) {
      throw new BadRequestException(TrackingErrorMessages.UNAUTHORIZED_TRACKING_ACCESS);
    }

    if (tracking.creator_id === userId && !tracking.creator_accepted_at) {
      tracking.creator_accepted_at = new Date();
    } else if (tracking.accepter_id === userId && !tracking.accepter_accepted_at) {
      tracking.accepter_accepted_at = new Date();
    }

    return this.trackingsRepository.save(tracking);
  }

  async complete(trackingId: string, userId: string): Promise<Tracking> {
    const tracking = await this.findOne(trackingId);
    await this.checkDeadlines(tracking);

    if (tracking.status !== TrackingStatusEnum.IN_PROGRESS) {
      throw new BadRequestException(
        tracking.status === TrackingStatusEnum.CANCELLED
          ? TrackingErrorMessages.TRACKING_CANCELLED
          : TrackingErrorMessages.CANNOT_MODIFY_COMPLETED_TRACKING,
      );
    }

    if (tracking.creator_id !== userId) {
      throw new BadRequestException(TrackingErrorMessages.UNAUTHORIZED_TRACKING_ACCESS);
    }

    if (!tracking.creator_accepted_at || !tracking.accepter_accepted_at) {
      throw new BadRequestException(TrackingErrorMessages.TRACKING_NOT_ACCEPTED);
    }

    if (tracking.creator_completed_at) {
      throw new BadRequestException(TrackingErrorMessages.TRACKING_ALREADY_COMPLETED);
    }

    const confirmationDeadlineHours = this.configService.get('TRACKING_CONFIRMATION_DEADLINE_HOURS')!;
    const confirmationDeadline = dayjs().add(confirmationDeadlineHours, 'hours').toDate();

    tracking.creator_completed_at = new Date();
    tracking.confirmation_deadline = confirmationDeadline;

    return this.trackingsRepository.save(tracking);
  }

  async confirm(trackingId: string, userId: string): Promise<Tracking> {
    const tracking = await this.findOne(trackingId);
    await this.checkDeadlines(tracking);

    if (tracking.status !== TrackingStatusEnum.IN_PROGRESS) {
      throw new BadRequestException(
        tracking.status === TrackingStatusEnum.CANCELLED
          ? TrackingErrorMessages.TRACKING_CANCELLED
          : TrackingErrorMessages.CANNOT_MODIFY_COMPLETED_TRACKING,
      );
    }

    if (tracking.accepter_id !== userId) {
      throw new BadRequestException(TrackingErrorMessages.UNAUTHORIZED_TRACKING_ACCESS);
    }

    if (!tracking.creator_completed_at) {
      throw new BadRequestException('Tracking must be completed before confirmation');
    }

    if (tracking.accepter_confirmed_at) {
      throw new BadRequestException(TrackingErrorMessages.TRACKING_ALREADY_CONFIRMED);
    }

    tracking.accepter_confirmed_at = new Date();
    tracking.status = TrackingStatusEnum.COMPLETED;

    return this.trackingsRepository.save(tracking);
  }

  async cancel(trackingId: string, userId: string): Promise<Tracking> {
    const tracking = await this.findOne(trackingId);

    if (tracking.status === TrackingStatusEnum.COMPLETED) {
      throw new BadRequestException(TrackingErrorMessages.CANNOT_CANCEL_COMPLETED_TRACKING);
    }

    if (tracking.status === TrackingStatusEnum.CANCELLED) {
      throw new BadRequestException(TrackingErrorMessages.TRACKING_CANCELLED);
    }

    if (tracking.creator_id !== userId && tracking.accepter_id !== userId) {
      throw new BadRequestException(TrackingErrorMessages.UNAUTHORIZED_TRACKING_ACCESS);
    }

    tracking.status = TrackingStatusEnum.CANCELLED;
    tracking.cancelled_at = new Date();
    tracking.cancelled_by = userId;

    return this.trackingsRepository.save(tracking);
  }

  async findOne(id: string): Promise<Tracking> {
    const tracking = await this.trackingsRepository.findOne({
      relations: ['annonce', 'creator', 'accepter', 'annonce.user', 'creator.role', 'accepter.role'],
      where: { id },
    });

    if (!tracking) {
      throw new NotFoundException(TrackingErrorMessages.TRACKING_NOT_FOUND);
    }

    return tracking;
  }

  private async checkDeadlines(tracking: Tracking): Promise<void> {
    const now = dayjs();

    // Check acceptance deadline
    if (now.isAfter(dayjs(tracking.acceptance_deadline))) {
      if (
        !tracking.creator_accepted_at ||
        !tracking.accepter_accepted_at ||
        tracking.status === TrackingStatusEnum.IN_PROGRESS
      ) {
        tracking.status = TrackingStatusEnum.DISPUTE;
        await this.trackingsRepository.save(tracking);
        throw new BadRequestException(TrackingErrorMessages.TRACKING_DEADLINE_EXPIRED);
      }
    }

    // Check completion deadline
    if (tracking.completion_deadline && now.isAfter(dayjs(tracking.completion_deadline))) {
      if (!tracking.creator_completed_at && tracking.status === TrackingStatusEnum.IN_PROGRESS) {
        tracking.status = TrackingStatusEnum.DISPUTE;
        await this.trackingsRepository.save(tracking);
        throw new BadRequestException(TrackingErrorMessages.TRACKING_DEADLINE_EXPIRED);
      }
    }

    // Check confirmation deadline
    if (tracking.confirmation_deadline && now.isAfter(dayjs(tracking.confirmation_deadline))) {
      if (!tracking.accepter_confirmed_at && tracking.status === TrackingStatusEnum.IN_PROGRESS) {
        tracking.status = TrackingStatusEnum.DISPUTE;
        await this.trackingsRepository.save(tracking);
        throw new BadRequestException(TrackingErrorMessages.TRACKING_DEADLINE_EXPIRED);
      }
    }

    // If already in dispute, prevent any modification
    if (tracking.status === TrackingStatusEnum.DISPUTE) {
      throw new BadRequestException(TrackingErrorMessages.TRACKING_IN_LITIGE);
    }
  }
}
