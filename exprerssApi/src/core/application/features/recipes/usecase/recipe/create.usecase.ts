import { randomUUID } from 'node:crypto';
import { Recipe } from '../../../../../domain/features/recipes/entities';
import { RecipeDTO, RecipeFullDTO } from '../../dto';
import { UseCase } from '../../../../common/interfaces';
import { RecipeRepository } from '../../../../../domain/features/recipes/interfaces';

export interface CreateRecipeRequest {
  data: RecipeDTO;
}

export interface CreateRecipeResponse {
  data: RecipeFullDTO;
}

export class CreateRecipeUseCase
  implements UseCase<RecipeDTO, CreateRecipeResponse>
{
  constructor(private readonly recipeRepo: RecipeRepository) {}

  async execute(recipe: RecipeDTO): Promise<CreateRecipeResponse> {
    const newRecipe = new Recipe(
      randomUUID(),
      recipe.Title,
      recipe.preparation_time,
      recipe.dificulty,
      recipe.budget,
      recipe.description,
    );

    await this.recipeRepo.add(newRecipe);

    return { data: newRecipe };
  }
}
