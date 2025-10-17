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
  Req,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PaginatedResponseDto } from '@/common/dto/pagination.dto';
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
  async create(@Body() createFeedbackDto: CreateFeedbackDto, @Req() req: Request): Promise<void> {
    await this.feedbackService.create(createFeedbackDto, req.user!.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all feedbacks with pagination and filters' })
  @ApiResponse({
    description: 'List of feedbacks paginated',
    status: HttpStatus.OK,
    type: () => PaginatedResponseDto<FeedbackDto>,
  })
  async findAll(@Query() paginationDto: FeedbackParamsDto, @Req() req: Request) {
    return this.feedbackService.findAll(paginationDto, req.user!.id);
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
    @Req() req: Request,
  ): Promise<FeedbackDto> {
    const feedback = await this.feedbackService.update(id, updateFeedbackDto, req.user!.id);
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
  async delete(@Param('id') id: string, @Req() req: Request): Promise<void> {
    await this.feedbackService.delete(id, req.user!.id);
  }
}
