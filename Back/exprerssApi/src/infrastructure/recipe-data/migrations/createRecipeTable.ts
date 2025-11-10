import { getDB } from '../../../.config/sqlite';

export async function migrateRecipe() {
  const db = await getDB();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
      id TEXT PRIMARY KEY,
      Title TEXT NOT NULL,
      preparation_time INTEGER NOT NULL,
      dificulty INTEGER NOT NULL,
      budget INTEGER NOT NULL,
      description TEXT
    )
  `);

  console.log('Migration recipe terminée');
}
