import { RecipeRepository } from '../../../../../domain/features/recipes/interfaces';
import { UseCase } from '../../../../common/interfaces';
import { RecipeFullDTO } from '../../dto';

export interface GetRecipeByIdResponse {
  data: RecipeFullDTO | null;
}

export class GetRecipeByIdUseCase
  implements UseCase<string, GetRecipeByIdResponse>
{
  constructor(private readonly recipeRepo: RecipeRepository) {}

  async execute(id: string): Promise<GetRecipeByIdResponse> {
    const recipe = await this.recipeRepo.findById(id);
    return { data: recipe ?? null };
  }
}
