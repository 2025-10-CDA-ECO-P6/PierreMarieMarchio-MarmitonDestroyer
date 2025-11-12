import { DIContainer } from '../../../../shared/dependency-injection/DIContainer';
import {
  CreateRecipeUseCase,
  DeleteRecipeUseCase,
  GetAllRecipesUseCase,
  GetRecipeByIdUseCase,
  UpdateRecipeUseCase,
} from './usecase';
import { AddIngredientToRecipeUseCase } from './usecase/ingredient/AddIngredientToRecipe.usecase';
import { CreateIngredientUseCase } from './usecase/ingredient/Create.usecase';
import { DeleteIngredientUseCase } from './usecase/ingredient/DeleteIngredient.usecase';
import { GetAllIngredientsUseCase } from './usecase/ingredient/GetAll.usecase';
import { GetIngredientsByRecipeUseCase } from './usecase/ingredient/GetIngredientsByRecipe.usecase';
import { RemoveIngredientFromRecipeUseCase } from './usecase/ingredient/RemoveIngredientFromRecipe.usecase';
import { UpdateIngredientUseCase } from './usecase/ingredient/UpdateIngredient.usecase';

export function registerRecipeApplicationServices(container: DIContainer) {
  // Recipe usecase
  container.register(
    'CreateRecipeUseCase',
    (c) => new CreateRecipeUseCase(c.inject('RecipeRepository')),
  );

  container.register(
    'DeleteRecipeUseCase',
    (c) => new DeleteRecipeUseCase(c.inject('RecipeRepository')),
  );

  container.register(
    'GetAllRecipesUseCase',
    (c) => new GetAllRecipesUseCase(c.inject('RecipeRepository')),
  );

  container.register(
    'GetRecipeByIdUseCase',
    (c) => new GetRecipeByIdUseCase(c.inject('RecipeRepository')),
  );

  container.register(
    'UpdateRecipeUseCase',
    (c) => new UpdateRecipeUseCase(c.inject('RecipeRepository')),
  );

  // Ingredient usecase
  container.register(
    'CreateIngredientUseCase',
    (c) => new CreateIngredientUseCase(c.inject('IngredientRepository')),
  );
  container.register(
    'GetAllIngredientsUseCase',
    (c) => new GetAllIngredientsUseCase(c.inject('IngredientRepository')),
  );
  container.register(
    'GetIngredientsByRecipeUseCase',
    (c) => new GetIngredientsByRecipeUseCase(c.inject('IngredientRepository')),
  );
  container.register(
    'UpdateIngredientUseCase',
    (c) => new UpdateIngredientUseCase(c.inject('IngredientRepository')),
  );
  container.register(
    'DeleteIngredientUseCase',
    (c) => new DeleteIngredientUseCase(c.inject('IngredientRepository')),
  );

  container.register(
    'AddIngredientToRecipeUseCase',
    (c) =>
      new AddIngredientToRecipeUseCase(c.inject('RecipeIngredientRepository')),
  );
  container.register(
    'RemoveIngredientFromRecipeUseCase',
    (c) =>
      new RemoveIngredientFromRecipeUseCase(
        c.inject('RecipeIngredientRepository'),
      ),
  );
  container.register(
    'GetIngredientsByRecipeUseCase',
    (c) =>
      new GetIngredientsByRecipeUseCase(c.inject('RecipeIngredientRepository')),
  );
}
