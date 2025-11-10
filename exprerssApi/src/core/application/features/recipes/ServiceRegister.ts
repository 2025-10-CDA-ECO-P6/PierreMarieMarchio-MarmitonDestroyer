import { DIContainer } from '../../../../shared/dependency-injection/DIContainer';
import {
  CreateRecipeUseCase,
  DeleteRecipeUseCase,
  GetAllRecipesUseCase,
  GetRecipeByIdUseCase,
  UpdateRecipeUseCase,
} from './usecase';

export function registerRecipeApplicationServices(container: DIContainer) {
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
}
