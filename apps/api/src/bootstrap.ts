import { Env } from '@/common/utils';
import { swagger } from '@/swagger';
import { HttpException, RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import * as passport from 'passport';
import { AppModule } from './app.module';

/**
 * This function initializes the NestJS application with various middlewares, settings, and configurations.
 * It is used to set up global configurations for security, validation, logging, CORS, and more.
 *
 * @param app The NestExpressApplication instance.
 *
 * @returns {Promise<void>} Resolves when the application has started.
 */
export const bootstrap = async (app: NestExpressApplication): Promise<void> => {
  const logger = app.get(Logger);

  const configService = app.get(ConfigService<Env>);

  app.use(helmet());

  app.use(cookieParser());

  app.use(passport.initialize());

  app.setGlobalPrefix('api', {
    exclude: [
      {
        path: '/',
        method: RequestMethod.GET,
      },
      {
        path: '/api-docs',
        method: RequestMethod.GET,
      },
      {
        path: '/health',
        method: RequestMethod.GET,
      },
    ],
  });

  app.useStaticAssets('./uploads', {
    prefix: '/assets',
  });

  app.enableCors({
    credentials: true,
    origin: configService.get('ALLOW_CORS_URL'),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length', 'Date'],
  });

  app.useLogger(logger);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => {
          const constraints = error.constraints;
          if (constraints) {
            return `${error.property}: ${Object.values(constraints).join(', ')}`;
          }
          return `${error.property}: Validation failed`;
        });
        return new HttpException(messages, 400);
      },
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  if (configService.get('NODE_ENV') !== 'production') {
    await swagger(app);
  }

  await app.listen(configService.get('PORT')!, () => {
    logger.log(
      `This application started at ${configService.get('HOST')}:${configService.get('PORT')}`,
    );
  });
};
