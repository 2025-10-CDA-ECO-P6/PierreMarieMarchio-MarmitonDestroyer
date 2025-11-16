import { randomUUID } from 'node:crypto';
import { Ingredient } from '../../../../domain/recipes/entities';
import { IngredientRepository } from '../../../../domain/recipes/interfaces';
import { ValidationError } from '../../../common/exceptions';
import { UseCase } from '../../../common/interfaces';
import { IngredientDTO, IngredientFullDTO } from '../../dto';

export interface CreateIngredientResponse {
  data: IngredientFullDTO;
}

export interface CreateIngredientRequest {
  data: IngredientDTO;
}

export class CreateIngredientUseCase
  implements UseCase<CreateIngredientRequest, CreateIngredientResponse>
{
  constructor(private readonly ingredientRepo: IngredientRepository) {}

  async execute(
    request: CreateIngredientRequest,
  ): Promise<CreateIngredientResponse> {
    if (!request.data.name)
      throw new ValidationError('Ingredient name is required');

    const ingredient = new Ingredient(
      randomUUID(),
      request.data.documentId ?? randomUUID(),
      request.data.name,
      new Date(),
      new Date(),
    );

    await this.ingredientRepo.create(ingredient);

    const response: IngredientFullDTO = {
      id: ingredient.id,
      documentId: ingredient.documentId,
      name: ingredient.name,
    };

    return { data: response };
  }
}
