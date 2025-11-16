import { IngredientFullDTO } from './IngredientDTO';

export interface RecipeDTO {
  documentId?: string;
  title: string;
  preparationTime: number;
  difficulty: number;
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
