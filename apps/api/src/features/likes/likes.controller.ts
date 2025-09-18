import { PaginatedResponseDto } from '@/common/dto/pagination.dto';
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
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { CreateLikeDto, LikeDto, LikeParamsDto } from './dto/like.dto';
import { LikeErrorMessages } from './errors/like-error-messages.enum';
import { LikesService } from './likes.service';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new like' })
  @ApiBody({ type: CreateLikeDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Like created successfully',
    type: LikeDto,
  })
  @ApiException(() => BadRequestException, {
    description: LikeErrorMessages.CANNOT_LIKE_YOURSELF,
  })
  @ApiException(() => BadRequestException, {
    description: LikeErrorMessages.LIKE_ALREADY_EXISTS,
  })
  @ApiException(() => NotFoundException, {
    description: LikeErrorMessages.ANNONCE_NOT_FOUND,
  })
  async create(
    @Body() createLikeDto: CreateLikeDto,
    @Req() req: Request,
  ): Promise<void> {
    await this.likesService.create(createLikeDto, req.user!.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all likes with pagination and filters' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of likes paginated',
    type: () => PaginatedResponseDto<LikeDto>,
  })
  async findAll(@Query() params: LikeParamsDto, @Req() req: Request) {
    return this.likesService.findAll(params, req.user!.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Delete a like' })
  @ApiParam({ name: 'id', description: 'Like id' })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Like deleted successfully',
  })
  @ApiException(() => NotFoundException, {
    description: LikeErrorMessages.LIKE_NOT_FOUND,
  })
  @ApiException(() => BadRequestException, {
    description: LikeErrorMessages.CANNOT_DELETE_OTHER_LIKE,
  })
  async delete(@Param('id') id: string, @Req() req: Request): Promise<void> {
    await this.likesService.delete(id, req.user!.id);
  }
}
