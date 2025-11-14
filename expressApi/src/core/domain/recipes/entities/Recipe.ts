import { DocumentEntity } from '../../common/bases';
import { Ingredient } from './Ingredient';

export class Recipe extends DocumentEntity {
  title: string;
  preparationTime: number;
  difficulty: number;
  budget: number;
  description: string;
  publishedAt: Date | null;
  ingredients?: Ingredient[];

  constructor(
    id: string,
    documentId: string,
    title: string,
    preparationTime: number,
    difficulty: number,
    budget: number,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date | null,
    ingredients?: Ingredient[],
  ) {
    super(id, documentId, createdAt, updatedAt);
    this.title = title;
    this.preparationTime = preparationTime;
    this.difficulty = difficulty;
    this.budget = budget;
    this.description = description;
    this.publishedAt = publishedAt;
    this.ingredients = ingredients;
  }
}
