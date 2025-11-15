import {
  BaseEntity,
  ManyToManyRepository,
} from '../../../core/domain/common/bases';
import { QueryContext } from '../../../core/domain/common/interfaces';
import { PaginatedResult } from '../../../core/domain/common/interfaces/contracts/pagination-result';
import { DbContext } from '../../../shared/migration-system/DbContext';

export abstract class ManyToManySQLiteRepository<
  L extends BaseEntity,
  R extends BaseEntity,
> implements ManyToManyRepository<L, R>
{
  protected abstract tableName: string;
  protected abstract leftTable: string;
  protected abstract rightTable: string;
  protected abstract leftIdColumn: string;
  protected abstract rightIdColumn: string;

  protected abstract mapLeftRow(row: any, populate?: boolean): L;
  protected abstract mapRightRow(row: any, populate?: boolean): R;

  constructor(protected readonly context: DbContext) {}

  protected get db() {
    return this.context.getDb();
  }

  async addRelation(leftId: string, rightId: string): Promise<void> {
    await this.db.run(
      `INSERT INTO ${this.tableName} (${this.leftIdColumn}, ${this.rightIdColumn}) VALUES (?, ?)`,
      leftId,
      rightId,
    );
  }

  async removeRelation(leftId: string, rightId: string): Promise<void> {
    await this.db.run(
      `DELETE FROM ${this.tableName} WHERE ${this.leftIdColumn} = ? AND ${this.rightIdColumn} = ?`,
      leftId,
      rightId,
    );
  }

  async getRightByLeft(
    leftId: string,
    ctx: QueryContext,
  ): Promise<PaginatedResult<R>> {
    const { limit, offset, filters, sort } = ctx.getOrNull();
    const populate = ctx.getPopulate() ?? undefined;

    const whereFilters = filters
      ? 'AND ' +
        Object.keys(filters)
          .map((f) => `r.${f} = ?`)
          .join(' AND ')
      : '';

    const order = sort ? `ORDER BY r.${sort.field} ${sort.order}` : '';
    const limitClause = limit ? `LIMIT ${limit}` : '';
    const offsetClause = offset ? `OFFSET ${offset}` : '';

    const filterValues = filters ? Object.values(filters) : [];

    const rows = await this.db.all(
      `SELECT r.* FROM ${this.rightTable} r
       INNER JOIN ${this.tableName} t ON t.${this.rightIdColumn} = r.id
       WHERE t.${this.leftIdColumn} = ?
       ${whereFilters}
       ${order}
       ${limitClause}
       ${offsetClause}`,
      leftId,
      ...filterValues,
    );

    const totalRow = await this.db.get(
      `SELECT COUNT(*) as total FROM ${this.rightTable} r
       INNER JOIN ${this.tableName} t ON t.${this.rightIdColumn} = r.id
       WHERE t.${this.leftIdColumn} = ?
       ${whereFilters}`,
      leftId,
      ...filterValues,
    );

    return {
      items: rows.map((r) => this.mapRightRow(r, populate)),
      total: totalRow.total,
      limit: limit ?? 0,
      offset: offset ?? 0,
    };
  }

  async getLeftByRight(
    rightId: string,
    ctx: QueryContext,
  ): Promise<PaginatedResult<L>> {
    const { limit, offset, filters, sort } = ctx.getOrNull();
    const populate = ctx.getPopulate() ?? undefined;

    const whereFilters = filters
      ? 'AND ' +
        Object.keys(filters)
          .map((f) => `l.${f} = ?`)
          .join(' AND ')
      : '';

    const order = sort ? `ORDER BY l.${sort.field} ${sort.order}` : '';
    const limitClause = limit ? `LIMIT ${limit}` : '';
    const offsetClause = offset ? `OFFSET ${offset}` : '';

    const filterValues = filters ? Object.values(filters) : [];

    const rows = await this.db.all(
      `SELECT l.* FROM ${this.leftTable} l
       INNER JOIN ${this.tableName} t ON t.${this.leftIdColumn} = l.id
       WHERE t.${this.rightIdColumn} = ?
       ${whereFilters}
       ${order}
       ${limitClause}
       ${offsetClause}`,
      rightId,
      ...filterValues,
    );

    const totalRow = await this.db.get(
      `SELECT COUNT(*) as total FROM ${this.leftTable} l
       INNER JOIN ${this.tableName} t ON t.${this.leftIdColumn} = l.id
       WHERE t.${this.rightIdColumn} = ?
       ${whereFilters}`,
      rightId,
      ...filterValues,
    );

    return {
      items: rows.map((r) => this.mapLeftRow(r, populate)),
      total: totalRow.total,
      limit: limit ?? 0,
      offset: offset ?? 0,
    };
  }
}