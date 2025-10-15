import { z } from 'zod';

export const EnvSchema = z.object({
  ALLOW_CORS_URL: z.string().url(),
  DB_HOST: z.string(),
  DB_NAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.string(),
  DB_USER: z.string(),
  HOST: z.string(),
  JWT_EXPIRES_IN: z.string(),
  JWT_SECRET: z.string(),
  MINIO_ROOT_PASSWORD: z.string(),
  MINIO_ROOT_USER: z.string(),
  NODE_ENV: z.enum(['development', 'production', 'test', 'provision']),
  PORT: z
    .string()
    .default('8000')
    .transform(data => +data),
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
