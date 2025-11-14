import { MetaContext } from '../interfaces';
import { BaseEntity, DocumentEntity } from './Entity';

export interface BaseRepository<T extends BaseEntity> {
  create(entity: T): Promise<void>;
  findById(Id: string, populate?: boolean): Promise<T | null>;
  findAll(meta?: MetaContext): Promise<{ items: T[]; total: number }>;
  update(entity: T): Promise<void>;
  delete(Id: string): Promise<void>;
}

export interface DocumentIdRepository<T extends DocumentEntity> {
  findByDocumentId(documentId: string): Promise<T | null>;
  findAllByDocumentIds(documentIds: string[]): Promise<T[]>;
}

export interface ManyToManyRepository<
  L extends BaseEntity,
  R extends BaseEntity,
> {
  addRelation(leftId: string, rightId: string): Promise<void>;
  removeRelation(leftId: string, rightId: string): Promise<void>;
  getRightByLeft(leftId: string): Promise<R[]>;
  getLeftByRight(rightId: string): Promise<L[]>;
}
