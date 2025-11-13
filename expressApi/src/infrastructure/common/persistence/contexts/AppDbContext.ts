import { DbContext } from '../../../../shared/migration-system/DbContext';
import { CreateUserTableMigration } from '../migrations/createUserTable';

export class AppDbContext extends DbContext {
  constructor() {
    super();
    this.addMigrations([CreateUserTableMigration]);
  }
}
