import { ObjectLiteral, Repository } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MockRepository<T extends ObjectLiteral = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createMockRepository = <T extends ObjectLiteral = any>(): MockRepository<T> => ({
  create: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnValue({
    addSelect: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn().mockReturnThis(),
    getOne: jest.fn().mockReturnThis(),
    getRawOne: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    orWhere: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    setParameter: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
  }),
  delete: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  preload: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
});
