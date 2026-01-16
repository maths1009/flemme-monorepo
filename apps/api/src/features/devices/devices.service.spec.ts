import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createMockRepository } from '@/common/testing/test-utils';
import { DevicesService } from './devices.service';
import { Device } from './entities/device.entity';

describe('DevicesService', () => {
  let service: DevicesService;
  let repository: DeepMocked<Repository<Device>>;
  let configService: DeepMocked<ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevicesService,
        {
          provide: getRepositoryToken(Device),
          useValue: createMockRepository(),
        },
        {
          provide: ConfigService,
          useValue: createMock<ConfigService>(),
        },
      ],
    }).compile();

    service = module.get<DevicesService>(DevicesService);
    repository = module.get(getRepositoryToken(Device));
    configService = module.get(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const userId = 'user-1';

    it('should create session successfully', async () => {
      configService.get.mockReturnValue(3600000); // 1 hour in ms
      repository.create.mockReturnValue({ id: 'session-1' } as any);
      repository.save.mockResolvedValue({ id: 'session-1' } as any);

      const result = await service.create('session-1', userId, 'Mozilla/5.0', '127.0.0.1');

      expect(result).toBeDefined();
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'session-1',
          ip: '127.0.0.1',
          user_agent: 'Mozilla/5.0',
          user_id: userId,
        }),
      );
      // Verify expiration is set
      const createCall = repository.create.mock.calls[0][0];
      expect(createCall.expired_at).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should return session if found', async () => {
      const session = { id: 'session-1' };
      repository.findOne.mockResolvedValue(session as any);

      const result = await service.findOne('session-1');
      expect(result).toEqual(session);
    });

    it('should return null if not found', async () => {
      repository.findOne.mockResolvedValue(null);
      const result = await service.findOne('session-1');
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete session', async () => {
      repository.delete.mockResolvedValue({ affected: 1 } as any);
      await service.delete('session-1');
      expect(repository.delete).toHaveBeenCalledWith('session-1');
    });
  });

  describe('deleteUserSessions', () => {
    it('should delete all sessions for user', async () => {
      repository.delete.mockResolvedValue({ affected: 5 } as any);
      await service.deleteUserSessions('user-1');
      expect(repository.delete).toHaveBeenCalledWith({ user_id: 'user-1' });
    });
  });
});
