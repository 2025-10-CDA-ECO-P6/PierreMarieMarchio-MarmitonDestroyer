import { randomUUID } from "node:crypto";
import { Ingredient } from "../../../../../domain/features/recipes/entities";
import { IngredientRepository } from "../../../../../domain/features/recipes/interfaces";
import { ValidationError } from "../../../../common/exeptions";
import { UseCase } from "../../../../common/interfaces";
import { IngredientDTO, IngredientFullDTO } from "../../dto";


export interface CreateIngredientResponse {
  data: IngredientFullDTO;
}

export class CreateIngredientUseCase
  implements UseCase<IngredientDTO, CreateIngredientResponse>
{
  constructor(private readonly ingredientRepo: IngredientRepository) {}

  async execute(request: IngredientDTO): Promise<CreateIngredientResponse> {
    if (!request.name) throw new ValidationError('Ingredient name is required');

    const ingredient = new Ingredient(randomUUID(), request.name);
    await this.ingredientRepo.add(ingredient);

    const response: IngredientFullDTO = {
      id: ingredient.id,
      name: ingredient.name,
    };
    return { data: response };
  }
}
