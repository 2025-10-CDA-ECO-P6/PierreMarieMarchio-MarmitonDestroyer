import { Migration } from '../../../../shared/migration-system/Migration';

export const AddStrapiFieldsToRecipes: Migration = {
  id: '20251114_1_addStrapiFieldsToRecipes',
  up: async (db) => {
    await db.exec(`
      ALTER TABLE recipes ADD COLUMN documentId TEXT;
    `);
    await db.exec(`
      ALTER TABLE recipes ADD COLUMN updatedAt TEXT;
    `);
    await db.exec(`
      ALTER TABLE recipes ADD COLUMN publishedAt TEXT;
    `);
  },
};
