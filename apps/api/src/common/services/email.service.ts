import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Env } from '../utils';
import { render } from '@react-email/render';
import { WelcomeEmail } from '@flemme/emails';

export type EmailOptions = Pick<
  nodemailer.SendMailOptions,
  'to' | 'subject' | 'html'
> &
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
      port: this.configService.get('MAIL_PORT'),
      secure: this.configService.get('MAIL_SECURE'),
      ignoreTLS: this.configService.get('MAIL_IGNORE_TLS'),
      ...(this.configService.get('MAIL_USER') &&
        this.configService.get('MAIL_PASS') && {
          auth: {
            user: this.configService.get('MAIL_USER'),
            pass: this.configService.get('MAIL_PASS'),
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
      const errorMessage =
        error instanceof Error ? error.message : 'Erreur inconnue';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Erreur lors de l'envoi de l'email: ${errorMessage}`,
        errorStack,
      );
      throw new Error(`Échec de l'envoi de l'email: ${errorMessage}`);
    }
  }

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    /* const html = await render(await WelcomeEmail({userName: name, confirmationUrl: 'https://google.com'})) */
    await this.send({
      to,
      subject: 'Bienvenue sur Flemme !',
      html: `
        <h1>Bienvenue sur Flemme !</h1>
        <p>Bienvenue ${name} !</p>
      `,
      text: `Bienvenue ${name} !`,
    });
  }

  async sendEmailVerificationEmail(
    to: string,
    name: string,
    verificationCode: number,
  ): Promise<void> {
    await this.send({
      to,
      subject: 'Vérifiez votre email',
      html: `
        <h1>Vérifiez votre email</h1>
        <p>Bienvenue ${name} !</p>
        <p>Votre code de vérification est : ${verificationCode}</p>
      `,
      text: `Bienvenue ${name} ! Votre code de vérification est : ${verificationCode}`,
    });
  }
}
