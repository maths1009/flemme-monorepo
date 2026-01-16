import { HttpException, RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { RedisStore } from 'connect-redis';
import * as session from 'express-session';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import * as passport from 'passport';
import { createClient } from 'redis';
import { REDIS_SESSION_PREFIX } from '@/common/constants/redis.constants';
import { Env } from '@/common/utils';
import { swagger } from '@/swagger';
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

  app.useLogger(logger);

  if (configService.get('NODE_ENV') !== 'production') {
    await swagger(app);
  }

  app.setGlobalPrefix('api/v1', {
    exclude: [
      {
        method: RequestMethod.GET,
        path: '/',
      },
      {
        method: RequestMethod.GET,
        path: '/api-docs',
      },
      {
        method: RequestMethod.GET,
        path: '/health',
      },
    ],
  });

  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['Content-Length', 'Date'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    origin: configService.get('FRONTEND_URL'),
  });

  app.use(helmet());

  const redisClient = createClient({
    password: configService.get('REDIS_PASSWORD'),
    url: `redis://${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}`,
  });

  await redisClient.connect().catch(console.error);

  app.use(
    session({
      cookie: {
        httpOnly: true,
        maxAge: configService.get('SESSION_EXPIRATION_TIME'),
        secure: configService.get('NODE_ENV') === 'production',
      },
      resave: false,
      saveUninitialized: false,
      secret: configService.get<string>('SESSION_SECRET')!,
      store: new RedisStore({
        client: redisClient,
        prefix: REDIS_SESSION_PREFIX,
      }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: errors => {
        const messages = errors.map(error => {
          const constraints = error.constraints;
          if (constraints) {
            return `${error.property}: ${Object.values(constraints).join(', ')}`;
          }
          return `${error.property}: Validation failed`;
        });
        return new HttpException(messages, 400);
      },
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(configService.get('PORT')!);
  logger.log(`This application started at ${await app.getUrl()}`);
};
