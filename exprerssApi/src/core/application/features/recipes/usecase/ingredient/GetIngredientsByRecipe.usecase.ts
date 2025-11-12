import { RecipeIngredientRepository } from '../../../../../domain/features/recipes/interfaces';
import { UseCase } from '../../../../common/interfaces';
import { RecipeIngredientsListDTO, IngredientFullDTO } from '../../dto';

export class GetIngredientsByRecipeUseCase
  implements UseCase<string, RecipeIngredientsListDTO>
{
  constructor(private readonly repo: RecipeIngredientRepository) {}

  async execute(recipeId: string): Promise<RecipeIngredientsListDTO> {
    const ingredients = await this.repo.getIngredientsByRecipe(recipeId);
    const data: IngredientFullDTO[] = ingredients.map((i) => ({
      id: i.id,
      name: i.name,
    }));
    return { data };
  }
}
