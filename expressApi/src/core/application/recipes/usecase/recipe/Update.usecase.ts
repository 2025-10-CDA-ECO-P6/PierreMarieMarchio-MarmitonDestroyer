import { Recipe } from '../../../../domain/recipes/entities';
import { RecipeRepository } from '../../../../domain/recipes/interfaces';
import { NotFoundError } from '../../../common/exceptions';
import { UseCase } from '../../../common/interfaces';
import { RecipeDTO, RecipeFullDTO } from '../../dto';

export interface UpdateRecipeResponse {
  data: RecipeFullDTO | null;
}

export interface UpdateRecipeRequest {
  data: Partial<RecipeDTO>;
}

export class UpdateRecipeUseCase
  implements
    UseCase<{ id: string; input: UpdateRecipeRequest }, UpdateRecipeResponse>
{
  constructor(private readonly recipeRepo: RecipeRepository) {}

  async execute({
    id,
    input,
  }: {
    id: string;
    input: UpdateRecipeRequest;
  }): Promise<UpdateRecipeResponse> {
    const existing = await this.recipeRepo.findByDocumentId(id);
    if (!existing) throw new NotFoundError('Recipe not found');

    const updated = new Recipe(
      existing.id,
      existing.documentId,
      input.data.title ?? existing.title,
      input.data.preparationTime ?? existing.preparationTime,
      input.data.difficulty ?? existing.difficulty,
      input.data.budget ?? existing.budget,
      input.data.description ?? existing.description,
      existing.createdAt,
      new Date(),
      input.data.publishedAt ?? existing.publishedAt,
    );

    await this.recipeRepo.update(updated);

    return {
      data: this.toDTO(updated),
    };
  }

  private toDTO(recipe: Recipe): RecipeFullDTO {
    return {
      id: recipe.id,
      documentId: recipe.documentId,
      title: recipe.title,
      preparationTime: recipe.preparationTime,
      difficulty: recipe.difficulty,
      budget: recipe.budget,
      description: recipe.description,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
      publishedAt: recipe.publishedAt,
    };
  }
}
