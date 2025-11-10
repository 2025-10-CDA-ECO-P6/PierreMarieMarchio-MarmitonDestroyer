import { Request, Response } from 'express';
import {
  LoginUseCase,
  RegisterUseCase,
} from '../../core/application/features/auth/usecase';
import { container } from '../app';

export const loginController = async (req: Request, res: Response) => {
  const useCase = container.inject<LoginUseCase>('LoginUseCase');
  const response = await useCase.execute(req.body.data);
  res.json(response);
};

export const registerController = async (req: Request, res: Response) => {
  const useCase = container.inject<RegisterUseCase>('RegisterUseCase');
  const response = await useCase.execute(req.body.data);
  res.json(response);
};
