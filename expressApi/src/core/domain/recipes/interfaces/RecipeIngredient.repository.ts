import { Ingredient, Recipe } from '../entities';

export interface RecipeIngredientRepository {
  addIngredientToRecipe(recipeId: string, ingredientId: string): Promise<void>;
  removeIngredientFromRecipe(
    recipeId: string,
    ingredientId: string,
  ): Promise<void>;
  getIngredientsByRecipe(recipeId: string): Promise<Ingredient[]>;
  getRecipesByIngredient(ingredientId: string): Promise<Recipe[]>;
}
