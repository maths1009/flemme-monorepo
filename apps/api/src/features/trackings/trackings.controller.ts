import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { FILE_SERVICE, FileServiceInterface } from '@/common/services/file.service';
import { User } from '../users/entities/user.entity';
import {
  AcceptTrackingDto,
  CancelTrackingDto,
  CompleteTrackingDto,
  ConfirmTrackingDto,
  CreateTrackingDto,
  TrackingDto,
} from './dto/tracking.dto';
import { TrackingErrorMessages } from './errors/tracking-error-messages.enum';
import { trackingToDto } from './mappers/tracking.mapper';
import { TrackingsService } from './trackings.service';

@ApiTags('trackings')
@Controller('trackings')
export class TrackingsController {
  constructor(
    private readonly trackingsService: TrackingsService,
    @Inject(FILE_SERVICE) private readonly fileService: FileServiceInterface,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new tracking' })
  @ApiBody({ type: CreateTrackingDto })
  @ApiResponse({
    description: 'Tracking created successfully',
    status: HttpStatus.CREATED,
    type: TrackingDto,
  })
  @ApiException(() => BadRequestException, {
    description: TrackingErrorMessages.CANNOT_CREATE_TRACKING_FOR_OWN_ANNONCE,
  })
  @ApiException(() => BadRequestException, {
    description: TrackingErrorMessages.TRACKING_ALREADY_EXISTS,
  })
  @ApiException(() => NotFoundException, {
    description: TrackingErrorMessages.ANNONCE_NOT_FOUND,
  })
  async create(@Body() createTrackingDto: CreateTrackingDto, @CurrentUser() user: User): Promise<TrackingDto> {
    const tracking = await this.trackingsService.create(createTrackingDto, user.id);
    const fullTracking = await this.trackingsService.findOne(tracking.id);
    return trackingToDto(fullTracking, this.fileService);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a tracking by id' })
  @ApiParam({ description: 'Tracking id', name: 'id' })
  @ApiResponse({
    description: 'Tracking details',
    status: HttpStatus.OK,
    type: TrackingDto,
  })
  @ApiException(() => NotFoundException, {
    description: TrackingErrorMessages.TRACKING_NOT_FOUND,
  })
  async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<TrackingDto> {
    const tracking = await this.trackingsService.findOne(id);

    if (tracking.creator_id !== user.id && tracking.accepter_id !== user.id) {
      throw new BadRequestException(TrackingErrorMessages.UNAUTHORIZED_TRACKING_ACCESS);
    }

    return trackingToDto(tracking, this.fileService);
  }

  @Patch(':id/accept')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Accept a tracking' })
  @ApiParam({ description: 'Tracking id', name: 'id' })
  @ApiBody({ type: AcceptTrackingDto })
  @ApiResponse({
    description: 'Tracking accepted successfully',
    status: HttpStatus.ACCEPTED,
    type: TrackingDto,
  })
  @ApiException(() => NotFoundException, {
    description: TrackingErrorMessages.TRACKING_NOT_FOUND,
  })
  @ApiException(() => BadRequestException, {
    description: TrackingErrorMessages.TRACKING_CANCELLED,
  })
  @ApiException(() => BadRequestException, {
    description: TrackingErrorMessages.TRACKING_DEADLINE_EXPIRED,
  })
  @ApiException(() => BadRequestException, {
    description: TrackingErrorMessages.UNAUTHORIZED_TRACKING_ACCESS,
  })
  async accept(
    @Param('id') id: string,
    @Body() _acceptDto: AcceptTrackingDto,
    @CurrentUser() user: User,
  ): Promise<TrackingDto> {
    const tracking = await this.trackingsService.accept(id, user.id);
    const fullTracking = await this.trackingsService.findOne(tracking.id);
    return trackingToDto(fullTracking, this.fileService);
  }

  @Patch(':id/complete')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Mark tracking as completed' })
  @ApiParam({ description: 'Tracking id', name: 'id' })
  @ApiBody({ type: CompleteTrackingDto })
  @ApiResponse({
    description: 'Tracking completed successfully',
    status: HttpStatus.ACCEPTED,
    type: TrackingDto,
  })
  @ApiException(() => NotFoundException, {
    description: TrackingErrorMessages.TRACKING_NOT_FOUND,
  })
  @ApiException(() => BadRequestException, {
    description: TrackingErrorMessages.TRACKING_NOT_ACCEPTED,
  })
  @ApiException(() => BadRequestException, {
    description: TrackingErrorMessages.TRACKING_ALREADY_COMPLETED,
  })
  @ApiException(() => BadRequestException, {
    description: TrackingErrorMessages.UNAUTHORIZED_TRACKING_ACCESS,
  })
  async complete(
    @Param('id') id: string,
    @Body() _completeDto: CompleteTrackingDto,
    @CurrentUser() user: User,
  ): Promise<TrackingDto> {
    const tracking = await this.trackingsService.complete(id, user.id);
    const fullTracking = await this.trackingsService.findOne(tracking.id);
    return trackingToDto(fullTracking, this.fileService);
  }

  @Patch(':id/confirm')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Confirm tracking completion' })
  @ApiParam({ description: 'Tracking id', name: 'id' })
  @ApiBody({ type: ConfirmTrackingDto })
  @ApiResponse({
    description: 'Tracking confirmed successfully',
    status: HttpStatus.ACCEPTED,
    type: TrackingDto,
  })
  @ApiException(() => NotFoundException, {
    description: TrackingErrorMessages.TRACKING_NOT_FOUND,
  })
  @ApiException(() => BadRequestException, {
    description: TrackingErrorMessages.TRACKING_ALREADY_CONFIRMED,
  })
  @ApiException(() => BadRequestException, {
    description: TrackingErrorMessages.UNAUTHORIZED_TRACKING_ACCESS,
  })
  async confirm(
    @Param('id') id: string,
    @Body() _confirmDto: ConfirmTrackingDto,
    @CurrentUser() user: User,
  ): Promise<TrackingDto> {
    const tracking = await this.trackingsService.confirm(id, user.id);
    const fullTracking = await this.trackingsService.findOne(tracking.id);
    return trackingToDto(fullTracking, this.fileService);
  }

  @Patch(':id/cancel')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Cancel a tracking' })
  @ApiParam({ description: 'Tracking id', name: 'id' })
  @ApiBody({ type: CancelTrackingDto })
  @ApiResponse({
    description: 'Tracking cancelled successfully',
    status: HttpStatus.ACCEPTED,
    type: TrackingDto,
  })
  @ApiException(() => NotFoundException, {
    description: TrackingErrorMessages.TRACKING_NOT_FOUND,
  })
  @ApiException(() => BadRequestException, {
    description: TrackingErrorMessages.CANNOT_CANCEL_COMPLETED_TRACKING,
  })
  @ApiException(() => BadRequestException, {
    description: TrackingErrorMessages.TRACKING_CANCELLED,
  })
  @ApiException(() => BadRequestException, {
    description: TrackingErrorMessages.UNAUTHORIZED_TRACKING_ACCESS,
  })
  async cancel(
    @Param('id') id: string,
    @Body() _cancelDto: CancelTrackingDto,
    @CurrentUser() user: User,
  ): Promise<TrackingDto> {
    const tracking = await this.trackingsService.cancel(id, user.id);
    const fullTracking = await this.trackingsService.findOne(tracking.id);
    return trackingToDto(fullTracking, this.fileService);
  }
}
