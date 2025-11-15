import { RecipeRepository } from '../../../../domain/recipes/interfaces';
import { NotFoundError } from '../../../common/exceptions';
import { UseCase } from '../../../common/interfaces';

export interface DeleteRecipeResponse {
  success: boolean;
}

export class DeleteRecipeUseCase
  implements UseCase<string, DeleteRecipeResponse>
{
  constructor(private readonly recipeRepo: RecipeRepository) {}

  async execute(id: string): Promise<DeleteRecipeResponse> {
    const existing = await this.recipeRepo.findByDocumentId(id);
    if (!existing) throw new NotFoundError('Recipe not found');

    // TODO: Add dellete all relation to join repository

    await this.recipeRepo.delete(id);

    return { success: true };
  }
}
