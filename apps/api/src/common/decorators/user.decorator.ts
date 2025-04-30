import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Décorateur pour extraire les informations utilisateur incluant l'ID et la session
 * depuis le token JWT décodé par la stratégie JWT
 *
 * @example
 * @User() user: { userId: number; sessionId: number }
 *
 * @example
 * @User('userId') userId: number
 */
export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (data) {
      return user && user[data];
    }

    return user;
  },
);
