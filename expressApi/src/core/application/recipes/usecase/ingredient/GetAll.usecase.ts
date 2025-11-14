import { IngredientRepository } from "../../../../domain/recipes/interfaces";
import { UseCase } from "../../../common/interfaces";
import { IngredientFullDTO } from "../../dto";


export interface GetAllIngredientsResponse {
  data: IngredientFullDTO[];
}

export class GetAllIngredientsUseCase
  implements UseCase<void, GetAllIngredientsResponse>
{
  constructor(private readonly ingredientRepo: IngredientRepository) {}

  async execute(): Promise<GetAllIngredientsResponse> {
    const ingredients = await this.ingredientRepo.findAll();
    const data: IngredientFullDTO[] = ingredients.map((i) => ({
      id: i.id,
      name: i.name,
    }));
    return { data };
  }
}
