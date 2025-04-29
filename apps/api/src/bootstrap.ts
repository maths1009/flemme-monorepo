import { Env } from '@/common/utils';
import { swagger } from '@/swagger';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';

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
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
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
    }),
  );

  if (configService.get('NODE_ENV') !== 'production') {
    await swagger(app);
  }

  await app.listen(configService.get('PORT')!, () => {
    logger.log(
      `This application started at ${configService.get('HOST')}:${configService.get('PORT')}`,
    );
  });
};
