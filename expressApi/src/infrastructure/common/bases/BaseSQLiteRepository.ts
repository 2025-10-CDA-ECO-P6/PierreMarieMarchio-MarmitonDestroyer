import { BaseEntity, BaseRepository } from '../../../core/domain/common/bases';
import { QueryContext } from '../../../core/domain/common/interfaces';
import { PaginatedResult } from '../../../core/domain/common/interfaces/contracts/pagination-result';
import { DbContext } from '../../../shared/migration-system/DbContext';
import { buildSqlFilter } from '../utils/buildSqlFilter';

export abstract class BaseSQLiteRepository<T extends BaseEntity>
  implements BaseRepository<T>
{
  protected abstract tableName: string;

  constructor(protected readonly context: DbContext) {}

  protected get db() {
    return this.context.getDb();
  }

  protected getInsertableKeys(entity: T): string[] {
    return Object.keys(entity).filter((k) => {
      const value = (entity as any)[k];
      return value !== undefined && value !== null && !Array.isArray(value);
    });
  }

  async create(entity: T): Promise<void> {
    const keys = this.getInsertableKeys(entity);
    const columns = keys.join(', ');
    const placeholders = keys.map(() => '?').join(', ');
    const values = keys.map((k) => {
      const v = (entity as any)[k];
      return v instanceof Date ? v.toISOString() : v;
    });

    await this.db.run(
      `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`,
      ...values,
    );
  }

  async findById(id: string, populate?: boolean): Promise<T | null> {
    const row = await this.db.get(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      id,
    );
    if (!row) return null;
    return this.mapRowToEntity(row, populate);
  }

  async findAll(ctx: QueryContext): Promise<PaginatedResult<T>> {
    const { limit, offset, filters, sort } = ctx.getOrNull();
    const populate = ctx.getPopulate() ?? undefined;

    let where = '';
    const values: any[] = [];

    if (filters) {
      const clauses = [];
      for (const key of Object.keys(filters)) {
        const [field, op] = key.split('__');
        const { sql, value } = buildSqlFilter(field, op, filters[key]);
        clauses.push(sql);
        values.push(value);
      }
      if (clauses.length) where = `WHERE ${clauses.join(' AND ')}`;
    }

    const order = sort ? `ORDER BY ${sort.field} ${sort.order}` : '';
    const limitClause = limit ? `LIMIT ${limit}` : '';
    const offsetClause = offset ? `OFFSET ${offset}` : '';

    const rows = await this.db.all(
      `SELECT * FROM ${this.tableName} ${where} ${order} ${limitClause} ${offsetClause}`,
      ...values,
    );

    const totalRow = await this.db.get(
      `SELECT COUNT(*) as total FROM ${this.tableName} ${where}`,
      ...values,
    );

    return {
      items: rows.map((r) => this.mapRowToEntity(r, populate)),
      total: totalRow.total,
      limit: limit ?? 0,
      offset: offset ?? 0,
    };
  }

  async update(entity: T): Promise<void> {
    const keys = this.getInsertableKeys(entity).filter((k) => k !== 'id');
    const setClause = keys.map((k) => `${k} = ?`).join(', ');
    const values = keys.map((k) => {
      const v = (entity as any)[k];
      return v instanceof Date ? v.toISOString() : v;
    });
    values.push(entity.id);

    await this.db.run(
      `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`,
      ...values,
    );
  }

  async delete(id: string): Promise<void> {
    await this.db.run(`DELETE FROM ${this.tableName} WHERE id = ?`, id);
  }

  protected abstract mapRowToEntity(row: any, populate?: boolean): T;
}
