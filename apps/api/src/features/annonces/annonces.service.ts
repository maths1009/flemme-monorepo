import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginatedResponseDto } from '@/common/dto/pagination.dto';
import { FILE_SERVICE, FileServiceInterface } from '@/common/services/file.service';
import { PaginationService } from '@/common/services/pagination.service';
import { AnnonceDto, UpdateAnnonceDto } from './dto/annonce.dto';
import { AnnonceParamsDto } from './dto/annonce-params.dto';
import { Annonce } from './entities/annonce.entity';
import { AnnonceErrorMessages } from './errors/annonce-error-message';
import { annonceToDto } from './mappers/annonce.mapper';

@Injectable()
export class AnnoncesService {
  constructor(
    @InjectRepository(Annonce)
    private annoncesRepository: Repository<Annonce>,
    private readonly paginationService: PaginationService,
    @Inject(FILE_SERVICE)
    private readonly fileService: FileServiceInterface,
  ) {}

  async findAll(paginationDto: AnnonceParamsDto, user_id: string): Promise<PaginatedResponseDto<AnnonceDto>> {
    const queryBuilder = this.annoncesRepository
      .createQueryBuilder('annonce')
      .leftJoinAndSelect('annonce.user', 'user')
      .leftJoinAndSelect('user.role', 'role')
      .where('annonce.user_id != :user_id', { user_id });

    if (paginationDto.latitude && paginationDto.longitude) {
      const distanceQuery = `(
        6371 * acos(
          cos(radians(:latitude)) * 
          cos(radians(annonce.latitude)) * 
          cos(radians(annonce.longitude) - radians(:longitude)) + 
          sin(radians(:latitude)) * 
          sin(radians(annonce.latitude))
        )
      )`;

      queryBuilder
        .addSelect(distanceQuery, 'distance')
        .setParameter('latitude', paginationDto.latitude)
        .setParameter('longitude', paginationDto.longitude)
        .setParameter('maxDistance', paginationDto.distance ?? 5)
        .andWhere(`${distanceQuery} <= :maxDistance`)
        .orderBy('distance', 'ASC');
    }

    return this.paginationService.paginate<Annonce, AnnonceDto>(
      this.annoncesRepository,
      paginationDto,
      queryBuilder,
      async annonces => Promise.all(annonces.map(annonce => annonceToDto(annonce, this.fileService))),
    );
  }

  async update(id: string, updateAnnonceDto: UpdateAnnonceDto, user_id: string): Promise<void> {
    const annonce = await this.annoncesRepository.preload({
      id,
      ...updateAnnonceDto,
    });

    if (!annonce || annonce.user_id !== user_id) {
      throw new NotFoundException(AnnonceErrorMessages.ANNONCE_NOT_FOUND);
    }

    await this.annoncesRepository.save(annonce);
  }

  async findOne(id: string): Promise<Annonce | null> {
    return await this.annoncesRepository.findOne({
      relations: ['user', 'user.role'],
      where: { id },
    });
  }

  async delete(id: string, user_id: string): Promise<void> {
    const annonce = await this.annoncesRepository.findOne({ where: { id, user_id } });
    if (!annonce) {
      throw new NotFoundException(AnnonceErrorMessages.ANNONCE_NOT_FOUND);
    }
    await this.annoncesRepository.delete(id);
  }
}
