import { DIContainer } from '../../../shared/dependency-injection/DIContainer';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
} from './usecase';

export function registerCommonApplicationServices(container: DIContainer) {
  container.scoped(
    'CreateUserUseCase',
    (c) => new CreateUserUseCase(c.inject('UserRepository')),
  );
  container.scoped(
    'DeleteUserUseCase',
    (c) => new DeleteUserUseCase(c.inject('UserRepository')),
  );
  container.scoped(
    'GetAllUsersUseCase',
    (c) => new GetAllUsersUseCase(c.inject('UserRepository')),
  );
  container.scoped(
    'GetUserByIdUseCase',
    (c) => new GetUserByIdUseCase(c.inject('UserRepository')),
  );
  container.scoped(
    'UpdateUserUseCase',
    (c) => new UpdateUserUseCase(c.inject('UserRepository')),
  );
}
