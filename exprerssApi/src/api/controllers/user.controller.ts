import {
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from '../../core/application/common/usecase';
import { container } from '../app';
import { asyncHandler } from '../extensions/AsyncHandler.extension';

export const getAllUsersController = asyncHandler(async (_req, res) => {
  const useCase = container.inject<GetAllUsersUseCase>('GetAllUsersUseCase');
  const response = await useCase.execute();
  res.json(response);
});

export const getUserByIdController = asyncHandler(async (req, res) => {
  const useCase = container.inject<GetUserByIdUseCase>('GetUserByIdUseCase');
  const response = await useCase.execute(req.params.id);
  res.json(response);
});

export const createUserController = asyncHandler(async (req, res) => {
  const useCase = container.inject<CreateUserUseCase>('CreateUserUseCase');
  const response = await useCase.execute(req.body.data);
  res.status(201).json(response);
});

export const updateUserController = asyncHandler(async (req, res) => {
  const useCase = container.inject<UpdateUserUseCase>('UpdateUserUseCase');
  const response = await useCase.execute({
    id: req.params.id,
    input: req.body.data,
  });
  res.json(response);
});

export const deleteUserController = asyncHandler(async (req, res) => {
  const useCase = container.inject<DeleteUserUseCase>('DeleteUserUseCase');
  const response = await useCase.execute(req.params.id);
  res.json(response);
});