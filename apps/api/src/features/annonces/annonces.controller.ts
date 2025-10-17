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
  Query,
  Req,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PaginatedResponseDto } from '@/common/dto/pagination.dto';
import { AnnoncesService } from './annonces.service';
import { AnnonceDto, UpdateAnnonceDto } from './dto/annonce.dto';
import { AnnonceParamsDto } from './dto/annonce-params.dto';
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
  async findAll(@Query() paginationDto: AnnonceParamsDto, @Req() req: Request) {
    return this.annoncesService.findAll(paginationDto, req.user!.id);
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
  async updateAnnonce(@Param('id') id: string, @Body() updateAnnonceDto: UpdateAnnonceDto, @Req() req: Request) {
    this.annoncesService.update(id, updateAnnonceDto, req.user!.id);
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
  async deleteAnnonce(@Param('id') id: string, @Req() req: Request) {
    this.annoncesService.delete(id, req.user!.id);
  }
}
