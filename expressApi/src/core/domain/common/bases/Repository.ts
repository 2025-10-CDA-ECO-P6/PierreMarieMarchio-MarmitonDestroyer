import { MetaContext } from '../interfaces';
import { BaseEntity } from './Entity';

export interface BaseRepository<T extends BaseEntity> {
  create(entity: T): Promise<void>;
  findById(Id: string, populate?: boolean): Promise<T | null>;
  findAll(meta?: MetaContext): Promise<{ items: T[]; total: number }>;
  update(entity: T): Promise<void>;
  delete(Id: string): Promise<void>;
}

export interface DocumentIdRepository<T extends BaseEntity> {
  findByDocumentId(documentId: string): Promise<T | null>;
  findAllByDocumentIds(documentIds: string[]): Promise<T[]>;
}