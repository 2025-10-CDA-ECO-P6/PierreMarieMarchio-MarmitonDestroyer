import { QueryContext } from '../../../common/interfaces';
import { PaginatedResult } from '../../../common/interfaces/contracts/pagination-result';
import { Ingredient, Recipe } from '../../entities';

export interface RecipeIngredientRepository {
  addIngredientToRecipe(recipeId: string, ingredientId: string): Promise<void>;
  removeIngredientFromRecipe(
    recipeId: string,
    ingredientId: string,
  ): Promise<void>;
  getIngredientsByRecipe(
    recipeId: string,
    queryContext: QueryContext,
  ): Promise<PaginatedResult<Ingredient>>;
  getRecipesByIngredient(
    ingredientId: string,
    queryContext: QueryContext,
  ): Promise<PaginatedResult<Recipe>>;
}
