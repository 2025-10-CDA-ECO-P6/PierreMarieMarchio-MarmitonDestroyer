import { Request, Response, NextFunction } from 'express';
import { JWTService } from '../../../core/domain/auth/interfaces';
import { AuthenticationError } from '../../../core/application/common/exceptions';
import { UserContext } from '../../../core/domain/common/interfaces';

export const authentication = () => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      throw new AuthenticationError('Missing authorization header');

    const token = authHeader.split(' ')[1];
    if (!token)
      throw new AuthenticationError('Invalid authorization header format');

    try {
      const jwtService = req.container.inject<JWTService>('JWTService');
      const payload = jwtService.verify<{
        userId: string;
        email: string;
        name: string;
      }>(token);

      const userContext = req.container.inject<UserContext>('UserContext');

      userContext.setUserId(payload.userId);
      userContext.setEmail(payload.email);
      userContext.setName(payload.name);

      next();
    } catch {
      throw new AuthenticationError('Invalid token');
    }
  };
};
