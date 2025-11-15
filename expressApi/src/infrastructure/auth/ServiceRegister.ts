import { DIContainer } from '../../shared/dependency-injection/DIContainer';
import { AuthDbContext } from './persistence/contexts/AuthDbContext';
import { AuthSQLiteRepository } from './repositories/AuthSQLiteRepository';
import { AuthServiceImpl } from './service/AuthImpl.service';
import { JWTServiceImpl } from './service/JWTImpl.service';

export function registerAuthInfrastructureService(container: DIContainer) {
  container.singleton(
    'AuthDbContext',
    (c) => new AuthDbContext(c.inject('AppDbContext')),
  );
  container.scoped(
    'AuthRepository',
    (c) => new AuthSQLiteRepository(c.inject('AuthDbContext')),
  );
  container.scoped('JWTService', () => new JWTServiceImpl());
  container.scoped(
    'AuthService',
    (c) =>
      new AuthServiceImpl(c.inject('AuthRepository'), c.inject('JWTService')),
  );
}
