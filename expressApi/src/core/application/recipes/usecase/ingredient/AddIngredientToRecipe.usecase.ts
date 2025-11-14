import { RecipeIngredientRepository } from "../../../../domain/recipes/interfaces";
import { UseCase } from "../../../common/interfaces";
import { AddIngredientToRecipeDTO } from "../../dto";

export interface AddIngredientToRecipeResponse {
  success: boolean;
}

export class AddIngredientToRecipeUseCase
  implements UseCase<AddIngredientToRecipeDTO, AddIngredientToRecipeResponse>
{
  constructor(private readonly repo: RecipeIngredientRepository) {}

  async execute(
    request: AddIngredientToRecipeDTO,
  ): Promise<AddIngredientToRecipeResponse> {
    await this.repo.addIngredientToRecipe(
      request.recipeId,
      request.ingredientId,
    );
    return { success: true };
  }
}
