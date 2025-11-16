import { QueryContext } from '../../../../domain/common/interfaces';
import { Ingredient, Recipe } from '../../../../domain/recipes/entities';
import { IngredientRepository } from '../../../../domain/recipes/interfaces';
import { Meta } from '../../../common/dto';
import { UseCase } from '../../../common/interfaces';
import { IngredientFullDTO, RecipeFullDTO } from '../../dto';

export interface GetAllIngredientsResponse {
  data: IngredientFullDTO[];
  meta: Meta;
}

export class GetAllIngredientsUseCase
  implements UseCase<QueryContext, GetAllIngredientsResponse>
{
  constructor(private readonly ingredientRepo: IngredientRepository) {}

  async execute(ctx: QueryContext): Promise<GetAllIngredientsResponse> {
    const limit = ctx.getLimit() ?? 25;
    const offset = ctx.getOffset() ?? 0;

    const result = await this.ingredientRepo.findAll(ctx);
    const page = offset / limit + 1;
    const pageCount = Math.ceil(result.total / limit);

    return {
      data: result.items.map((i) =>
        this.toFullDTO(i, ctx.getPopulate() ?? false),
      ),
      meta: {
        page,
        pageSize: limit,
        pageCount,
        total: result.total,
      },
    };
  }

  private toFullDTO(
    ingredient: Ingredient,
    populate: boolean,
  ): IngredientFullDTO {
    return {
      id: ingredient.id,
      documentId: ingredient.documentId,
      name: ingredient.name,
      recipies: populate
        ? (ingredient.recipies?.map((r) => this.toRecipeDTO(r)) ?? [])
        : undefined,
    };
  }

  private toRecipeDTO(recipe: Recipe): RecipeFullDTO {
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
