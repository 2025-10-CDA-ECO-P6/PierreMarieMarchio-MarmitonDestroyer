export interface IngredientDTO {
  name: string;
}

export interface IngredientFullDTO extends IngredientDTO {
  id: string;
}

export interface AddIngredientToRecipeDTO {
  recipeId: string;
  ingredientId: string;
}

export interface RemoveIngredientFromRecipeDTO {
  recipeId: string;
  ingredientId: string;
}

export interface RecipeIngredientsListDTO {
  data: IngredientFullDTO[];
}
