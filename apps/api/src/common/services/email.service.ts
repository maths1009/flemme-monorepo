import { EmailVerificationEmail, ResetPasswordEmail, WelcomeEmail } from '@flemme/emails';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import * as nodemailer from 'nodemailer';
import { Env } from '../utils';

export type EmailOptions = Pick<nodemailer.SendMailOptions, 'to' | 'subject' | 'html'> &
  Omit<nodemailer.SendMailOptions, 'to' | 'subject' | 'html' | 'from'>;

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService<Env>) {
    this.initializeTransporter();
  }

  private initializeTransporter(): void {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      ignoreTLS: this.configService.get('MAIL_IGNORE_TLS'),
      port: this.configService.get('MAIL_PORT'),
      secure: this.configService.get('MAIL_SECURE'),
      ...(this.configService.get('MAIL_USER') &&
        this.configService.get('MAIL_PASS') && {
          auth: {
            pass: this.configService.get('MAIL_PASS'),
            user: this.configService.get('MAIL_USER'),
          },
        }),
    });
  }

  async send(options: EmailOptions): Promise<void> {
    try {
      const mailOptions = {
        from: this.configService.get('MAIL_FROM'),
        ...options,
      };
      const result = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email envoyé avec succès: ${result.messageId}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Erreur lors de l'envoi de l'email: ${errorMessage}`, errorStack);
      throw new Error(`Échec de l'envoi de l'email: ${errorMessage}`);
    }
  }

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    const html = await render(await WelcomeEmail({ confirmationUrl: 'https://google.com', userName: name }));
    await this.send({
      html,
      subject: 'Bienvenue sur Flemme !',
      text: `Bienvenue ${name} !`,
      to,
    });
  }

  async sendEmailVerificationEmail(to: string, name: string, verificationCode: number): Promise<void> {
    const html = await render(await EmailVerificationEmail({ userName: name, verificationCode }));
    await this.send({
      html,
      subject: 'Vérifiez votre email',
      text: `Bienvenue ${name} ! Votre code de vérification est : ${verificationCode}`,
      to,
    });
  }

  async sendResetPasswordEmail(to: string, name: string, resetUrl: string): Promise<void> {
    const html = await render(await ResetPasswordEmail({ resetUrl, userName: name }));
    await this.send({
      html,
      subject: 'Réinitialisation de votre mot de passe',
      text: `Bonjour ${name}, vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur ce lien : ${resetUrl}`,
      to,
    });
  }
}
