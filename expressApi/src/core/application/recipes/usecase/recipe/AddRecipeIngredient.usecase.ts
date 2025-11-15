import { RecipeIngredientRepository } from '../../../../domain/recipes/interfaces';
import { UseCase } from '../../../common/interfaces';
import { AddIngredientToRecipeDTO } from '../../dto';

export interface AddRecipeIngredientResponse {
  success: boolean;
}

export class AddRecipeIngredientUseCase
  implements UseCase<AddIngredientToRecipeDTO, AddRecipeIngredientResponse>
{
  constructor(private readonly repo: RecipeIngredientRepository) {}

  async execute(
    request: AddIngredientToRecipeDTO,
  ): Promise<AddRecipeIngredientResponse> {
    await this.repo.addIngredientToRecipe(
      request.recipeId,
      request.ingredientId,
    );
    return { success: true };
  }
}
