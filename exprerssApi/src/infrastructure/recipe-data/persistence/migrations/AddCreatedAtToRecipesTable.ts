import { Migration } from '../../../../shared/migration-system/Migration';

export const AddCreatedAtToRecipesTable: Migration = {
  id: '20251112_2_addCreatedAtToRecipesTable',
  up: async (db) => {
    await db.exec(`
      ALTER TABLE recipes
      ADD COLUMN createdAt TEXT;
    `);
  },
};