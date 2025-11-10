import { RecipeSQLiteRepository } from '../../../../../infrastructure/recipe-data/repositories';
import { RecipeFullDTO } from '../dto';

export async function getAllRecipesUseCase(): Promise<GetRecipesResponse> {
  const recipeRepo = RecipeSQLiteRepository.getInstance();
  const res: RecipeFullDTO[] = await recipeRepo.findAll();

  return { data: res };
}

export interface GetRecipesResponse {
  data: RecipeFullDTO[];
}
