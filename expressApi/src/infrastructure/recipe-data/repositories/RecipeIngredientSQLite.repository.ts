import { Database } from 'sqlite';
import { Ingredient } from '../../../core/domain/features/recipes/entities';
import { RecipeIngredientRepository } from '../../../core/domain/features/recipes/interfaces';
import { RecipeDbContext } from '../persistence/contexts/RecipeDbContext';

export class RecipeIngredientSQLiteRepository
  implements RecipeIngredientRepository
{
  constructor(private readonly context: RecipeDbContext) {}

  private get db(): Database {
    return this.context.getDb();
  }

  async addIngredientToRecipe(
    recipeId: string,
    ingredientId: string,
  ): Promise<void> {
    await this.db.run(
      `INSERT OR IGNORE INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?, ?)`,
      recipeId,
      ingredientId,
    );
  }

  async removeIngredientFromRecipe(
    recipeId: string,
    ingredientId: string,
  ): Promise<void> {
    await this.db.run(
      `DELETE FROM recipe_ingredients WHERE recipe_id=? AND ingredient_id=?`,
      recipeId,
      ingredientId,
    );
  }

  async getIngredientsByRecipe(recipeId: string): Promise<Ingredient[]> {
    const rows = await this.db.all(
      `
      SELECT i.* FROM ingredients i
      JOIN recipe_ingredients ri ON i.id = ri.ingredient_id
      WHERE ri.recipe_id = ?
    `,
      recipeId,
    );

    return rows.map((row: any) => new Ingredient(row.id, row.name));
  }

  async getRecipesByIngredient(ingredientId: string): Promise<string[]> {
    const rows = await this.db.all(
      `SELECT recipe_id FROM recipe_ingredients WHERE ingredient_id=?`,
      ingredientId,
    );
    return rows.map((row: any) => row.recipe_id);
  }
}
