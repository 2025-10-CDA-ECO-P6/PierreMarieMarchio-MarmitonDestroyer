import { QueryContext } from '../../../../domain/common/interfaces';
import { Recipe, Ingredient } from '../../../../domain/recipes/entities';
import { RecipeRepository } from '../../../../domain/recipes/interfaces';
import { NotFoundError } from '../../../common/exceptions';
import { UseCase } from '../../../common/interfaces';
import { IngredientFullDTO, RecipeFullDTO } from '../../dto';

export interface GetRecipeByIdResponse {
  data: RecipeFullDTO | null;
  meta: Record<string, any>;
}

export class GetRecipeByIdUseCase
  implements UseCase<{ id: string; ctx: QueryContext }, GetRecipeByIdResponse>
{
  constructor(private readonly recipeRepo: RecipeRepository) {}

  async execute(input: {
    id: string;
    ctx: QueryContext;
  }): Promise<GetRecipeByIdResponse> {
    const populate = input.ctx.getPopulate() ?? false;

    const recipe = populate
      ? await this.recipeRepo.findWithIngredients(input.id, input.ctx)
      : await this.recipeRepo.findByDocumentId(input.id);

    if (!recipe) throw new NotFoundError('Recipe not found');

    return {
      data: this.toDTO(recipe),
      meta: {},
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
      ingredients:
        recipe.ingredients?.map((i) => this.toIngredientDTO(i)) ?? [],
    };
  }

  private toIngredientDTO(ing: Ingredient): IngredientFullDTO {
    return {
      id: ing.id,
      documentId: ing.documentId,
      name: ing.name,
    };
  }
}
