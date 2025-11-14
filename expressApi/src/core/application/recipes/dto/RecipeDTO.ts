import { IngredientFullDTO } from './IngredientDTO';

export interface RecipeDTO {
  documentId?: string;
  Title: string;
  preparation_time: number;
  dificulty: number;
  budget: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date | null;
  ingredients?: IngredientFullDTO[];
}

export interface RecipeFullDTO extends RecipeDTO {
  id: string;
}