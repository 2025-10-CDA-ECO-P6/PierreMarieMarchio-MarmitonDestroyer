import { DIContainer } from "../../../shared/dependency-injection/DIContainer";
import { LoginUseCase, RegisterUseCase } from "./usecase";

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
