import { RecipeRepository } from '../../../../domain/recipes/interfaces';
import { NotFoundError } from '../../../common/exeptions';
import { UseCase } from '../../../common/interfaces';
import { RecipeFullDTO } from '../../dto';

export interface GetRecipeByIdResponse {
  data: RecipeFullDTO | null;
  meta: Record<string, any>;
}

export class GetRecipeByIdUseCase
  implements UseCase<{ id: string; populate?: boolean }, GetRecipeByIdResponse>
{
  constructor(private readonly recipeRepo: RecipeRepository) {}

  async execute(input: {
    id: string;
    populate?: boolean;
  }): Promise<GetRecipeByIdResponse> {
    const recipe = await this.recipeRepo.findByDocumentId(
      input.id,
      input.populate ?? false,
    );
    if (!recipe) throw new NotFoundError('Recipe not found');

    return {
      data: recipe,
      meta: {},
    };
  }
}
