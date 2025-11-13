import { IngredientFullDTO } from "./IngredientDTO";

export interface RecipeDTO {
  Title: string;
  preparation_time: number;
  dificulty: number;
  budget: number;
  description: string;
  createdAt?: Date;
  ingredients?: IngredientFullDTO[];
}

export interface RecipeFullDTO extends RecipeDTO {
  id: string;
}
