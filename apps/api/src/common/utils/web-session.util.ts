import type { ConfigService } from '@nestjs/config';
import type { CookieOptions } from 'express';
import type { Env } from './env.utils';

export const splitCsv = (value?: string): string[] =>
  (value ?? '')
    .split(',')
    .map(v => v.trim())
    .filter(Boolean);

const deriveCookieDomainFromUrl = (urlString: string): string | undefined => {
  try {
    const hostname = new URL(urlString).hostname;
    if (hostname === 'localhost' || hostname.endsWith('.localhost')) return undefined;

    const parts = hostname.split('.').filter(Boolean);
    if (parts.length < 2) return undefined;

    return `.${parts.slice(-2).join('.')}`;
  } catch {
    return undefined;
  }
};

export const getAllowedCorsOrigins = (configService: ConfigService<Env>): Set<string> =>
  new Set([configService.get('FRONTEND_URL') as string, ...splitCsv(configService.get('CORS_ALLOWED_ORIGINS'))]);

export const getSessionCookieOptions = (configService: ConfigService<Env>): CookieOptions => {
  const isProd = configService.get('NODE_ENV') === 'production';
  const frontendUrl = configService.get('FRONTEND_URL') as string;
  const domain =
    configService.get('SESSION_COOKIE_DOMAIN') ??
    (isProd ? deriveCookieDomainFromUrl(frontendUrl) : undefined);

  return {
    domain,
    httpOnly: true,
    path: '/',
    sameSite: isProd ? 'lax' : undefined,
    secure: isProd,
  };
};

