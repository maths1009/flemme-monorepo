import { z } from 'zod';

export const EnvSchema = z.object({
  DB_HOST: z.string(),
  DB_NAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.string(),
  DB_USER: z.string(),
  FRONTEND_URL: z.string().url(),
  MAIL_FROM: z.string(),
  MAIL_HOST: z.string(),
  MAIL_IGNORE_TLS: z.string().transform(data => data === 'true'),
  MAIL_PASS: z.string(),
  MAIL_PORT: z.string().transform(data => +data),
  MAIL_SECURE: z.string().transform(data => data === 'true'),
  MAIL_USER: z.string(),
  MINIO_ACCESS_KEY: z.string(),
  MINIO_CONSOLE_PORT: z.string(),
  MINIO_ENDPOINT: z.string(),
  MINIO_PORT: z.string(),
  MINIO_ROOT_PASSWORD: z.string(),
  MINIO_ROOT_USER: z.string(),
  MINIO_SECRET_KEY: z.string(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().transform(data => +data),
  REDIS_HOST: z.string(),
  REDIS_PASSWORD: z.string(),
  REDIS_PORT: z.string().transform(data => +data),
  SESSION_EXPIRATION_TIME: z.string().transform(data => +data),
  SESSION_SECRET: z.string(),
  TRACKING_ACCEPTANCE_DEADLINE_HOURS: z.string().transform(data => +data),
  TRACKING_COMPLETION_DEADLINE_HOURS: z.string().transform(data => +data),
  TRACKING_CONFIRMATION_DEADLINE_HOURS: z.string().transform(data => +data),
});

export type Env = z.infer<typeof EnvSchema>;

export const validateEnv = (config: Record<string, unknown>): Env => {
  const validate = EnvSchema.safeParse(config);
  if (!validate.success) {
    throw new Error(validate.error.message);
  }
  return validate.data;
};
