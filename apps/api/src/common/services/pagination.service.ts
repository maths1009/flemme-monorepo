import { Injectable } from '@nestjs/common';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { PaginatedResponseDto, PaginationDto } from '../dto/pagination.dto';

type TransformFunction<T extends ObjectLiteral, R> = (
  data: T[],
) => Promise<R[]>;

@Injectable()
export class PaginationService {
  async paginate<T extends ObjectLiteral, R extends ObjectLiteral = T>(
    repository: Repository<T>,
    paginationDto: PaginationDto,
    queryBuilder?: SelectQueryBuilder<T>,
    transform?: TransformFunction<T, R>,
  ): Promise<PaginatedResponseDto<R>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const query = queryBuilder || repository.createQueryBuilder('entity');
    const [data, total] = await query.skip(skip).take(limit).getManyAndCount();

    const transformedData = transform
      ? await transform(data)
      : (data as unknown as R[]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: transformedData,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  }
}
