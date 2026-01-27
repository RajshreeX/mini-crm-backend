import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

export class RolesGuard implements CanActivate {
  constructor(private allowedRole: string) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.role !== this.allowedRole) {
      throw new ForbiddenException('Access denied');
    }
    return true;
  }
}
