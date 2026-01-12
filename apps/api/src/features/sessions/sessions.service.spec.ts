import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { createMockRepository } from '@/common/testing/test-utils';
import { Session } from './entities/session.entity';
import { SessionsService } from './sessions.service';

describe('SessionsService', () => {
  let service: SessionsService;
  let repository: DeepMocked<Repository<Session>>;
  let configService: DeepMocked<ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionsService,
        {
          provide: getRepositoryToken(Session),
          useValue: createMockRepository(),
        },
        {
          provide: ConfigService,
          useValue: createMock<ConfigService>(),
        },
      ],
    }).compile();

    service = module.get<SessionsService>(SessionsService);
    repository = module.get(getRepositoryToken(Session));
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

      const result = await service.create(userId, 'Mozilla/5.0', '127.0.0.1');

      expect(result).toBeDefined();
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
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

  describe('updateLastUsed', () => {
    it('should update last_used_at', async () => {
      repository.update.mockResolvedValue({ affected: 1 } as any);

      await service.updateLastUsed('session-1');

      expect(repository.update).toHaveBeenCalledWith(
        { id: 'session-1' },
        expect.objectContaining({ last_used_at: expect.any(String) }),
      );
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
