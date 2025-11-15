import { AppDbContext } from '../../infrastructure/common/persistence/contexts/AppDbContext';
import { RecipeDbContext } from '../../infrastructure/recipe-data/persistence/contexts/RecipeDbContext';
import { container } from '../app';

export const DataBaseInit = async () => {
  const appDbContext = container.inject<AppDbContext>('AppDbContext');
  const RecipeDbContext = container.inject<RecipeDbContext>('RecipeDbContext');
  await appDbContext.migrateAsync();
};
