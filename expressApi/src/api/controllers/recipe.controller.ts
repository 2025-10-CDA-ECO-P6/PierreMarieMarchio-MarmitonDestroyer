import { AddRecipeIngredientUseCase } from '../../core/application/recipes/usecase/recipe/AddRecipeIngredient.usecase';
import { CreateRecipeUseCase } from '../../core/application/recipes/usecase/recipe/Create.usecase';
import { DeleteRecipeUseCase } from '../../core/application/recipes/usecase/recipe/Delete.usecase';
import { GetAllRecipesUseCase } from '../../core/application/recipes/usecase/recipe/GetAll.usecase';
import { GetRecipeByIdUseCase } from '../../core/application/recipes/usecase/recipe/GetById.usecase';
import { RemoveRecipeIngredientUseCase } from '../../core/application/recipes/usecase/recipe/RemoveRecipeIngredient.usecase';
import { UpdateRecipeUseCase } from '../../core/application/recipes/usecase/recipe/Update.usecase';
import { QueryContext } from '../../core/domain/common/interfaces';
import { container } from '../app';
import { asyncHandler } from '../common/utils/asyncHandler';
import { queryParser } from '../common/utils/queryParser';

export const getAllRecipesController = asyncHandler(async (req, res) => {
  const useCase = req.container.inject<GetAllRecipesUseCase>(
    'GetAllRecipesUseCase',
  );
  const ctx = req.container.inject<QueryContext>('QueryContext');

  ctx.apply(queryParser(req.query));

  const response = await useCase.execute(ctx);
  res.json(response);
});

export const getRecipeByIdController = asyncHandler(async (req, res) => {
  const useCase = req.container.inject<GetRecipeByIdUseCase>(
    'GetRecipeByIdUseCase',
  );
  const ctx = req.container.inject<QueryContext>('QueryContext');

  ctx.apply(queryParser(req.query));

  const response = await useCase.execute({
    id: req.params.id,
    ctx,
  });

  res.json(response);
});

export const createRecipeController = asyncHandler(async (req, res) => {
  const useCase = container.inject<CreateRecipeUseCase>('CreateRecipeUseCase');
  const response = await useCase.execute(req.body);
  res.status(201).json(response);
});

export const updateRecipeController = asyncHandler(async (req, res) => {
  const useCase = container.inject<UpdateRecipeUseCase>('UpdateRecipeUseCase');
  const response = await useCase.execute({
    id: req.params.id,
    input: req.body,
  });
  res.json(response);
});

export const deleteRecipeController = asyncHandler(async (req, res) => {
  const useCase = container.inject<DeleteRecipeUseCase>('DeleteRecipeUseCase');
  const response = await useCase.execute(req.params.id);
  res.json(response);
});

export const addIngredientToRecipeController = asyncHandler(
  async (req, res) => {
    const useCase = req.container.inject<AddRecipeIngredientUseCase>(
      'AddRecipeIngredientUseCase',
    );

    const response = await useCase.execute({
      recipeId: req.params.recipeId,
      ingredientId: req.params.ingredientId,
    });

    res.status(201).json(response);
  },
);

export const removeIngredientFromRecipeController = asyncHandler(
  async (req, res) => {
    const useCase = req.container.inject<RemoveRecipeIngredientUseCase>(
      'RemoveRecipeIngredientUseCase',
    );

    const response = await useCase.execute({
      recipeId: req.params.recipeId,
      ingredientId: req.params.ingredientId,
    });

    res.json(response);
  },
);
