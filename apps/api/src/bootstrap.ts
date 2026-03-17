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

const splitCsv = (value?: string): string[] =>
  (value ?? '')
    .split(',')
    .map(v => v.trim())
    .filter(Boolean);

const deriveCookieDomainFromUrl = (urlString: string): string | undefined => {
  try {
    const hostname = new URL(urlString).hostname;
    // Don't set Domain for localhost-style environments.
    if (hostname === 'localhost' || hostname.endsWith('.localhost')) return undefined;

    const parts = hostname.split('.').filter(Boolean);
    if (parts.length < 2) return undefined;

    // Simple base-domain derivation (example: app.example.com -> .example.com)
    const base = parts.slice(-2).join('.');
    return `.${base}`;
  } catch {
    return undefined;
  }
};

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

  // In production we are typically behind a TLS-terminating proxy (NGINX/Ingress/Cloudflare).
  // Without trust proxy, req.secure may be false and secure cookies won't be set.
  if (configService.get('NODE_ENV') === 'production') {
    const hops = configService.get('TRUST_PROXY_HOPS') ?? 1;
    app.getHttpAdapter().getInstance().set('trust proxy', hops);
  }

  if (configService.get('NODE_ENV') !== 'production') {
    await swagger(app);
  }

  app.setGlobalPrefix('v1', {
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
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const frontendUrl = configService.get('FRONTEND_URL') as string;
      const allowedOrigins = new Set<string>([
        frontendUrl,
        ...splitCsv(configService.get('CORS_ALLOWED_ORIGINS')),
      ]);

      if (allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`), false);
    },
  });

  app.use(helmet());

  const redisClient = createClient({
    password: configService.get('REDIS_PASSWORD'),
    url: `redis://${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}`,
  });

  await redisClient.connect().catch(console.error);

  const isProd = configService.get('NODE_ENV') === 'production';
  const frontendUrl = configService.get('FRONTEND_URL') as string;
  const sessionCookieDomain =
    configService.get('SESSION_COOKIE_DOMAIN') ??
    (isProd ? deriveCookieDomainFromUrl(frontendUrl) : undefined);

  app.use(
    session({
      cookie: {
        domain: sessionCookieDomain,
        httpOnly: true,
        maxAge: configService.get('SESSION_EXPIRATION_TIME'),
        sameSite: isProd ? 'lax' : undefined,
        secure: isProd,
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
