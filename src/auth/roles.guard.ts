import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enum/roles.enum';
import { ROLES_KEY } from 'src/users/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.roles) {
      throw new ForbiddenException('Usuário não autenticado ou sem papéis');
    }

    const hasRole = user.roles.some((role: Role) =>
      requiredRoles.includes(role),
    );

    if (!hasRole) {
      throw new ForbiddenException('Acesso negado por falta de permissão');
    }

    return true;
  }
}
