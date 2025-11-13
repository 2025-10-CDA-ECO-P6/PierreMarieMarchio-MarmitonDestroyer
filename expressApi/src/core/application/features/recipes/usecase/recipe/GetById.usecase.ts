import { RecipeRepository } from '../../../../../domain/features/recipes/interfaces';
import { NotFoundError } from '../../../../common/exeptions';
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
    const recipe = await this.recipeRepo.findWithIngredients(id);
    if (!recipe) throw new NotFoundError('Recipe not found');
    return { data: recipe };
  }
}
