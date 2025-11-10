import { RecipeSQLiteRepository } from '../../../../../infrastructure/recipe-data/repositories';
import { RecipeFullDTO } from '../dto';

export async function getRecipeByIdUseCase(
  id: string,
): Promise<GetRecipeByIdResponse> {
  const recipeRepo = RecipeSQLiteRepository.getInstance();
  const recipe = await recipeRepo.findById(id);
  return { data: recipe ?? null };
}

export interface GetRecipeByIdResponse {
  data: RecipeFullDTO | null;
}