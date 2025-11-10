import { Recipe } from '../entities/Recipe';

export interface RecipeRepository {
  add(recipe: Recipe): Promise<void>;
  findById(id: string): Promise<Recipe | null>;
  findAll(): Promise<Recipe[]>;
  update(recipe: Recipe): Promise<void>;
  delete(id: string): Promise<void>;
}
