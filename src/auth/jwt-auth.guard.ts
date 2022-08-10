import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(JwtService) private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    let token = request.headers.authorization || null;

    if (!token) {
      Logger.warn('No token provided');
      throw new UnauthorizedException({ message: 'Unauthorized' });
    }

    token = token.split(' ')[1];
    const payload = this.jwtService.decode(token);
    if (!payload) {
      Logger.warn('Token not valid');
      throw new UnauthorizedException({ message: 'Unauthorized' });
    }
    return true;
  }
}
