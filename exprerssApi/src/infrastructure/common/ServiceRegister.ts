import { DIContainer } from '../../shared/dependency-injection/DIContainer';
import { AppDbContext } from './persistence/contexts/AppDbContext';
import { UserSQLiteRepository } from './repositories';

export function registerComonInfrastructureService(container: DIContainer) {
  container.singleton('AppDbContext', () => new AppDbContext());
  container.register(
    'UserRepository',
    (c) => new UserSQLiteRepository(c.inject('AppDbContext')),
  );
}
