import { Ingredient, Recipe } from '../../../core/domain/recipes/entities';
import { RecipeIngredientRepository } from '../../../core/domain/recipes/interfaces';
import { DbContext } from '../../../shared/migration-system/DbContext';
import { ManyToManySQLiteRepository } from '../../common/bases';

export class RecipeIngredientSQLiteRepository
  extends ManyToManySQLiteRepository<Recipe, Ingredient>
  implements RecipeIngredientRepository
{
  protected tableName = 'recipes_ingredients';

  constructor(context: DbContext) {
    super(context);
  }

  protected mapRightRow(row: any): Ingredient {
    return new Ingredient(
      row.id,
      row.documentId,
      row.name,
      new Date(row.createdAt),
      new Date(row.updatedAt),
    );
  }

  protected mapLeftRow(row: any): Recipe {
    return new Recipe(
      row.id,
      row.documentId,
      row.title,
      row.preparationTime,
      row.difficulty,
      row.budget,
      row.description,
      new Date(row.createdAt),
      new Date(row.updatedAt),
      row.publishedAt ? new Date(row.publishedAt) : null,
    );
  }

  addIngredientToRecipe(recipeId: string, ingredientId: string): Promise<void> {
    return this.addRelation(recipeId, ingredientId);
  }

  removeIngredientFromRecipe(
    recipeId: string,
    ingredientId: string,
  ): Promise<void> {
    return this.removeRelation(recipeId, ingredientId);
  }

  getIngredientsByRecipe(recipeId: string): Promise<Ingredient[]> {
    return this.getRightByLeft(recipeId);
  }

  getRecipesByIngredient(ingredientId: string): Promise<Recipe[]> {
    return this.getLeftByRight(ingredientId);
  }
}
