import { ModuleDbContext } from '../../../../shared/migration-system/ModuleDbContext';
import { AppDbContext } from '../../../common/persistence/contexts/AppDbContext';

export class AuthDbContext extends ModuleDbContext {
  constructor(appDbContext: AppDbContext) {
    super(appDbContext);
    this.addMigrations([]);
  }
}
