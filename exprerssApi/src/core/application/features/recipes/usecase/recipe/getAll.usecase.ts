import { RecipeRepository } from '../../../../../domain/features/recipes/interfaces';
import { UseCase } from '../../../../common/interfaces';
import { RecipeFullDTO } from '../../dto';

export interface GetRecipesResponse {
  data: RecipeFullDTO[];
}

export class GetAllRecipesUseCase implements UseCase<void, GetRecipesResponse> {
  constructor(private readonly recipeRepo: RecipeRepository) {}

  async execute(): Promise<GetRecipesResponse> {
    const res: RecipeFullDTO[] = await this.recipeRepo.findAll();
    return { data: res };
  }
}
