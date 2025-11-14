export abstract class BaseEntity {
  id: string;
  documentId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    documentId: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.documentId = documentId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
