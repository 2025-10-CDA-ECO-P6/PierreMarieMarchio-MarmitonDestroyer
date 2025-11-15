import { DIContainer } from '../../shared/dependency-injection/DIContainer';
import { RecipeDbContext } from './persistence/contexts/RecipeDbContext';
import {
  IngredientSQLiteRepository,
  RecipeIngredientSQLiteRepository,
  RecipeSQLiteRepository,
} from './repositories';

export function registerRecipeDataInfrastructureService(
  container: DIContainer,
) {
  container.singleton(
    'RecipeDbContext',
    (c) => new RecipeDbContext(c.inject('AppDbContext')),
  );
  container.scoped(
    'RecipeRepository',
    (c) =>
      new RecipeSQLiteRepository(
        c.inject('RecipeDbContext'),
        c.inject('RecipeIngredientRepository'),
      ),
  );
  container.scoped(
    'IngredientRepository',
    (c) =>
      new IngredientSQLiteRepository(
        c.inject('RecipeDbContext'),
        c.inject('RecipeIngredientRepository'),
      ),
  );
  container.scoped(
    'RecipeIngredientRepository',
    (c) => new RecipeIngredientSQLiteRepository(c.inject('RecipeDbContext')),
  );
}
