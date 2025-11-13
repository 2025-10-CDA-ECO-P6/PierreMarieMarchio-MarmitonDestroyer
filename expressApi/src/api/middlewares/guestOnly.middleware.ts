import { Request, Response, NextFunction } from 'express';
import { container } from '../app';
import { JWTService } from '../../core/domain/features/auth/interfaces';

export const guestOnlyMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return next();
    }

    try {
      const jwtService = container.inject<JWTService>('JWTService');
      jwtService.verify(token);

      return res.status(403).json({ error: 'Already authenticated' });
    } catch {
      next();
    }
  };
};
