import { BaseRepository, DocumentIdRepository } from '../../../common/bases';
import { QueryContext } from '../../../common/interfaces';
import { Recipe } from '../../entities/Recipe';

export interface RecipeRepository
  extends BaseRepository<Recipe>,
    DocumentIdRepository<Recipe> {
  findWithIngredients(id: string, ctx: QueryContext): Promise<Recipe | null>;
}
