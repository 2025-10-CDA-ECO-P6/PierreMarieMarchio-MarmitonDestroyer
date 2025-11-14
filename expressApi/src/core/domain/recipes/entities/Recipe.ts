import { Ingredient } from './Ingredient';

export class Recipe {
  id: string;
  documentId: string;
  Title: string;
  preparation_time: number;
  dificulty: number;
  budget: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  ingredients?: Ingredient[];

  constructor(
    id: string,
    documentId: string,
    Title: string,
    preparation_time: number,
    dificulty: number,
    budget: number,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date | null,
    ingredients?: Ingredient[],
  ) {
    this.id = id;
    this.documentId = documentId;
    this.Title = Title;
    this.preparation_time = preparation_time;
    this.dificulty = dificulty;
    this.budget = budget;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.publishedAt = publishedAt;
    this.ingredients = ingredients;
  }
}