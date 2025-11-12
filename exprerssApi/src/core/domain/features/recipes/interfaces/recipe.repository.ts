import { Recipe } from '../entities/Recipe';

export interface RecipeRepository {
  add(recipe: Recipe): Promise<void>;
  findById(id: string): Promise<Recipe | null>;
  findAll(filters?: RecipeFilters): Promise<Recipe[]>;
  update(recipe: Recipe): Promise<void>;
  delete(id: string): Promise<void>;
  findWithIngredients(id: string): Promise<Recipe | null>;
}

export interface RecipeFilters {
  afterDate?: Date;
  titleContains?: string;
}
