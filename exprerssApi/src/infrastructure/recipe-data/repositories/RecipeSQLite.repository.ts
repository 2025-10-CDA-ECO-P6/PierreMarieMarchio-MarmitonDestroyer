import { Database } from 'sqlite';
import { RecipeRepository } from '../../../core/domain/features/recipes/interfaces';
import { Recipe } from '../../../core/domain/features/recipes/entities';
import { RecipeDbContext } from '../persistence/contexts/RecipeDbContext';

export class RecipeSQLiteRepository implements RecipeRepository {

  constructor(private readonly context: RecipeDbContext) {}

  private get db(): Database {
    return this.context.getDb();
  }

  async add(recipe: Recipe): Promise<void> {
    await this.db.run(
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
    const row = await this.db.get(`SELECT * FROM recipes WHERE id = ?`, id);
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
    const rows = await this.db.all(`SELECT * FROM recipes`);
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
    await this.db.run(
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
    await this.db.run(`DELETE FROM recipes WHERE id = ?`, id);
  }
}
