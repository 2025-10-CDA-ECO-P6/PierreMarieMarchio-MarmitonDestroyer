import { Database } from 'sqlite';
import {
  RecipeFilters,
  RecipeRepository,
} from '../../../core/domain/features/recipes/interfaces';
import {
  Ingredient,
  Recipe,
} from '../../../core/domain/features/recipes/entities';
import { RecipeDbContext } from '../persistence/contexts/RecipeDbContext';

export class RecipeSQLiteRepository implements RecipeRepository {
  constructor(private readonly context: RecipeDbContext) {}

  private get db(): Database {
    return this.context.getDb();
  }

  async add(recipe: Recipe): Promise<void> {
    await this.db.run(
      `INSERT INTO recipes (id, Title, preparation_time, dificulty, budget, description, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      recipe.id,
      recipe.Title,
      recipe.preparation_time,
      recipe.dificulty,
      recipe.budget,
      recipe.description,
      recipe.createdAt.toISOString(),
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
      new Date(row.createdAt),
    );
  }

  async findAll(filters?: RecipeFilters): Promise<Recipe[]> {
    const conditions: string[] = [];
    const params: any[] = [];

    if (filters?.afterDate) {
      conditions.push(`createdAt > ?`);
      params.push(filters.afterDate.toISOString());
    }
    if (filters?.titleContains) {
      conditions.push(`Title LIKE ?`);
      params.push(`%${filters.titleContains}%`);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(' AND ')}`
      : '';

    const rows = await this.db.all(
      `SELECT * FROM recipes ${whereClause}`,
      params,
    );

    return rows.map(
      (row: any) =>
        new Recipe(
          row.id,
          row.Title,
          row.preparation_time,
          row.dificulty,
          row.budget,
          row.description,
          new Date(row.createdAt),
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

  async findWithIngredients(id: string): Promise<Recipe | null> {
    const recipe = await this.findById(id);
    if (!recipe) return null;

    const rows = await this.db.all(
      `SELECT i.id, i.name
       FROM ingredients i
       INNER JOIN recipe_ingredients ri ON ri.ingredient_id = i.id
       WHERE ri.recipe_id = ?`,
      id,
    );

    const ingredients = rows.map((r: any) => new Ingredient(r.id, r.name));
    recipe.ingredients = ingredients;
    return recipe;
  }
}
