import { BaseRepository, DocumentIdRepository } from '../../common/bases';
import { Ingredient } from '../entities';

export interface IngredientRepository
  extends BaseRepository<Ingredient>,
    DocumentIdRepository<Ingredient> {
  findWithRecipes(id: string): Promise<Ingredient | null>;
}
