import { Response, Request, NextFunction } from 'express';
import { DIContainer } from '../../../shared/dependency-injection/DIContainer.js';


export const buildContainer = (globalContainer: DIContainer) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    req.container = globalContainer.createChild();
    next();
  };
};