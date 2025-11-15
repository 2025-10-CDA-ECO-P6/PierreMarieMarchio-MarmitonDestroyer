import { QueryContext } from '../interfaces';
import { PaginatedResult } from '../interfaces/contracts/pagination-result';
import { BaseEntity, DocumentEntity } from './Entity';

export interface BaseRepository<T extends BaseEntity> {
  create(entity: T): Promise<void>;
  findById(Id: string, populate?: boolean): Promise<T | null>;
  findAll(queryContext: QueryContext): Promise<PaginatedResult<T>>;
  update(entity: T): Promise<void>;
  delete(Id: string): Promise<void>;
}

export interface DocumentIdRepository<T extends DocumentEntity> {
  findByDocumentId(documentId: string, populate?: boolean): Promise<T | null>;
  findAllByDocumentIds(
    documentIds: string[],
    queryContext: QueryContext,
  ): Promise<PaginatedResult<T>>;
}

export interface ManyToManyRepository<
  L extends BaseEntity,
  R extends BaseEntity,
> {
  addRelation(leftId: string, rightId: string): Promise<void>;
  removeRelation(leftId: string, rightId: string): Promise<void>;
  getRightByLeft(
    leftId: string,
    queryContext: QueryContext,
  ): Promise<PaginatedResult<R>>;
  getLeftByRight(
    rightId: string,
    queryContext: QueryContext,
  ): Promise<PaginatedResult<L>>;
}
