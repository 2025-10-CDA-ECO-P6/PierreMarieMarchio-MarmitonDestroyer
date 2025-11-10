import { randomUUID } from 'node:crypto';
import { RecipeSQLiteRepository } from '../../../../../infrastructure/recipe-data/repositories';
import { Recipe } from '../../../../domain/features/recipes/entities';
import { RecipeDTO, RecipeFullDTO } from '../dto';

export async function createRecipeUseCase(
  recipe: RecipeDTO,
): Promise<CreateRecipeResponse> {
  const recipeRepo = RecipeSQLiteRepository.getInstance();

  const newRecipe = new Recipe(
    randomUUID(),
    recipe.Title,
    recipe.preparation_time,
    recipe.dificulty,
    recipe.budget,
    recipe.description,
  );

  await recipeRepo.add(newRecipe);
  return { data: newRecipe };
}

export interface CreateRecipeRequest {
  data: RecipeDTO;
}

export interface CreateRecipeResponse {
  data: RecipeFullDTO;
}
