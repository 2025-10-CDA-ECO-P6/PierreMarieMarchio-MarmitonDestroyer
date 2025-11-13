import { DIContainer } from '../../../shared/dependency-injection/DIContainer';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
} from './usecase';

export function registerCommonApplicationServices(container: DIContainer) {
  container.register(
    'CreateUserUseCase',
    (c) => new CreateUserUseCase(c.inject('UserRepository')),
  );
  container.register(
    'DeleteUserUseCase',
    (c) => new DeleteUserUseCase(c.inject('UserRepository')),
  );
  container.register(
    'GetAllUsersUseCase',
    (c) => new GetAllUsersUseCase(c.inject('UserRepository')),
  );
  container.register(
    'GetUserByIdUseCase',
    (c) => new GetUserByIdUseCase(c.inject('UserRepository')),
  );
  container.register(
    'UpdateUserUseCase',
    (c) => new UpdateUserUseCase(c.inject('UserRepository')),
  );
}
