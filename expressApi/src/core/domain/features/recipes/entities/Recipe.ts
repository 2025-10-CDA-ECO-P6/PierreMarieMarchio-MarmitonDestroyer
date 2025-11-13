import { Ingredient } from './Ingredient';

export class Recipe {
  id: string;
  Title: string;
  preparation_time: number;
  dificulty: number;
  budget: number;
  description: string;
  createdAt: Date;
  ingredients?: Ingredient[];

  constructor(
    id: string,
    Title: string,
    preparation_time: number,
    dificulty: number,
    budget: number,
    description: string,
    createdAt: Date = new Date(),
    ingredients?: Ingredient[],
  ) {
    this.id = id;
    this.Title = Title;
    this.preparation_time = preparation_time;
    this.dificulty = dificulty;
    this.budget = budget;
    this.description = description;
    this.createdAt = createdAt;
    this.ingredients = ingredients;
  }
}
