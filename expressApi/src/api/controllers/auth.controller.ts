import { LoginUseCase, RegisterUseCase } from "../../core/application/auth/usecase";
import { container } from "../app";
import { asyncHandler } from "../extensions/AsyncHandler.extension";


export const loginController = asyncHandler(async (req, res) => {
  const useCase = container.inject<LoginUseCase>('LoginUseCase');
  const response = await useCase.execute(req.body);
  res.json(response);
});

export const registerController = asyncHandler(async (req, res) => {
  const useCase = container.inject<RegisterUseCase>('RegisterUseCase');
  const response = await useCase.execute(req.body);
  res.status(201).json(response);
});
