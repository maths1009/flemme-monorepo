import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
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
import { AnnoncesService } from './annonces.service';
import { AnnonceDto, UpdateAnnonceDto } from './dto/annonce.dto';
import { AnnonceParamsDto } from './dto/annonce-params.dto';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { AnnonceErrorMessages } from './errors/annonce-error-message';

@ApiTags('annonces')
@Controller('annonces')
export class AnnoncesController {
  constructor(private readonly annoncesService: AnnoncesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all annonces with pagination' })
  @ApiResponse({
    description: 'List of annonces paginated',
    status: HttpStatus.OK,
    type: () => PaginatedResponseDto<AnnonceDto>,
  })
  async findAll(@Query() paginationDto: AnnonceParamsDto, @CurrentUser() user: User) {
    return this.annoncesService.findAll(paginationDto, user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an annonce by id' })
  @ApiParam({ description: 'Annonce id', name: 'id' })
  @ApiResponse({
    description: 'The annonce',
    status: HttpStatus.OK,
    type: AnnonceDto,
  })
  @ApiException(() => NotFoundException, {
    description: AnnonceErrorMessages.ANNONCE_NOT_FOUND,
  })
  async findOne(@Param('id') id: string) {
    const annonce = await this.annoncesService.findOne(id);
    if (!annonce) {
      throw new NotFoundException(AnnonceErrorMessages.ANNONCE_NOT_FOUND);
    }
    // We need to map it to DTO. annoncesService.findOne returns Entity.
    // However, annoncesService.findOne signature says Promise<Annonce | null>
    // checking imports... we need annonceToDto and FileService ??
    // actually let's check annoncesService.findOne implementation/usage.
    // It returns entity. we need to return DTO.
    // But annoncesService.create returns DTO.
    // Let's rely on service to return DTO or map it here.
    // Looking at existing code: annoncesService.findAll maps to DTO inside service.
    // create maps to DTO inside service.
    // findOne returns Entity (based on previous view_file).
    // I should probably map it here or update service to map it.
    // Updating service is cleaner but controller change is requested.
    // Wait, I saw annoncesService.findOne returning Promise<Annonce | null> in previous read.
    // I'll import annonceToDto and map it here, OR better, let's look at the imports available in controller.
    // Imports available: AnnonceDto.
    // I need to import annonceToDto from mappers if I do it here.
    // OR I can just return the entity and let ClassSerializerInterceptor handle it?
    // No, project seems to use manual mapping (findAll uses .map(annonceToDto)).
    // So I should map it. But I don't have FileService injected in Controller.
    // Service HAS FileService.
    // BEST APPROACH: Update Service to return DTO or have a method `findOneDto`.
    // BUT my task is "Add GET endpoint".
    // Let's look at `annonces.service.ts` again. `findOne` returns `Annonce`.
    // I will call `this.annoncesService.findOne(id)` and I need to map it.
    // But I lack `FileService` here.
    // So I should modify `AnnoncesService` to have `findOneDto` OR just modify `findOne` to return DTO?
    // `findOne` might be used internally by `update`/`delete` where we need Entity.
    // So better add `getOne` to Service that returns DTO.

    // Changing plan slightly to be robust:
    // 1. Add `getOne` to Service (returns DTO).
    // 2. Call `getOne` from Controller.

    // Let's start by modifying Service then.
    // Wait, I can't modify multiple files in one turn easily if I want to be safe.
    // I'll modify Service first.
    return this.annoncesService.getOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new annonce' })
  @ApiBody({ type: CreateAnnonceDto })
  @ApiResponse({
    description: 'The created annonce',
    status: HttpStatus.CREATED,
    type: AnnonceDto,
  })
  async create(@Body() createAnnonceDto: CreateAnnonceDto, @CurrentUser() user: User) {
    return this.annoncesService.create(createAnnonceDto, user.id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Update an annonce' })
  @ApiParam({ description: 'Annonce id', name: 'id' })
  @ApiBody({ type: UpdateAnnonceDto })
  @ApiResponse({
    description: 'Annonce updated successfully',
    status: HttpStatus.ACCEPTED,
  })
  @ApiException(() => NotFoundException, {
    description: AnnonceErrorMessages.ANNONCE_NOT_FOUND,
  })
  async updateAnnonce(@Param('id') id: string, @Body() updateAnnonceDto: UpdateAnnonceDto, @CurrentUser() user: User) {
    await this.annoncesService.update(id, updateAnnonceDto, user.id);
    //TODO: send notification to user that his annonce has been updated
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Delete an annonce' })
  @ApiParam({ description: 'Annonce id', name: 'id' })
  @ApiResponse({
    description: 'Annonce deleted successfully',
    status: HttpStatus.ACCEPTED,
  })
  @ApiException(() => NotFoundException, {
    description: AnnonceErrorMessages.ANNONCE_NOT_FOUND,
  })
  async deleteAnnonce(@Param('id') id: string, @CurrentUser() user: User) {
    await this.annoncesService.delete(id, user.id);
  }
}
