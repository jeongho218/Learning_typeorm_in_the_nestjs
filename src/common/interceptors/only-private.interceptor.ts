import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class OnlyPrivateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    // JwtAuthGuard에서 리턴받은 user
    const user = request.user;

    // user가 유효하다면(로그인한 사용자라면)
    if (user) return next.handle().pipe(map((data) => data));
    // user가 유효하지 않다면(로그인 상태가 아니라면)
    else throw new UnauthorizedException('인증에 문제가 있습니다.');
  }
}
