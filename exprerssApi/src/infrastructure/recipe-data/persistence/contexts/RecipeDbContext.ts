import { ModuleDbContext } from '../../../../shared/migration-systeme/ModuleDbContext';
import { AppDbContext } from '../../../common-data/persistence/contexts/AppDbContext';
import { RecipeTableMigration } from '../migrations/createRecipeTable';

export class RecipeDbContext extends ModuleDbContext {
  constructor(appDbContext: AppDbContext) {
    super(appDbContext);
    this.addMigrations([RecipeTableMigration]);
  }
}
