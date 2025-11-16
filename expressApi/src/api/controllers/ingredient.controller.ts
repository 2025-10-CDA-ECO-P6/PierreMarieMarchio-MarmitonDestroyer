import { AddIngredientRecipeUseCase } from '../../core/application/recipes/usecase/ingredient/AddIngredientRecipe.usecase';
import { CreateIngredientUseCase } from '../../core/application/recipes/usecase/ingredient/Create.usecase';
import { DeleteIngredientUseCase } from '../../core/application/recipes/usecase/ingredient/Delete.usecase';
import { GetAllIngredientsUseCase } from '../../core/application/recipes/usecase/ingredient/GetAll.usecase';
import { GetIngredientByIdUseCase } from '../../core/application/recipes/usecase/ingredient/GetById.usecase';
import { RemoveIngredientRecipeUseCase } from '../../core/application/recipes/usecase/ingredient/RemoveIngredientRecipe.usecase';
import { UpdateIngredientUseCase } from '../../core/application/recipes/usecase/ingredient/Update.usecase';
import { QueryContext } from '../../core/domain/common/interfaces';
import { asyncHandler } from '../common/utils/asyncHandler';
import { queryParser } from '../common/utils/queryParser';

export const getAllIngredientsController = asyncHandler(async (req, res) => {
  const useCase = req.container.inject<GetAllIngredientsUseCase>(
    'GetAllIngredientsUseCase',
  );
  const ctx = req.container.inject<QueryContext>('QueryContext');
  ctx.apply(queryParser(req.query));

  const response = await useCase.execute(ctx);
  res.json(response);
});

export const getIngredientByIdController = asyncHandler(async (req, res) => {
  const useCase = req.container.inject<GetIngredientByIdUseCase>(
    'GetIngredientByIdUseCase',
  );
  const ctx = req.container.inject<QueryContext>('QueryContext');
  ctx.apply(queryParser(req.query));

  const response = await useCase.execute({
    id: req.params.id,
    ctx,
  });
  res.json(response);
});

export const createIngredientController = asyncHandler(async (req, res) => {
  const useCase = req.container.inject<CreateIngredientUseCase>(
    'CreateIngredientUseCase',
  );
  const response = await useCase.execute(req.body);
  res.status(201).json(response);
});

export const updateIngredientController = asyncHandler(async (req, res) => {
  const useCase = req.container.inject<UpdateIngredientUseCase>(
    'UpdateIngredientUseCase',
  );
  const response = await useCase.execute({
    id: req.params.id,
    data: req.body,
  });
  res.json(response);
});

export const deleteIngredientController = asyncHandler(async (req, res) => {
  const useCase = req.container.inject<DeleteIngredientUseCase>(
    'DeleteIngredientUseCase',
  );
  const response = await useCase.execute(req.params.id);
  res.json(response);
});

export const addIngredientToRecipeController = asyncHandler(
  async (req, res) => {
    const useCase = req.container.inject<AddIngredientRecipeUseCase>(
      'AddIngredientRecipeUseCase',
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
    const useCase = req.container.inject<RemoveIngredientRecipeUseCase>(
      'RemoveRecipeIngredientUseCase',
    );
    const response = await useCase.execute({
      recipeId: req.params.recipeId,
      ingredientId: req.params.ingredientId,
    });
    res.json(response);
  },
);
