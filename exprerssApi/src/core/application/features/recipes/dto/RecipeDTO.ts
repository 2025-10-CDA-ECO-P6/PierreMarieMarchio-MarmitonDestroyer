export interface RecipeDTO {
  Title: string;
  preparation_time: number;
  dificulty: number;
  budget: number;
  description: string;
}

export interface RecipeFullDTO extends RecipeDTO {
  id: string;
}
