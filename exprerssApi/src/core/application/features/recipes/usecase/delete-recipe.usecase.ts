import { RecipeSQLiteRepository } from "../../../../../infrastructure/recipe-data/repositories";

export async function deleteRecipeUseCase(
  id: string,
): Promise<DeleteRecipeResponse> {
  const recipeRepo = RecipeSQLiteRepository.getInstance();
  const recipe = await recipeRepo.findById(id);
  if (!recipe) return { success: false };

  await recipeRepo.delete(id);
  return { success: true };
}

export interface DeleteRecipeResponse {
  success: boolean;
}
