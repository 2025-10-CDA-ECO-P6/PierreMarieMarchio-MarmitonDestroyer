import { RecipeIngredientRepository } from '../../../../domain/recipes/interfaces';
import { UseCase } from '../../../common/interfaces';
import { RemoveIngredientFromRecipeDTO } from '../../dto';

export interface RemoveRecipeIngredientResponse {
  success: boolean;
}

export class RemoveRecipeIngredientUseCase
  implements
    UseCase<RemoveIngredientFromRecipeDTO, RemoveRecipeIngredientResponse>
{
  constructor(private readonly repo: RecipeIngredientRepository) {}

  async execute(
    request: RemoveIngredientFromRecipeDTO,
  ): Promise<RemoveRecipeIngredientResponse> {
    await this.repo.removeIngredientFromRecipe(
      request.recipeId,
      request.ingredientId,
    );
    return { success: true };
  }
}
