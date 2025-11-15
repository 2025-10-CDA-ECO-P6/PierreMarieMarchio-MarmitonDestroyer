import { Ingredient } from '../../../../domain/recipes/entities';
import { IngredientRepository } from '../../../../domain/recipes/interfaces';
import { NotFoundError, ValidationError } from '../../../common/exceptions';
import { UseCase } from '../../../common/interfaces';
import { IngredientDTO, IngredientFullDTO } from '../../dto';

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
    const existing = await this.ingredientRepo.findByDocumentId(id);
    if (!existing) throw new NotFoundError('Ingredient not found');

    if (data.name === '') {
      throw new ValidationError('Ingredient name cannot be empty');
    }

    const updated = new Ingredient(
      existing.id,
      existing.documentId,
      data.name ?? existing.name,
      existing.createdAt,
      new Date(),
    );

    await this.ingredientRepo.update(updated);

    const dto: IngredientFullDTO = {
      id: updated.id,
      documentId: updated.documentId,
      name: updated.name,
    };

    return { data: dto };
  }
}
