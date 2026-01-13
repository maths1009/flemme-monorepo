import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { PaginatedResponseDto } from '@/common/dto/pagination.dto';
import { User } from '../users/entities/user.entity';
import { CreateFeedbackDto, FeedbackDto, FeedbackParamsDto, UpdateFeedbackDto } from './dto/feedback.dto';
import { FeedbackErrorMessages } from './errors/feedback-error-messages.enum';
import { FeedbackService } from './feedback.service';
import { feedbackToDto } from './mappers/feedback.mapper';

@ApiTags('feedbacks')
@Controller('feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new feedback' })
  @ApiBody({ type: CreateFeedbackDto })
  @ApiResponse({
    description: 'Feedback created successfully',
    status: HttpStatus.CREATED,
    type: FeedbackDto,
  })
  @ApiException(() => BadRequestException, {
    description: FeedbackErrorMessages.CANNOT_FEEDBACK_YOURSELF,
  })
  @ApiException(() => BadRequestException, {
    description: FeedbackErrorMessages.FEEDBACK_ALREADY_EXISTS,
  })
  @ApiException(() => NotFoundException, {
    description: FeedbackErrorMessages.RECEIVER_NOT_FOUND,
  })
  async create(@Body() createFeedbackDto: CreateFeedbackDto, @CurrentUser() user: User): Promise<void> {
    await this.feedbackService.create(createFeedbackDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all feedbacks with pagination and filters' })
  @ApiResponse({
    description: 'List of feedbacks paginated',
    status: HttpStatus.OK,
    type: () => PaginatedResponseDto<FeedbackDto>,
  })
  async findAll(@Query() paginationDto: FeedbackParamsDto, @CurrentUser() user: User) {
    return this.feedbackService.findAll(paginationDto, user.id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Update a feedback' })
  @ApiParam({ description: 'Feedback id', name: 'id' })
  @ApiBody({ type: UpdateFeedbackDto })
  @ApiResponse({
    description: 'Feedback updated successfully',
    status: HttpStatus.ACCEPTED,
    type: FeedbackDto,
  })
  @ApiException(() => NotFoundException, {
    description: FeedbackErrorMessages.FEEDBACK_NOT_FOUND,
  })
  @ApiException(() => BadRequestException, {
    description: FeedbackErrorMessages.CANNOT_MODIFY_OTHER_FEEDBACK,
  })
  async update(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
    @CurrentUser() user: User,
  ): Promise<FeedbackDto> {
    const feedback = await this.feedbackService.update(id, updateFeedbackDto, user.id);
    return feedbackToDto(feedback);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Delete a feedback' })
  @ApiParam({ description: 'Feedback id', name: 'id' })
  @ApiResponse({
    description: 'Feedback deleted successfully',
    status: HttpStatus.ACCEPTED,
  })
  @ApiException(() => NotFoundException, {
    description: FeedbackErrorMessages.FEEDBACK_NOT_FOUND,
  })
  @ApiException(() => BadRequestException, {
    description: FeedbackErrorMessages.CANNOT_MODIFY_OTHER_FEEDBACK,
  })
  async delete(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    await this.feedbackService.delete(id, user.id);
  }
}
