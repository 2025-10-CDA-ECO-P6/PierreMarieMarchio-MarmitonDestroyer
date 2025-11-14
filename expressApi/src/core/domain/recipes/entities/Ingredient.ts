import { BaseEntity } from "../../common/bases";

export class Ingredient extends BaseEntity {
  name: string;

  constructor(
    id: string,
    documentId: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, documentId, createdAt, updatedAt);
    this.name = name;
  }
}
