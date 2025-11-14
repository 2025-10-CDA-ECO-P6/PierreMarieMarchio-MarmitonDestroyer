import { DocumentEntity } from '../../common/bases';
import { Recipe } from './Recipe';

export class Ingredient extends DocumentEntity {
  name: string;
  recipies?: Recipe[];

  constructor(
    id: string,
    documentId: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    recipies?: Recipe[],
  ) {
    super(id, documentId, createdAt, updatedAt);
    this.name = name;
    this.recipies = recipies;
  }
}
