import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../users/dto/update-user.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!roles) return true; // no roles required

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !roles.includes(user.role)) {
      throw new ForbiddenException('Forbidden resource');
    }
    return true;
  }
}
