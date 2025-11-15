import { QueryContext } from '../../../../domain/common/interfaces';
import { RecipeRepository } from '../../../../domain/recipes/interfaces';
import { Meta } from '../../../common/dto';
import { UseCase } from '../../../common/interfaces';
import { RecipeFullDTO } from '../../dto';

export interface GetRecipesResponse {
  data: RecipeFullDTO[];
  meta: Meta;
}

export class GetAllRecipesUseCase
  implements UseCase<QueryContext, GetRecipesResponse>
{
  constructor(private readonly recipeRepo: RecipeRepository) {}

  async execute(ctx: QueryContext): Promise<GetRecipesResponse> {
    const result = await this.recipeRepo.findAll(ctx);

    const pageSize = ctx.getLimit() ?? 25;
    const offset = ctx.getOffset() ?? 0;
    const page = offset / pageSize + 1;
    const pageCount = Math.ceil(result.total / pageSize);

    return {
      data: result.items.map((r) => this.toFullDTO(r)),
      meta: {
        page,
        pageSize,
        pageCount,
        total: result.total,
      },
    };
  }

  private toFullDTO(recipe: any): RecipeFullDTO {
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
      ingredients: recipe.ingredients ?? [],
    };
  }
}
