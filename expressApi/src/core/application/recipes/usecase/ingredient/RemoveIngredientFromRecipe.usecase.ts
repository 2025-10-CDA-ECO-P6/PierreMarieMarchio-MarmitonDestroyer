import { RecipeIngredientRepository } from "../../../../domain/recipes/interfaces";
import { UseCase } from "../../../common/interfaces";
import { RemoveIngredientFromRecipeDTO } from "../../dto";


export interface RemoveIngredientFromRecipeResponse {
  success: boolean;
}

export class RemoveIngredientFromRecipeUseCase
  implements
    UseCase<RemoveIngredientFromRecipeDTO, RemoveIngredientFromRecipeResponse>
{
  constructor(private readonly repo: RecipeIngredientRepository) {}

  async execute(
    request: RemoveIngredientFromRecipeDTO,
  ): Promise<RemoveIngredientFromRecipeResponse> {
    await this.repo.removeIngredientFromRecipe(
      request.recipeId,
      request.ingredientId,
    );
    return { success: true };
  }
}
