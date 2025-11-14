import { randomUUID } from 'node:crypto';
import { Recipe } from '../../../../domain/recipes/entities';
import { RecipeRepository } from '../../../../domain/recipes/interfaces';
import { ValidationError } from '../../../common/exeptions';
import { UseCase } from '../../../common/interfaces';
import { RecipeDTO, RecipeFullDTO } from '../../dto';

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
      recipe.documentId ?? randomUUID(),
      recipe.Title,
      recipe.preparation_time,
      recipe.dificulty,
      recipe.budget,
      recipe.description,
      new Date(),
      new Date(),
      recipe.publishedAt ?? null,
      recipe.ingredients,
    );

    await this.recipeRepo.create(newRecipe);

    return { data: newRecipe };
  }
}
