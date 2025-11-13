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
  container.register(
    'RecipeRepository',
    (c) => new RecipeSQLiteRepository(c.inject('RecipeDbContext')),
  );
  container.register(
    'IngredientRepository',
    (c) => new IngredientSQLiteRepository(c.inject('RecipeDbContext')),
  );
  container.register(
    'RecipeIngredientRepository',
    (c) => new RecipeIngredientSQLiteRepository(c.inject('RecipeDbContext')),
  );
}
