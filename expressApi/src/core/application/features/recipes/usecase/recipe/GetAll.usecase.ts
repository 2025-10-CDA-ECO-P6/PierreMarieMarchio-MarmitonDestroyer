import { RecipeRepository } from '../../../../../domain/features/recipes/interfaces';
import { UseCase } from '../../../../common/interfaces';
import { RecipeFullDTO } from '../../dto';

export interface GetRecipesResponse {
  data: RecipeFullDTO[];
}

export interface GetRecipesFilters {
  afterDate?: Date;
  titleContains?: string;
}

export class GetAllRecipesUseCase
  implements UseCase<GetRecipesFilters | void, GetRecipesResponse>
{
  constructor(private readonly recipeRepo: RecipeRepository) {}

  async execute(filters?: GetRecipesFilters): Promise<GetRecipesResponse> {
    const res = await this.recipeRepo.findAll(filters);
    return { data: res };
  }
}
