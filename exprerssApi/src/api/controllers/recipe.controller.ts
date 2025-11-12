import { container } from '../app';
import {
  GetAllRecipesUseCase,
  GetRecipeByIdUseCase,
  CreateRecipeUseCase,
  UpdateRecipeUseCase,
  DeleteRecipeUseCase,
} from '../../core/application/features/recipes/usecase';
import { asyncHandler } from '../extensions/AsyncHandler.extension';

export const getAllRecipesController = asyncHandler(async (_req, res) => {
  const useCase = container.inject<GetAllRecipesUseCase>(
    'GetAllRecipesUseCase',
  );
  const response = await useCase.execute();
  res.json(response);
});

export const getRecipeByIdController = asyncHandler(async (req, res) => {
  const useCase = container.inject<GetRecipeByIdUseCase>(
    'GetRecipeByIdUseCase',
  );
  const response = await useCase.execute(req.params.id);
  res.json(response);
});

export const createRecipeController = asyncHandler(async (req, res) => {
  const useCase = container.inject<CreateRecipeUseCase>('CreateRecipeUseCase');
  const response = await useCase.execute(req.body.data);
  res.status(201).json(response);
});

export const updateRecipeController = asyncHandler(async (req, res) => {
  const useCase = container.inject<UpdateRecipeUseCase>('UpdateRecipeUseCase');
  const response = await useCase.execute({
    id: req.params.id,
    input: req.body.data,
  });
  res.json(response);
});

export const deleteRecipeController = asyncHandler(async (req, res) => {
  const useCase = container.inject<DeleteRecipeUseCase>('DeleteRecipeUseCase');
  const response = await useCase.execute(req.params.id);
  res.json(response);
});
