import { z } from 'zod';

export const EnvSchema = z.object({
  DB_HOST: z.string(),
  DB_NAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.string(),
  DB_USER: z.string(),
  FRONTEND_URL: z.string().url(),
  HOST: z.string(),
  JWT_EXPIRES_IN: z.string(),
  JWT_SECRET: z.string(),
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
  SESSION_EXPIRATION_TIME: z.string().transform(data => +data),
});

export type Env = z.infer<typeof EnvSchema>;

export const validateEnv = (config: Record<string, unknown>): Env => {
  const validate = EnvSchema.safeParse(config);
  if (!validate.success) {
    throw new Error(validate.error.message);
  }
  return validate.data;
};
