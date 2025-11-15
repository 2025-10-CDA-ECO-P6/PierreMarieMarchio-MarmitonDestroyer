import { DIContainer } from '../shared/dependency-injection/DIContainer';

declare global {
  namespace Express {
    interface Request {
      container: DIContainer;
    }
  }
}
