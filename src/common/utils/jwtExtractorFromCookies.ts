import { Request } from 'express';
import { JwtFromRequestFunction } from 'passport-jwt';

export const jwtExtractorFromCookies: JwtFromRequestFunction = (
  request: Request,
): string | null => {
  try {
    const jwt = request.cookies['jwt'];
    // 요청이 왔을때 쿠키 안 jwt를 받아온다.
    return jwt;
  } catch (error) {
    // 쿠키에 jwt가 없다면 null을 반환한다.
    return null;
  }
};
