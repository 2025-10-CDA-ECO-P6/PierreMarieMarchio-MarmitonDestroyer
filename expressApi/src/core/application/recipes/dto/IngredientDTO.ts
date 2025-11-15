import { Recipe } from '../../../domain/recipes/entities';
import { RecipeFullDTO } from './RecipeDTO';

export interface IngredientDTO {
  documentId: string;
  name: string;
  recipies?: RecipeFullDTO[];
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
