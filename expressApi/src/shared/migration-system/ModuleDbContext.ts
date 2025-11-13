import { DbContext } from './DbContext';
import { Migration } from './Migration';

export abstract class ModuleDbContext {
  constructor(protected readonly dbContext: DbContext) {}

  addMigrations(migrations: Migration[]) {
    this.dbContext.addMigrations(migrations);
  }

  getDb() {
    return this.dbContext.getDb();
  }
}
