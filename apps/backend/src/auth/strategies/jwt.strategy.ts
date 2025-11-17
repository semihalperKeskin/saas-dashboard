import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { Request } from 'express';

const cookieExtractor = (req: Request) => {
  let token = '';
  if (req && req.cookies) {
    token = req.cookies['refreshToken'] as string;
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: jwtConstants.refreshSecret as string,
    });
  }

  validate(payload: { sub: string; email: string }) {
    return { id: Number(payload.sub), email: payload.email };
  }
}
