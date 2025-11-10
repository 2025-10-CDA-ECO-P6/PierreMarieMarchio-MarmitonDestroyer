import { RecipeSQLiteRepository } from "../../../../../infrastructure/recipe-data/repositories";
import { Recipe } from "../../../../domain/features/recipes/entities";
import { RecipeDTO, RecipeFullDTO } from "../dto";

export async function updateRecipeUseCase(
  id: string,
  input: Partial<RecipeDTO>,
): Promise<UpdateRecipeResponse> {
  const recipeRepo = RecipeSQLiteRepository.getInstance();
  const existing = await recipeRepo.findById(id);
  if (!existing) return { data: null };

  const updated = new Recipe(
    id,
    input.Title ?? existing.Title,
    input.preparation_time ?? existing.preparation_time,
    input.dificulty ?? existing.dificulty,
    input.budget ?? existing.budget,
    input.description ?? existing.description,
  );

  await recipeRepo.update(updated);
  return { data: updated };
}

export interface UpdateRecipeResponse {
  data: RecipeFullDTO | null;
}
