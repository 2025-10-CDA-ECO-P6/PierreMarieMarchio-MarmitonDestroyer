import { RecipeRepository } from '../../../../../domain/features/recipes/interfaces';
import { NotFoundError } from '../../../../common/exeptions';
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
    if (!recipe) throw new NotFoundError('Recipe not found');

    await this.recipeRepo.delete(id);
    return { success: true };
  }
}