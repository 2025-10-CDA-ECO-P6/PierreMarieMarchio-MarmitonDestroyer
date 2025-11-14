import { Ingredient } from "../entities";

export interface IngredientRepository {
  add(ingredient: Ingredient): Promise<void>;
  findById(id: string): Promise<Ingredient | null>;
  findAll(): Promise<Ingredient[]>;
  update(ingredient: Ingredient): Promise<void>;
  delete(id: string): Promise<void>;
}
