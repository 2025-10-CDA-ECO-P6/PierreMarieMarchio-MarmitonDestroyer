import { Recipe } from '../../../../domain/recipes/entities';
import { RecipeRepository } from '../../../../domain/recipes/interfaces';
import { NotFoundError } from '../../../common/exceptions';
import { UseCase } from '../../../common/interfaces';
import { RecipeDTO, RecipeFullDTO } from '../../dto';

export interface UpdateRecipeResponse {
  data: RecipeFullDTO | null;
}

export class UpdateRecipeUseCase
  implements
    UseCase<{ id: string; input: Partial<RecipeDTO> }, UpdateRecipeResponse>
{
  constructor(private readonly recipeRepo: RecipeRepository) {}

  async execute({
    id,
    input,
  }: {
    id: string;
    input: Partial<RecipeDTO>;
  }): Promise<UpdateRecipeResponse> {
    const existing = await this.recipeRepo.findById(id);
    if (!existing) throw new NotFoundError('Recipe not found');

    const updated = new Recipe(
      id,
      existing.documentId,
      input.Title ?? existing.Title,
      input.preparation_time ?? existing.preparation_time,
      input.dificulty ?? existing.dificulty,
      input.budget ?? existing.budget,
      input.description ?? existing.description,
      existing.createdAt,
      new Date(), // updatedAt
      input.publishedAt ?? existing.publishedAt,
      input.ingredients ?? existing.ingredients,
    );

    await this.recipeRepo.update(updated);
    return { data: updated };
  }
}
