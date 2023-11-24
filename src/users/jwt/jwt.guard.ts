import {
  ExecutionContext,
  Injectable,
  // UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  // 프론트엔드로 부터 받아온 JWT가 유효한지 검사함
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      // throw err || new UnauthorizedException('인증 문제가 있습니다.')
      // 에러나 user가 없음에 대한 처리는 OnlyPrivateInterceptor에서 진행됨
    }
    return user;
  }
}

// @nestjs/passport의 설정에 따라
// guard가 실행될때 strategy도 같이 실행됨
