import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';

// admin인지 확인하는 인터셉터, user테이블의 isAdmin을 확인함
@Injectable()
export class OnlyAdminInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user && user.isAdmin) return next.handle().pipe(map((data) => data));
    else throw new UnauthorizedException('인증에 문제가 있습니다.');
  }
}
