import { randomUUID } from 'node:crypto';
import { Recipe } from '../../../../domain/recipes/entities';
import { RecipeRepository } from '../../../../domain/recipes/interfaces';
import { ValidationError } from '../../../common/exceptions';
import { UseCase } from '../../../common/interfaces';
import { RecipeDTO, RecipeFullDTO } from '../../dto';

export interface CreateRecipeRequest {
  data: RecipeDTO;
}

export interface CreateRecipeResponse {
  data: RecipeFullDTO;
}

export class CreateRecipeUseCase
  implements UseCase<CreateRecipeRequest, CreateRecipeResponse>
{
  constructor(private readonly recipeRepo: RecipeRepository) {}

  async execute(recipe: CreateRecipeRequest): Promise<CreateRecipeResponse> {
    if (!recipe.data.Title || !recipe.data.description) {
      throw new ValidationError('Title and description are required');
    }

    const newRecipe = new Recipe(
      randomUUID(),
      randomUUID(),
      recipe.data.Title,
      recipe.data.preparation_time,
      recipe.data.dificulty,
      recipe.data.budget,
      recipe.data.description,
      new Date(),
      new Date(),
      recipe.data.publishedAt ?? null,
    );

    await this.recipeRepo.create(newRecipe);

    return {
      data: this.toDTO(newRecipe),
    };
  }

  private toDTO(recipe: Recipe): RecipeFullDTO {
    return {
      id: recipe.id,
      documentId: recipe.documentId,
      Title: recipe.title,
      preparation_time: recipe.preparationTime,
      dificulty: recipe.difficulty,
      budget: recipe.budget,
      description: recipe.description,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
      publishedAt: recipe.publishedAt,
    };
  }
}
