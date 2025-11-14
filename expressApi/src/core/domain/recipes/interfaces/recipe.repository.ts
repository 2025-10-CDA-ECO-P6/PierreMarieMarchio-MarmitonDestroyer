import { BaseRepository, DocumentIdRepository } from '../../common/bases';
import { Recipe } from '../entities/Recipe';

export interface RecipeRepository
  extends BaseRepository<Recipe>,
    DocumentIdRepository<Recipe> {
  findWithIngredients(id: string): Promise<Recipe | null>;
}
