import * as requestIp from 'request-ip';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// 현재 사용자의 IP를 추출하는 데코레이터
export const ClientIp = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    if (request.headers['cf-connecting-ip'])
      //* cloudflare origin ip */
      return request.headers['cf-connecting-ip'];
    else return requestIp.getClientIp(request);
  },
);

// 컨트롤러에서 @ClientIp() ip : string... 과 같이 사용하면 됨
// 방문객 집계, 조회수 등에 쓸 수 있음
