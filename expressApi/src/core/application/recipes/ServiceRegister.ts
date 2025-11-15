import { DIContainer } from '../../../shared/dependency-injection/DIContainer';
import { AddIngredientRecipeUseCase } from './usecase/ingredient/AddIngredientRecipe.usecase';
import { CreateIngredientUseCase } from './usecase/ingredient/Create.usecase';
import { DeleteIngredientUseCase } from './usecase/ingredient/Delete.usecase';
import { GetAllIngredientsUseCase } from './usecase/ingredient/GetAll.usecase';
import { RemoveIngredientRecipeUseCase } from './usecase/ingredient/RemoveIngredientRecipe.usecase';
import { UpdateIngredientUseCase } from './usecase/ingredient/Update.usecase';
import { AddRecipeIngredientUseCase } from './usecase/recipe/AddRecipeIngredient.usecase';
import { CreateRecipeUseCase } from './usecase/recipe/Create.usecase';
import { DeleteRecipeUseCase } from './usecase/recipe/Delete.usecase';
import { GetAllRecipesUseCase } from './usecase/recipe/GetAll.usecase';
import { GetRecipeByIdUseCase } from './usecase/recipe/GetById.usecase';
import { RemoveRecipeIngredientUseCase } from './usecase/recipe/RemoveRecipeIngredient.usecase';
import { UpdateRecipeUseCase } from './usecase/recipe/Update.usecase';

export function registerRecipeApplicationServices(container: DIContainer) {
  // Recipe usecase
  container.scoped(
    'CreateRecipeUseCase',
    (c) => new CreateRecipeUseCase(c.inject('RecipeRepository')),
  );

  container.scoped(
    'DeleteRecipeUseCase',
    (c) => new DeleteRecipeUseCase(c.inject('RecipeRepository')),
  );

  container.scoped(
    'GetAllRecipesUseCase',
    (c) => new GetAllRecipesUseCase(c.inject('RecipeRepository')),
  );

  container.scoped(
    'GetRecipeByIdUseCase',
    (c) => new GetRecipeByIdUseCase(c.inject('RecipeRepository')),
  );

  container.scoped(
    'UpdateRecipeUseCase',
    (c) => new UpdateRecipeUseCase(c.inject('RecipeRepository')),
  );
  container.scoped(
    'AddRecipeIngredientUseCase',
    (c) =>
      new AddRecipeIngredientUseCase(c.inject('RecipeIngredientRepository')),
  );
  container.scoped(
    'RemoveRecipeIngredientUseCase',
    (c) =>
      new RemoveRecipeIngredientUseCase(c.inject('RecipeIngredientRepository')),
  );

  // Ingredient usecase
  container.scoped(
    'CreateIngredientUseCase',
    (c) => new CreateIngredientUseCase(c.inject('IngredientRepository')),
  );
  container.scoped(
    'GetAllIngredientsUseCase',
    (c) => new GetAllIngredientsUseCase(c.inject('IngredientRepository')),
  );
  container.scoped(
    'UpdateIngredientUseCase',
    (c) => new UpdateIngredientUseCase(c.inject('IngredientRepository')),
  );
  container.scoped(
    'DeleteIngredientUseCase',
    (c) => new DeleteIngredientUseCase(c.inject('IngredientRepository')),
  );

  container.scoped(
    'AddIngredientToRecipeUseCase',
    (c) =>
      new AddIngredientRecipeUseCase(c.inject('RecipeIngredientRepository')),
  );
  container.scoped(
    'RemoveIngredientFromRecipeUseCase',
    (c) =>
      new RemoveIngredientRecipeUseCase(c.inject('RecipeIngredientRepository')),
  );
}
