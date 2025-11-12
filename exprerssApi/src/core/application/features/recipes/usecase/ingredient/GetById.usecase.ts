import { IngredientRepository } from "../../../../../domain/features/recipes/interfaces";
import { NotFoundError } from "../../../../common/exeptions";
import { UseCase } from "../../../../common/interfaces";
import { IngredientFullDTO } from "../../dto";

export interface GetIngredientByIdResponse {
  data: IngredientFullDTO | null;
}

export class GetIngredientByIdUseCase
  implements UseCase<string, GetIngredientByIdResponse>
{
  constructor(private readonly ingredientRepo: IngredientRepository) {}

  async execute(id: string): Promise<GetIngredientByIdResponse> {
    const ingredient = await this.ingredientRepo.findById(id);
    if (!ingredient) throw new NotFoundError('Ingredient not found');
    const dto: IngredientFullDTO = { id: ingredient.id, name: ingredient.name };
    return { data: dto };
  }
}
