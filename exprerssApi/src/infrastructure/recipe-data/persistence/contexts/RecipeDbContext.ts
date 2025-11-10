import { ModuleDbContext } from '../../../../shared/migration-system/ModuleDbContext';
import { AppDbContext } from '../../../common/persistence/contexts/AppDbContext';
import { CreateRecipeTableMigration } from '../migrations/createRecipeTable';

export class RecipeDbContext extends ModuleDbContext {
  constructor(appDbContext: AppDbContext) {
    super(appDbContext);
    this.addMigrations([CreateRecipeTableMigration]);
  }
}
