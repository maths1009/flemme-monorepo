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
