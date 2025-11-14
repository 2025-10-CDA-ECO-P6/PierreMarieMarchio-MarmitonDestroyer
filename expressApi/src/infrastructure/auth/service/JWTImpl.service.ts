import jwt, { Secret } from 'jsonwebtoken';
import config from '../../../.config/config';
import { JWTService } from '../../../core/domain/auth/interfaces';

export class JWTServiceImpl implements JWTService {
  private readonly secret: Secret;

  constructor(secret?: string) {
    this.secret = secret || config.jwt_secret;
  }

  sign(payload: object, expiresIn: string | number = '1h'): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: expiresIn as jwt.SignOptions['expiresIn'],
    });
  }

  verify<T = any>(token: string): T {
    return jwt.verify(token, this.secret) as T;
  }
}
