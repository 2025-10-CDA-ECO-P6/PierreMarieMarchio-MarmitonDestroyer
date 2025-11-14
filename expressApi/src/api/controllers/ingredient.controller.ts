import { GetIngredientByIdUseCase } from '../../core/application/recipes/usecase';
import { AddIngredientToRecipeUseCase } from '../../core/application/recipes/usecase/ingredient/AddIngredientToRecipe.usecase';
import { CreateIngredientUseCase } from '../../core/application/recipes/usecase/ingredient/Create.usecase';
import { DeleteIngredientUseCase } from '../../core/application/recipes/usecase/ingredient/DeleteIngredient.usecase';
import { GetAllIngredientsUseCase } from '../../core/application/recipes/usecase/ingredient/GetAll.usecase';
import { GetIngredientsByRecipeUseCase } from '../../core/application/recipes/usecase/ingredient/GetIngredientsByRecipe.usecase';
import { RemoveIngredientFromRecipeUseCase } from '../../core/application/recipes/usecase/ingredient/RemoveIngredientFromRecipe.usecase';
import { UpdateIngredientUseCase } from '../../core/application/recipes/usecase/ingredient/UpdateIngredient.usecase';
import { container } from '../app';
import { asyncHandler } from '../extensions/AsyncHandler.extension';

export const createIngredientController = asyncHandler(async (req, res) => {
  const useCase = container.inject<CreateIngredientUseCase>(
    'CreateIngredientUseCase',
  );
  const response = await useCase.execute(req.body.data);
  res.status(201).json(response);
});

export const getIngredientByIdController = asyncHandler(async (req, res) => {
  const useCase = container.inject<GetIngredientByIdUseCase>(
    'GetIngredientByIdUseCase',
  );
  const response = await useCase.execute(req.params.id);
  res.json(response);
});

export const getAllIngredientsController = asyncHandler(async (_req, res) => {
  const useCase = container.inject<GetAllIngredientsUseCase>(
    'GetAllIngredientsUseCase',
  );
  const response = await useCase.execute();
  res.json(response);
});

export const updateIngredientController = asyncHandler(async (req, res) => {
  const useCase = container.inject<UpdateIngredientUseCase>(
    'UpdateIngredientUseCase',
  );
  const response = await useCase.execute({
    id: req.params.id,
    data: req.body.data,
  });
  res.json(response);
});

export const deleteIngredientController = asyncHandler(async (req, res) => {
  const useCase = container.inject<DeleteIngredientUseCase>(
    'DeleteIngredientUseCase',
  );
  const response = await useCase.execute(req.params.id);
  res.json(response);
});

export const addIngredientToRecipeController = asyncHandler(
  async (req, res) => {
    const useCase = container.inject<AddIngredientToRecipeUseCase>(
      'AddIngredientToRecipeUseCase',
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
    const useCase = container.inject<RemoveIngredientFromRecipeUseCase>(
      'RemoveIngredientFromRecipeUseCase',
    );
    const response = await useCase.execute({
      recipeId: req.params.recipeId,
      ingredientId: req.params.ingredientId,
    });
    res.json(response);
  },
);

export const getIngredientsByRecipeController = asyncHandler(
  async (req, res) => {
    const useCase = container.inject<GetIngredientsByRecipeUseCase>(
      'GetIngredientsByRecipeUseCase',
    );
    const response = await useCase.execute(req.params.recipeId);
    res.json(response);
  },
);
