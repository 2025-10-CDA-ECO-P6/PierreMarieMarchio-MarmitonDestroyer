import {
  GetAllRecipesUseCase,
  GetRecipeByIdUseCase,
  CreateRecipeUseCase,
  UpdateRecipeUseCase,
  DeleteRecipeUseCase,
} from '../../core/application/recipes/usecase';
import { container } from '../app';

import { asyncHandler } from '../common/utils/asyncHandler';
import { queryParser } from '../common/utils/queryParser';

export const getAllRecipesController = asyncHandler(async (req, res) => {
  const useCase = container.inject<GetAllRecipesUseCase>(
    'GetAllRecipesUseCase',
  );

  const { pagination, filters, sort, populate } = queryParser(req.query);

  const response = await useCase.execute({
    pagination,
    filters,
    sort,
    populate,
  });

  res.json(response);
});

export const getRecipeByIdController = asyncHandler(async (req, res) => {
  const useCase = container.inject<GetRecipeByIdUseCase>(
    'GetRecipeByIdUseCase',
  );

  const populate = req.query.populate === '*' ? true : false;

  const response = await useCase.execute({
    id: req.params.id,
    populate,
  });

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
