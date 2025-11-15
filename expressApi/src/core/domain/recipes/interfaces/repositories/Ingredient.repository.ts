import { BaseRepository, DocumentIdRepository } from '../../../common/bases';
import { QueryContext } from '../../../common/interfaces';
import { Ingredient } from '../../entities';

export interface IngredientRepository
  extends BaseRepository<Ingredient>,
    DocumentIdRepository<Ingredient> {
  findWithRecipes(
    id: string,
    queryContext: QueryContext,
  ): Promise<Ingredient | null>;
}
