import { RecipeRepository } from '../../../../../domain/features/recipes/interfaces';
import { UseCase } from '../../../../common/interfaces';

export interface DeleteRecipeResponse {
  success: boolean;
}

export class DeleteRecipeUseCase
  implements UseCase<string, DeleteRecipeResponse>
{
  constructor(private readonly recipeRepo: RecipeRepository) {}

  async execute(id: string): Promise<DeleteRecipeResponse> {
    const recipe = await this.recipeRepo.findById(id);
    if (!recipe) return { success: false };

    await this.recipeRepo.delete(id);
    return { success: true };
  }
}