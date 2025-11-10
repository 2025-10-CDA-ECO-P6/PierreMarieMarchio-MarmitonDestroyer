import { Request, Response } from 'express';
import {
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from '../../core/application/common/usecase';
import { container } from '../app';

export const getAllUsersController = async (_req: Request, res: Response) => {
  const useCase = container.inject<GetAllUsersUseCase>('GetAllUsersUseCase');
  const response = await useCase.execute();
  res.json(response);
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const useCase = container.inject<GetUserByIdUseCase>('GetUserByIdUseCase');
  const response = await useCase.execute(id);
  if (!response.data)
    return res.status(404).json({ message: 'User not found' });
  res.json(response);
};

export const createUserController = async (req: Request, res: Response) => {
  const useCase = container.inject<CreateUserUseCase>('CreateUserUseCase');
  const response = await useCase.execute(req.body.data);
  res.status(201).json(response);
};

export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const useCase = container.inject<UpdateUserUseCase>('UpdateUserUseCase');
  const response = await useCase.execute({ id, input: req.body.data });
  if (!response.data)
    return res.status(404).json({ message: 'User not found' });
  res.json(response);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const useCase = container.inject<DeleteUserUseCase>('DeleteUserUseCase');
  const response = await useCase.execute(id);
  if (!response.success)
    return res.status(404).json({ message: 'User not found' });
  res.json(response);
};
