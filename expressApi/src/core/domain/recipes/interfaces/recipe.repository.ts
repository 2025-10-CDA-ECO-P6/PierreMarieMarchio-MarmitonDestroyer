import { MetaInput } from '../../common/interfaces';
import { Recipe } from '../entities/Recipe';

export interface RecipeRepository {
  add(recipe: Recipe): Promise<void>;
  findById(id: string): Promise<Recipe | null>;
  findByDocumentId(
    documentId: string,
    populate?: boolean,
  ): Promise<Recipe | null>;
  findAll(filters?: RecipeFilters): Promise<Recipe[]>;
  update(recipe: Recipe): Promise<void>;
  delete(id: string): Promise<void>;
  findWithIngredients(id: string): Promise<Recipe | null>;
  findAllWithMeta(
    input: MetaInput,
  ): Promise<{ items: Recipe[]; total: number }>;
}

export interface RecipeFilters {
  afterDate?: Date;
  titleContains?: string;
}
