import { DIContainer } from "../../../shared/dependency-injection/DIContainer";
import { LoginUseCase, RegisterUseCase } from "./usecase";

export function registerAuthApplicationServices(container: DIContainer) {
  container.scoped(
    'LoginUseCase',
    (c) => new LoginUseCase(c.inject('AuthService')),
  );
  container.scoped(
    'RegisterUseCase',
    (c) => new RegisterUseCase(c.inject('AuthService')),
  );
}
