import { Migration } from '../../../../shared/migration-system/Migration';

export const CreateUserTableMigration: Migration = {
  id: '20251110_2_createUserTable',
  up: async (db) => {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
    `);
  },
};
