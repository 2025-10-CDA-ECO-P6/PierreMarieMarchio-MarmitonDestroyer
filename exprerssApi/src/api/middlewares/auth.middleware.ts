import { Request, Response, NextFunction } from 'express';
import { JWTService } from '../../core/domain/features/auth/interfaces';
import { container } from '../app';
import { ExpressUserContext } from '../contexts/ExpressUserContext';

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

      container.register('UserContext', () => new ExpressUserContext(
        payload.userId,
        payload.email,
        payload.name,
      ));

      next();
    } catch {
      return res.status(401).json({ error: 'Invalid token'});
    }
  };
};
