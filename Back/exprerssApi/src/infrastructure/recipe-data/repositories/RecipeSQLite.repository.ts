import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { RecipeRepository } from '../../../core/domain/features/recipes/interfaces';
import { Recipe } from '../../../core/domain/features/recipes/entities';

export class RecipeSQLiteRepository implements RecipeRepository {
  private static instance: RecipeSQLiteRepository;
  private db: Database | null = null;

  private constructor() {}

  static getInstance(): RecipeSQLiteRepository {
    if (!RecipeSQLiteRepository.instance) {
      RecipeSQLiteRepository.instance = new RecipeSQLiteRepository();
    }
    return RecipeSQLiteRepository.instance;
  }

  private async getDB(): Promise<Database> {
    this.db ??= await open({
        filename: 'database.sqlite',
        driver: sqlite3.Database,
      });
    return this.db;
  }

  async add(recipe: Recipe): Promise<void> {
    const db = await this.getDB();
    await db.run(
      `INSERT INTO recipes (id, Title, preparation_time, dificulty, budget, description)
       VALUES (?, ?, ?, ?, ?, ?)`,
      recipe.id,
      recipe.Title,
      recipe.preparation_time,
      recipe.dificulty,
      recipe.budget,
      recipe.description,
    );
  }

  async findById(id: string): Promise<Recipe | null> {
    const db = await this.getDB();
    const row = await db.get(`SELECT * FROM recipes WHERE id = ?`, id);
    if (!row) return null;
    return new Recipe(
      row.id,
      row.Title,
      row.preparation_time,
      row.dificulty,
      row.budget,
      row.description,
    );
  }

  async findAll(): Promise<Recipe[]> {
    const db = await this.getDB();
    const rows = await db.all(`SELECT * FROM recipes`);
    return rows.map(
      (row: any) =>
        new Recipe(
          row.id,
          row.Title,
          row.preparation_time,
          row.dificulty,
          row.budget,
          row.description,
        ),
    );
  }

  async update(recipe: Recipe): Promise<void> {
    const db = await this.getDB();
    await db.run(
      `UPDATE recipes
       SET Title=?, preparation_time=?, dificulty=?, budget=?, description=?
       WHERE id=?`,
      recipe.Title,
      recipe.preparation_time,
      recipe.dificulty,
      recipe.budget,
      recipe.description,
      recipe.id,
    );
  }

  async delete(id: string): Promise<void> {
    const db = await this.getDB();
    await db.run(`DELETE FROM recipes WHERE id = ?`, id);
  }
}