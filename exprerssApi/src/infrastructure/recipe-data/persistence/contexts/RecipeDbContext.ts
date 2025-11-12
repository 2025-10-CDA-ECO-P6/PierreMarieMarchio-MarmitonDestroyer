import { ModuleDbContext } from '../../../../shared/migration-system/ModuleDbContext';
import { AppDbContext } from '../../../common/persistence/contexts/AppDbContext';
import { CreateIngredientTable } from '../migrations/CreateIngredientTable';
import { CreateRecipeTableMigration } from '../migrations/CreateRecipeTable';

export class RecipeDbContext extends ModuleDbContext {
  constructor(appDbContext: AppDbContext) {
    super(appDbContext);
    this.addMigrations([CreateRecipeTableMigration, CreateIngredientTable]);
  }
}
