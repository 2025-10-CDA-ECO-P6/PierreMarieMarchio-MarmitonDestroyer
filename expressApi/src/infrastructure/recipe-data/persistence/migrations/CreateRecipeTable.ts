import { Migration } from '../../../../shared/migration-system/Migration';

export const CreateRecipeTableMigration: Migration = {
  id: '20251110_1_createRecipeTable',
  up: async (db) => {
    await db.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      preparationTime INTEGER NOT NULL,
      difficulty INTEGER NOT NULL,
      budget INTEGER NOT NULL,
      description TEXT
    )
  `);
  },
};
