import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RoleEnum } from '../../features/roles/enum/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { GlobalErrorMessages } from '../errors/global-error-messages.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (user?.role && requiredRoles.includes(user.role.name)) return true;

    throw new ForbiddenException(GlobalErrorMessages.FORBIDDEN);
  }
}
