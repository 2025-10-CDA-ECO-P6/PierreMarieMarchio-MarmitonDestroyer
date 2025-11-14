import {
  DocumentEntity,
  DocumentIdRepository,
} from '../../../core/domain/common/bases';
import { DbContext } from '../../../shared/migration-system/DbContext';

export class DocumentIdSQLiteRepository<T extends DocumentEntity>
  implements DocumentIdRepository<T>
{
  constructor(
    private readonly context: DbContext,
    private readonly tableName: string,
    private readonly mapRowToEntity: (row: any) => T,
  ) {}

  private get db() {
    return this.context.getDb();
  }

  async findByDocumentId(documentId: string): Promise<T | null> {
    const row = await this.db.get(
      `SELECT * FROM ${this.tableName} WHERE documentId = ?`,
      documentId,
    );
    if (!row) return null;
    return this.mapRowToEntity(row);
  }

  async findAllByDocumentIds(documentIds: string[]): Promise<T[]> {
    if (documentIds.length === 0) return [];

    const placeholders = documentIds.map(() => '?').join(', ');
    const rows = await this.db.all(
      `SELECT * FROM ${this.tableName} WHERE documentId IN (${placeholders})`,
      ...documentIds,
    );

    return rows.map((row: any) => this.mapRowToEntity(row));
  }
}
