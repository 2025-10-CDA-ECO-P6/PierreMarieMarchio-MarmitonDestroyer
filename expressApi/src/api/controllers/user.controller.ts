import {
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from '../../core/application/common/usecase';
import { QueryContext } from '../../core/domain/common/interfaces';
import { asyncHandler } from '../common/utils/asyncHandler';
import { queryParser } from '../common/utils/queryParser';

export const getAllUsersController = asyncHandler(async (req, res) => {
  const useCase =
    req.container.inject<GetAllUsersUseCase>('GetAllUsersUseCase');
  const ctx = req.container.inject<QueryContext>('QueryContext');

  ctx.apply(queryParser(req.query));

  const response = await useCase.execute(ctx);
  res.json(response);
});

export const getUserByIdController = asyncHandler(async (req, res) => {
  const useCase =
    req.container.inject<GetUserByIdUseCase>('GetUserByIdUseCase');
  const ctx = req.container.inject<QueryContext>('QueryContext');

  ctx.apply(queryParser(req.query));

  const response = await useCase.execute(req.params.id);
  res.json(response);
});

export const createUserController = asyncHandler(async (req, res) => {
  const useCase = req.container.inject<CreateUserUseCase>('CreateUserUseCase');
  const response = await useCase.execute(req.body);
  res.status(201).json(response);
});

export const updateUserController = asyncHandler(async (req, res) => {
  const useCase = req.container.inject<UpdateUserUseCase>('UpdateUserUseCase');
  const response = await useCase.execute({
    id: req.params.id,
    input: req.body,
  });
  res.json(response);
});

export const deleteUserController = asyncHandler(async (req, res) => {
  const useCase = req.container.inject<DeleteUserUseCase>('DeleteUserUseCase');
  const response = await useCase.execute(req.params.id);
  res.json(response);
});
