import { Request, Response, NextFunction } from 'express';
import { container } from '../../app';
import { UserContextImpl } from '../contexts/UserContext';
import { JWTService } from '../../../core/domain/auth/interfaces';
import { AuthenticationError } from '../../../core/application/common/exceptions';

export const authentication = () => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      throw new AuthenticationError('Missing authorization header');

    const token = authHeader.split(' ')[1];
    if (!token)
      throw new AuthenticationError('Invalid authorization header format');

    try {
      const jwtService = container.inject<JWTService>('JWTService');
      const payload = jwtService.verify<{
        userId: string;
        email: string;
        name: string;
      }>(token);

      container.register(
        'UserContext',
        () => new UserContextImpl(payload.userId, payload.email, payload.name),
      );

      next();
    } catch {
      throw new AuthenticationError('Invalid token');
    }
  };
};

