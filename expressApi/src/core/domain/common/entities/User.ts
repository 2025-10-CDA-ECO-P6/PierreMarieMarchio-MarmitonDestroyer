import { BaseEntity } from "../bases";

export class User extends BaseEntity {
  name: string;
  email: string;
  password: string;

  constructor(
    id: string,
    documentId: string,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, documentId, createdAt, updatedAt);
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
