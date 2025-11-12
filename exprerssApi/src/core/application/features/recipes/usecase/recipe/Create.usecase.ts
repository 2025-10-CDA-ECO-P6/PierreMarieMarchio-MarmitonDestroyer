import { randomUUID } from 'node:crypto';
import { Recipe } from '../../../../../domain/features/recipes/entities';
import { RecipeDTO, RecipeFullDTO } from '../../dto';
import { UseCase } from '../../../../common/interfaces';
import { RecipeRepository } from '../../../../../domain/features/recipes/interfaces';
import { ValidationError } from '../../../../common/exeptions';

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
    if (!recipe.Title || !recipe.description) {
      throw new ValidationError('Title and description are required');
    }

    const newRecipe = new Recipe(
      randomUUID(),
      recipe.Title,
      recipe.preparation_time,
      recipe.dificulty,
      recipe.budget,
      recipe.description,
      recipe.createdAt ?? new Date(),
      recipe.ingredients,
    );

    await this.recipeRepo.add(newRecipe);

    return { data: newRecipe };
  }
}
