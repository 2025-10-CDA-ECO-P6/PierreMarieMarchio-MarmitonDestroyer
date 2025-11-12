import { Migration } from '../../../../shared/migration-system/Migration';

export const CreateIngredientTable: Migration = {
  id: '20251112_1_createIngredientTable',
  up: async (db) => {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS ingredients (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS recipe_ingredients (
        recipe_id TEXT NOT NULL,
        ingredient_id TEXT NOT NULL,
        PRIMARY KEY(recipe_id, ingredient_id),
        FOREIGN KEY(recipe_id) REFERENCES recipes(id),
        FOREIGN KEY(ingredient_id) REFERENCES ingredients(id)
      );
    `);
  },
};
