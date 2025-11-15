import { BaseRepository, DocumentIdRepository } from '../../../common/bases';
import { QueryContext } from '../../../common/interfaces';
import { PaginatedResult } from '../../../common/interfaces/contracts/pagination-result';
import { Ingredient } from '../../entities';

export interface IngredientRepository
  extends BaseRepository<Ingredient>,
    DocumentIdRepository<Ingredient> {
  findWithRecipes(
    id: string,
    queryContext: QueryContext
  ): Promise<PaginatedResult<Ingredient>>;
}
