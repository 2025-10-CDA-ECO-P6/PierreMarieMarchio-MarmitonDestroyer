import { DIContainer } from '../../../../shared/dependency-injection/DIContainer';
import { LoginUseCase } from './usecase/Login.usecase';
import { RegisterUseCase } from './usecase/Register.usecase';

export function registerAuthApplicationServices(container: DIContainer) {
  container.register(
    'LoginUseCase',
    (c) => new LoginUseCase(c.inject('AuthService')),
  );
  container.register(
    'RegisterUseCase',
    (c) => new RegisterUseCase(c.inject('AuthService')),
  );
}
