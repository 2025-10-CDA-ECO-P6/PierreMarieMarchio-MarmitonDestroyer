import { IngredientRepository } from "../../../../domain/recipes/interfaces";
import { NotFoundError, ValidationError } from "../../../common/exeptions";
import { UseCase } from "../../../common/interfaces";
import { IngredientDTO, IngredientFullDTO } from "../../dto";


export interface UpdateIngredientRequest {
  id: string;
  data: Partial<IngredientDTO>;
}

export interface UpdateIngredientResponse {
  data: IngredientFullDTO | null;
}

export class UpdateIngredientUseCase
  implements UseCase<UpdateIngredientRequest, UpdateIngredientResponse>
{
  constructor(private readonly ingredientRepo: IngredientRepository) {}

  async execute({
    id,
    data,
  }: UpdateIngredientRequest): Promise<UpdateIngredientResponse> {
    const existing = await this.ingredientRepo.findById(id);
    if (!existing) throw new NotFoundError('Ingredient not found');

    if (data.name === '')
      throw new ValidationError('Ingredient name cannot be empty');

    const updated = { ...existing, name: data.name ?? existing.name };
    await this.ingredientRepo.update(updated);

    return { data: { id: updated.id, name: updated.name } };
  }
}
