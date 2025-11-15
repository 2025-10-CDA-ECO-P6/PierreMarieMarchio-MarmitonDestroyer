import { DIContainer } from '../../shared/dependency-injection/DIContainer';
import { QueryContextImpl } from './contexts/QueryContext';
import { UserContextImpl } from './contexts/UserContext';

export function registerCommonApiServices(container: DIContainer) {
  container.scoped('UserContext', () => new UserContextImpl());

  container.scoped('QueryContext', () => new QueryContextImpl());
}
