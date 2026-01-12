import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as dayjs from 'dayjs';
import { EmailService } from '@/common/services/email.service';
import { FILE_SERVICE } from '@/common/services/file.service';
import { comparePasswords, hashPassword } from '@/common/utils/password.util';
import { SessionsService } from '@/features/sessions/sessions.service';
import { UsersService } from '@/features/users/users.service';
import { AuthService } from './auth.service';

jest.mock('@/common/utils/password.util', () => ({
  comparePasswords: jest.fn(),
  hashPassword: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let usersService: DeepMocked<UsersService>;
  let sessionsService: DeepMocked<SessionsService>;
  let jwtService: DeepMocked<JwtService>;
  let emailService: DeepMocked<EmailService>;
  let configService: DeepMocked<ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: createMock<UsersService>() },
        { provide: SessionsService, useValue: createMock<SessionsService>() },
        { provide: JwtService, useValue: createMock<JwtService>() },
        { provide: EmailService, useValue: createMock<EmailService>() },
        { provide: ConfigService, useValue: createMock<ConfigService>() },
        { provide: FILE_SERVICE, useValue: createMock() },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    sessionsService = module.get(SessionsService);
    jwtService = module.get(JwtService);
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
    it('should return access token and user', async () => {
      const user = { id: 'user-1' };
      sessionsService.create.mockResolvedValue({ id: 'session-1' } as any);
      jwtService.sign.mockReturnValue('token');

      const result = await service.login(user as any);

      expect(result.access_token).toBe('token');
      expect(result.user).toBeDefined();
      expect(sessionsService.create).toHaveBeenCalledWith('user-1', undefined, undefined);
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
      sessionsService.create.mockResolvedValue({ id: 'session-1' } as any);
      jwtService.sign.mockReturnValue('token');

      const result = await service.register(registerDto);

      expect(result.access_token).toBe('token');
      expect(usersService.create).toHaveBeenCalledWith(registerDto);
      expect(emailService.sendEmailVerificationEmail).toHaveBeenCalled();
      expect(usersService.update).toHaveBeenCalled();
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
      jwtService.sign.mockReturnValue('reset-token');
      configService.get.mockReturnValue('http://frontend.com');

      await service.requestPasswordReset({ email: 'test@test.com' });

      expect(usersService.update).toHaveBeenCalled();
      expect(emailService.sendResetPasswordEmail).toHaveBeenCalledWith(
        'test@test.com',
        'Test',
        expect.stringContaining('reset-token'),
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
      jwtService.verify.mockReturnValue({ email: 'test@test.com', type: 'password_reset' });
      const user = {
        id: 'user-1',
        password_reset_expired_at: dayjs().add(1, 'hour').toDate(),
        password_reset_token: 'valid-token',
      };
      usersService.findByEmail.mockResolvedValue(user as any);
      (hashPassword as jest.Mock).mockResolvedValue('new-hashed-password');

      await service.confirmPasswordReset(confirmDto);

      expect(usersService.update).toHaveBeenCalledWith(
        'user-1',
        expect.objectContaining({ password: 'new-hashed-password' }),
      );
      expect(sessionsService.deleteUserSessions).toHaveBeenCalledWith('user-1');
    });

    it('should throw BadRequest if token type invalid', async () => {
      jwtService.verify.mockReturnValue({ type: 'access_token' });
      await expect(service.confirmPasswordReset(confirmDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequest if token mismatched', async () => {
      jwtService.verify.mockReturnValue({ email: 'test@test.com', type: 'password_reset' });
      usersService.findByEmail.mockResolvedValue({ password_reset_token: 'other-token' } as any);
      await expect(service.confirmPasswordReset(confirmDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequest if token expired', async () => {
      jwtService.verify.mockReturnValue({ email: 'test@test.com', type: 'password_reset' });
      usersService.findByEmail.mockResolvedValue({
        password_reset_expired_at: dayjs().subtract(1, 'hour').toDate(),
        password_reset_token: 'valid-token',
      } as any);
      await expect(service.confirmPasswordReset(confirmDto)).rejects.toThrow(BadRequestException);
    });
  });
});
