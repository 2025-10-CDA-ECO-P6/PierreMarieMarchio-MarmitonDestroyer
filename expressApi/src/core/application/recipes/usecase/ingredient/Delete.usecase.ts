import { IngredientRepository } from '../../../../domain/recipes/interfaces';
import { NotFoundError } from '../../../common/exceptions';
import { UseCase } from '../../../common/interfaces';

export interface DeleteIngredientResponse {
  success: boolean;
}

export class DeleteIngredientUseCase
  implements UseCase<string, DeleteIngredientResponse>
{
  constructor(private readonly ingredientRepo: IngredientRepository) {}

  async execute(id: string): Promise<DeleteIngredientResponse> {
    const existing = await this.ingredientRepo.findById(id);
    if (!existing) throw new NotFoundError('Ingredient not found');

    // TODO: Add dellete all relation to join repository

    await this.ingredientRepo.delete(id);

    return { success: true };
  }
}
