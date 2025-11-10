import { AppDbContext } from '../infrastructure/common-data/persistence/contexts/AppDbContext';
import { RecipeDataProvider } from '../infrastructure/recipe-data/RecipDataProvider';

export const bootstrap = async () => {
  const appDbContext = new AppDbContext();
  RecipeDataProvider.addRecipeInfrastructure(appDbContext);

  await appDbContext.migrateAsync();
};
