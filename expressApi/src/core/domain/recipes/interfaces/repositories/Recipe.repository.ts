import { BaseRepository, DocumentIdRepository } from '../../../common/bases';
import { QueryContext } from '../../../common/interfaces';
import { PaginatedResult } from '../../../common/interfaces/contracts/pagination-result';
import { Recipe } from '../../entities/Recipe';

export interface RecipeRepository
  extends BaseRepository<Recipe>,
    DocumentIdRepository<Recipe> {
  findWithIngredients(
    id: string,
    queryContext: QueryContext,
  ): Promise<PaginatedResult<Recipe>>;
}
