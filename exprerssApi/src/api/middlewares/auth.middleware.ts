import { Request, Response, NextFunction } from 'express';
import { UserContext } from '../../core/domain/common/interfaces';
import { JWTService } from '../../core/domain/features/auth/interfaces';
import { ExpressUserContext } from '../../infrastructure/common/persistence/contexts/ExpressUserContext';
import { container } from '../app';

export const authMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Missing authorization header' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res
        .status(401)
        .json({ error: 'Invalid authorization header format' });
    }

    try {
      const jwtService = container.inject<JWTService>('JWTService');

      const payload = jwtService.verify<{
        userId: string;
        email: string;
        name: string;
      }>(token);

      const userContext: UserContext = new ExpressUserContext(
        payload.userId,
        payload.email,
        payload.name,
      );

      container.register('UserContext', () => userContext);

      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token: ' + err });
    }
  };
};
