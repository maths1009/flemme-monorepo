import { PaginatedResponseDto } from '@/common/dto/pagination.dto';
import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AnnoncesService } from './annonces.service';
import { AnnonceParamsDto } from './dto/annonce-params.dto';
import { AnnonceDto } from './dto/annonce.dto';

@ApiTags('annonces')
@Controller('annonces')
export class AnnoncesController {
  constructor(private readonly annoncesService: AnnoncesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all annonces with pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of annonces paginated',
    type: () => PaginatedResponseDto<AnnonceDto>,
  })
  async findAll(@Query() paginationDto: AnnonceParamsDto, @Req() req: Request) {
    return this.annoncesService.findAll(paginationDto, req.user!.id);
  }
}
