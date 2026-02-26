import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as nodemailer from 'nodemailer';
import { EmailService } from './email.service';

// Mock nodemailer
jest.mock('nodemailer');
const sendMailMock = jest.fn();
(nodemailer.createTransport as jest.Mock).mockReturnValue({
  sendMail: sendMailMock,
});

// Mock react-email render
jest.mock('@react-email/components', () => ({
  render: jest.fn().mockImplementation(async content => content),
}));

// Mock flemme/emails templates
jest.mock('@flemme/emails', () => ({
  EmailVerificationEmail: jest.fn().mockImplementation(props => `Verification ${JSON.stringify(props)}`),
  ResetPasswordEmail: jest.fn().mockImplementation(props => `Reset ${JSON.stringify(props)}`),
  WelcomeEmail: jest.fn().mockImplementation(props => `Welcome ${JSON.stringify(props)}`),
}));

describe('EmailService', () => {
  let service: EmailService;
  let configService: DeepMocked<ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: ConfigService,
          useValue: createMock<ConfigService>(),
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    configService = module.get(ConfigService);

    sendMailMock.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize transporter with config', () => {
    configService.get.mockImplementation((key: string) => {
      if (key === 'MAIL_HOST') return 'smtp.test.com';
      if (key === 'MAIL_PORT') return 587;
      if (key === 'MAIL_USER') return 'user';
      if (key === 'MAIL_PASS') return 'pass';
      return null;
    });

    // Re-instantiate to trigger constructor
    new EmailService(configService);

    expect(nodemailer.createTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        auth: { pass: 'pass', user: 'user' },
        host: 'smtp.test.com',
        port: 587,
      }),
    );
  });

  describe('send', () => {
    it('should send email successfully', async () => {
      configService.get.mockReturnValue('no-reply@test.com');
      sendMailMock.mockResolvedValue({ messageId: '123' });

      await service.send({ html: '<p>Test</p>', subject: 'Test', to: 'test@test.com' });

      expect(sendMailMock).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'no-reply@test.com',
          subject: 'Test',
          to: 'test@test.com',
        }),
      );
    });

    it('should throw error if sending fails', async () => {
      sendMailMock.mockRejectedValue(new Error('SMTP Error'));

      await expect(service.send({ subject: 'test', to: 'test' })).rejects.toThrow("Échec de l'envoi de l'email");
    });
  });

  describe('sendWelcomeEmail', () => {
    it('should send welcome email', async () => {
      sendMailMock.mockResolvedValue({ messageId: '123' });
      await service.sendWelcomeEmail('test@test.com', 'John');

      expect(sendMailMock).toHaveBeenCalledWith(
        expect.objectContaining({
          html: expect.stringContaining('John'),
          subject: 'Bienvenue sur Flemme !',
          to: 'test@test.com',
        }),
      );
    });
  });

  describe('sendEmailVerificationEmail', () => {
    it('should send verification code', async () => {
      sendMailMock.mockResolvedValue({ messageId: '123' });
      await service.sendEmailVerificationEmail('test@test.com', 'John', 123456);

      expect(sendMailMock).toHaveBeenCalledWith(
        expect.objectContaining({
          html: expect.stringContaining('123456'),
          subject: 'Vérifiez votre email',
          to: 'test@test.com',
        }),
      );
    });
  });

  describe('sendResetPasswordEmail', () => {
    it('should send reset password link', async () => {
      sendMailMock.mockResolvedValue({ messageId: '123' });
      await service.sendResetPasswordEmail('test@test.com', 'John', 'http://reset-url');

      expect(sendMailMock).toHaveBeenCalledWith(
        expect.objectContaining({
          html: expect.stringContaining('http://reset-url'),
          subject: 'Réinitialisation de votre mot de passe',
          to: 'test@test.com',
        }),
      );
    });
  });
});
