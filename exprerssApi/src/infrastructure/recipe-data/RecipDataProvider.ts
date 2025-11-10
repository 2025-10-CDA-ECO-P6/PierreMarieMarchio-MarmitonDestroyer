import { DbContext } from '../../shared/migration-system/DbContext';
import { RecipeDbContext } from './persistence/contexts/RecipeDbContext';

export class RecipeDataProvider {
  private static recipeDbContext: RecipeDbContext;

  static addRecipeInfrastructure(appDbContext: DbContext) {
    RecipeDataProvider.RecipeDbContext(appDbContext);
  }

  private static RecipeDbContext(appDbContext: DbContext) {
    if (!RecipeDataProvider.recipeDbContext) {
      RecipeDataProvider.recipeDbContext = new RecipeDbContext(appDbContext);
    }
    return RecipeDataProvider.recipeDbContext;
  }

  static getDbContext() {
    if (!RecipeDataProvider.recipeDbContext) {
      throw new Error('RecipeDbContext not initialized');
    }
    return RecipeDataProvider.recipeDbContext;
  }
}
