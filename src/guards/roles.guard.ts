import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

const matchRoles = (roles, userRoles) => {
  if (roles.length == 0) return true;
  // TO CHECK: userRoles must intersect with roles at least 1
  return roles.filter((x) => userRoles.includes(x)).length;
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return matchRoles(roles, user.roles);
  }
}
