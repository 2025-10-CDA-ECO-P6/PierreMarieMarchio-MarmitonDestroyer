import {
  LoginUseCase,
  RegisterUseCase,
} from '../../core/application/features/auth/usecase';
import { container } from '../app';
import { asyncHandler } from '../extensions/AsyncHandler.extension';

export const loginController = asyncHandler(async (req, res) => {
  const useCase = container.inject<LoginUseCase>('LoginUseCase');
  const response = await useCase.execute(req.body.data);
  res.json(response);
});

export const registerController = asyncHandler(async (req, res) => {
  const useCase = container.inject<RegisterUseCase>('RegisterUseCase');
  const response = await useCase.execute(req.body.data);
  res.status(201).json(response);
});
