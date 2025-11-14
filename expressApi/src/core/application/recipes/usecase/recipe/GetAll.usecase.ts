import { RecipeRepository } from '../../../../domain/recipes/interfaces';
import { Meta } from '../../../common/dto';
import { UseCase } from '../../../common/interfaces';
import { RecipeFullDTO } from '../../dto';

export interface GetRecipesResponse {
  data: RecipeFullDTO[];
  meta: Meta;
}

export interface GetRecipesFilters {
  pagination?: {
    page: number;
    pageSize: number;
  };
  filters?: {
    titleContains?: string;
  };
  populate?: boolean;
  sort?: { field: string; order: 'asc' | 'desc' };
}

export class GetAllRecipesUseCase
  implements UseCase<GetRecipesFilters | void, GetRecipesResponse>
{
  constructor(private readonly recipeRepo: RecipeRepository) {}

  async execute(filters?: GetRecipesFilters): Promise<GetRecipesResponse> {
    const page = filters?.pagination?.page ?? 1;
    const pageSize = filters?.pagination?.pageSize ?? 25;
    const offset = (page - 1) * pageSize;

    const result = await this.recipeRepo.findAllWithMeta({
      filters: filters?.filters,
      limit: pageSize,
      offset,
      sort: filters?.sort,
      populate: filters?.populate,
    });

    const pageCount = Math.ceil(result.total / pageSize);

    return {
      data: result.items,
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount,
          total: result.total,
        },
      },
    };
  }
}
