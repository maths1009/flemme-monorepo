import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as dayjs from 'dayjs';
import { EmailService } from '@/common/services/email.service';
import { FILE_SERVICE } from '@/common/services/file.service';
import { comparePasswords, hashPassword } from '@/common/utils/password.util';
import { DevicesService } from '@/features/devices/devices.service';
import { UsersService } from '@/features/users/users.service';
import { AuthService } from './auth.service';

jest.mock('@/common/utils/password.util', () => ({
  comparePasswords: jest.fn(),
  hashPassword: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let usersService: DeepMocked<UsersService>;
  let devicesService: DeepMocked<DevicesService>;
  let emailService: DeepMocked<EmailService>;
  let configService: DeepMocked<ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: createMock<UsersService>() },
        { provide: DevicesService, useValue: createMock<DevicesService>() },
        { provide: EmailService, useValue: createMock<EmailService>() },
        { provide: ConfigService, useValue: createMock<ConfigService>() },
        { provide: 'REDIS_CLIENT', useValue: createMock() },
        { provide: FILE_SERVICE, useValue: createMock() },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    devicesService = module.get(DevicesService);
    emailService = module.get(EmailService);
    configService = module.get(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return user dto if validation succeeds', async () => {
      const user = { email: 'test@test.com', id: 'user-1', password: 'hashed-password' };
      usersService.findByEmail.mockResolvedValue(user as any);
      (comparePasswords as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('test@test.com', 'password');

      expect(result).toBeDefined();
      expect(result?.email).toBe('test@test.com');
    });

    it('should return null if user not found', async () => {
      usersService.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser('test@test.com', 'password');

      expect(result).toBeNull();
    });

    it('should return null if password invalid', async () => {
      const user = { id: 'user-1', password: 'hashed-password' };
      usersService.findByEmail.mockResolvedValue(user as any);
      (comparePasswords as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser('test@test.com', 'password');

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return user dto', async () => {
      const user = { id: 'user-1' };
      const sessionId = 'session-1';
      devicesService.create.mockResolvedValue({ id: sessionId } as any);

      const result = await service.login(user as any, sessionId);

      expect(result.user).toBeDefined();
      expect(devicesService.create).toHaveBeenCalledWith(sessionId, 'user-1', undefined, undefined);
    });
  });

  describe('register', () => {
    const registerDto = {
      email: 'test@test.com',
      firstname: 'Test',
      lastname: 'User',
      password: 'password',
      username: 'testuser', // Fixed: Added username
    };

    it('should register user successfully', async () => {
      const createdUser = { id: 'user-1', ...registerDto };
      usersService.create.mockResolvedValue(createdUser as any);

      const result = await service.register(registerDto);

      expect(usersService.create).toHaveBeenCalledWith(registerDto);
      expect(emailService.sendEmailVerificationEmail).toHaveBeenCalled();
      expect(usersService.update).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result.id).toBe('user-1');
    });

    it('should throw error if email already verified (internally called method)', async () => {
      const user = { email_verified: true };
      await expect(service.sendEmailVerificationEmail(user as any)).rejects.toThrow(BadRequestException);
    });
  });

  describe('verifyEmail', () => {
    it('should verify email successfully', async () => {
      const user = {
        email_verification_code: 123456,
        email_verification_expired_at: dayjs().add(10, 'minutes').toDate(),
        email_verified: false,
        id: 'user-1',
      };
      usersService.findOne.mockResolvedValue(user as any);

      await service.verifyEmail('user-1', 123456);

      expect(usersService.update).toHaveBeenCalledWith('user-1', expect.objectContaining({ email_verified: true }));
      expect(emailService.sendWelcomeEmail).toHaveBeenCalled();
    });

    it('should throw NotFoundException if user not found', async () => {
      usersService.findOne.mockResolvedValue(null);
      await expect(service.verifyEmail('user-1', 123456)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequest if already verified', async () => {
      usersService.findOne.mockResolvedValue({ email_verified: true } as any);
      await expect(service.verifyEmail('user-1', 123456)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequest if code invalid', async () => {
      usersService.findOne.mockResolvedValue({
        email_verification_code: 654321,
        email_verified: false,
      } as any);
      await expect(service.verifyEmail('user-1', 123456)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequest if code expired', async () => {
      usersService.findOne.mockResolvedValue({
        email_verification_code: 123456,
        email_verification_expired_at: dayjs().subtract(10, 'minutes').toDate(),
        email_verified: false,
      } as any);
      await expect(service.verifyEmail('user-1', 123456)).rejects.toThrow(BadRequestException);
    });
  });

  describe('requestPasswordReset', () => {
    it('should send reset email if user found', async () => {
      const user = { email: 'test@test.com', firstname: 'Test', id: 'user-1' };
      usersService.findByEmail.mockResolvedValue(user as any);
      configService.get.mockReturnValue('http://frontend.com');

      await service.requestPasswordReset({ email: 'test@test.com' });

      expect(usersService.update).toHaveBeenCalled();
      expect(emailService.sendResetPasswordEmail).toHaveBeenCalledWith(
        'test@test.com',
        'Test',
        expect.stringMatching(/http:\/\/frontend\.com\/reset-password\?token=[a-f0-9]+/),
      );
    });

    it('should do nothing if user not found', async () => {
      usersService.findByEmail.mockResolvedValue(null);

      await service.requestPasswordReset({ email: 'test@test.com' });

      expect(usersService.update).not.toHaveBeenCalled();
      expect(emailService.sendResetPasswordEmail).not.toHaveBeenCalled();
    });
  });

  describe('confirmPasswordReset', () => {
    const confirmDto = { newPassword: 'new-password', token: 'valid-token' };

    it('should reset password successfully', async () => {
      const user = {
        id: 'user-1',
        password_reset_expired_at: dayjs().add(1, 'hour').toDate(),
        password_reset_token: 'valid-token',
      };
      usersService.findByPasswordResetToken.mockResolvedValue(user as any);
      (hashPassword as jest.Mock).mockResolvedValue('new-hashed-password');

      await service.confirmPasswordReset(confirmDto);

      expect(usersService.update).toHaveBeenCalledWith(
        'user-1',
        expect.objectContaining({ password: 'new-hashed-password' }),
      );
      expect(devicesService.deleteUserSessions).toHaveBeenCalledWith('user-1');
    });

    it('should throw BadRequest if token invalid', async () => {
      usersService.findByPasswordResetToken.mockResolvedValue(null);
      await expect(service.confirmPasswordReset(confirmDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequest if token expired', async () => {
      usersService.findByPasswordResetToken.mockResolvedValue({
        password_reset_expired_at: dayjs().subtract(1, 'hour').toDate(),
        password_reset_token: 'valid-token',
      } as any);
      await expect(service.confirmPasswordReset(confirmDto)).rejects.toThrow(BadRequestException);
    });
  });
});
