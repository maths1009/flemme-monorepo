import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Logger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BucketEnum } from '@/common/enums';
import { FILE_SERVICE } from '@/common/services/file.service';
import { createMockRepository } from '@/common/testing/test-utils';
import { hashPassword } from '@/common/utils';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

jest.mock('@/common/utils', () => ({
  hashPassword: jest.fn(),
}));

describe('UsersService', () => {
  let service: UsersService;
  let repository: DeepMocked<Repository<User>>;
  let fileService: any;
  let logger: DeepMocked<Logger>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
        {
          provide: Logger,
          useValue: createMock<Logger>(),
        },
        {
          provide: FILE_SERVICE,
          useValue: createMock(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
    fileService = module.get(FILE_SERVICE);
    logger = module.get(Logger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const userData = {
      email: 'test@test.com',
      password: 'password',
      username: 'test',
    };

    it('should create user successfully', async () => {
      // Setup
      repository.findOne
        .mockResolvedValueOnce(null) // Check existing (not found)
        .mockResolvedValueOnce({ id: 'user-1', ...userData } as any); // Return after save (with role)

      repository.create.mockReturnValue({ ...userData } as any);
      repository.save.mockResolvedValue({ id: 'user-1', ...userData } as any);
      (hashPassword as jest.Mock).mockResolvedValue('hashed-password');

      // Exec
      const result = await service.create(userData as any);

      // Assert
      expect(result).toBeDefined();
      expect(hashPassword).toHaveBeenCalledWith('password');
      expect(repository.save).toHaveBeenCalled();
    });

    it('should throw ConflictException if user already exists', async () => {
      repository.findOne.mockResolvedValueOnce({ id: 'existing' } as any);
      await expect(service.create(userData as any)).rejects.toThrow(ConflictException);
    });

    it('should throw Error if user not found after creation (db error)', async () => {
      repository.findOne
        .mockResolvedValueOnce(null) // Check existing
        .mockResolvedValueOnce(null); // Return after save (fail)

      repository.create.mockReturnValue({ ...userData } as any);
      repository.save.mockResolvedValue({ id: 'user-1' } as any);
      (hashPassword as jest.Mock).mockResolvedValue('hashed-password');

      await expect(service.create(userData as any)).rejects.toThrow('User not found after creation');
      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe('findByEmail', () => {
    it('should return user if found', async () => {
      const user = { email: 'test@test.com' };
      repository.findOne.mockResolvedValue(user as any);
      const result = await service.findByEmail('test@test.com');
      expect(result).toEqual(user);
    });

    it('should return null if not found', async () => {
      repository.findOne.mockResolvedValue(null);
      const result = await service.findByEmail('test@test.com');
      expect(result).toBeNull();
    });
  });

  describe('findOne', () => {
    it('should return user if found', async () => {
      const user = { id: 'user-1' };
      repository.findOne.mockResolvedValue(user as any);
      const result = await service.findOne('user-1');
      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update and return user', async () => {
      const user = { firstname: 'Updated', id: 'user-1' };
      repository.update.mockResolvedValue({ affected: 1 } as any);
      repository.findOne.mockResolvedValue(user as any);

      const result = await service.update('user-1', { firstname: 'Updated' });
      expect(result).toEqual(user);
      expect(repository.update).toHaveBeenCalledWith('user-1', { firstname: 'Updated' });
    });
  });

  describe('delete', () => {
    it('should delete user', async () => {
      repository.delete.mockResolvedValue({ affected: 1 } as any);
      await service.delete('user-1');
      expect(repository.delete).toHaveBeenCalledWith('user-1');
    });
  });

  describe('uploadProfilePicture', () => {
    const file = { buffer: Buffer.from('test') } as any;
    const userId = 'user-1';

    it('should upload picture successfully', async () => {
      fileService.exists.mockResolvedValue(false);
      fileService.upload.mockResolvedValue('url');

      await service.uploadProfilePicture(userId, file);

      expect(fileService.upload).toHaveBeenCalledWith(
        file,
        expect.objectContaining({
          bucket: BucketEnum.PROFILE_PICTURE,
          filename: `${userId}.png`,
        }),
      );
    });

    it('should delete old picture if exists', async () => {
      fileService.exists.mockResolvedValue(true);
      fileService.upload.mockResolvedValue('url');

      await service.uploadProfilePicture(userId, file);

      expect(fileService.delete).toHaveBeenCalledWith(`${userId}.png`, BucketEnum.PROFILE_PICTURE);
      expect(fileService.upload).toHaveBeenCalled();
    });

    it('should throw BadRequestException on error', async () => {
      fileService.exists.mockRejectedValue(new Error('S3 Error'));
      await expect(service.uploadProfilePicture(userId, file)).rejects.toThrow(BadRequestException);
      expect(logger.error).toHaveBeenCalled();
    });
  });
});
