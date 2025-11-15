import {
  DocumentEntity,
  DocumentIdRepository,
} from '../../../core/domain/common/bases';
import { QueryContext } from '../../../core/domain/common/interfaces';
import { PaginatedResult } from '../../../core/domain/common/interfaces/contracts/pagination-result';
import { DbContext } from '../../../shared/migration-system/DbContext';

export class DocumentIdSQLiteRepository<T extends DocumentEntity>
  implements DocumentIdRepository<T>
{
  constructor(
    private readonly context: DbContext,
    private readonly tableName: string,
    private readonly mapRowToEntity: (row: any, populate?: boolean) => T,
  ) {}

  private get db() {
    return this.context.getDb();
  }

  async findByDocumentId(
    documentId: string,
    populate?: boolean,
  ): Promise<T | null> {
    const row = await this.db.get(
      `SELECT * FROM ${this.tableName} WHERE documentId = ?`,
      documentId,
    );
    if (!row) return null;
    return this.mapRowToEntity(row, populate ?? undefined);
  }

  async findAllByDocumentIds(
    documentIds: string[],
    ctx: QueryContext,
  ): Promise<PaginatedResult<T>> {
    if (documentIds.length === 0) {
      return { items: [], total: 0, limit: 0, offset: 0 };
    }

    const { limit, offset, filters, sort } = ctx.getOrNull();
    const populate = ctx.getPopulate() ?? undefined;

    const inPlaceholders = documentIds.map(() => '?').join(', ');
    const whereFilters = filters
      ? 'AND ' +
        Object.keys(filters)
          .map((f) => `${f} = ?`)
          .join(' AND ')
      : '';

    const order = sort ? `ORDER BY ${sort.field} ${sort.order}` : '';
    const limitClause = limit ? `LIMIT ${limit}` : '';
    const offsetClause = offset ? `OFFSET ${offset}` : '';

    const filterValues = filters ? Object.values(filters) : [];

    const rows = await this.db.all(
      `SELECT * FROM ${this.tableName}
       WHERE documentId IN (${inPlaceholders})
       ${whereFilters}
       ${order}
       ${limitClause}
       ${offsetClause}`,
      ...documentIds,
      ...filterValues,
    );

    const totalRow = await this.db.get(
      `SELECT COUNT(*) as total FROM ${this.tableName}
       WHERE documentId IN (${inPlaceholders})
       ${whereFilters}`,
      ...documentIds,
      ...filterValues,
    );

    return {
      items: rows.map((r) => this.mapRowToEntity(r, populate)),
      total: totalRow.total,
      limit: limit ?? 0,
      offset: offset ?? 0,
    };
  }
}