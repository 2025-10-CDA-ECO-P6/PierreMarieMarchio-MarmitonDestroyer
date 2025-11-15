import { BaseEntity, BaseRepository } from '../../../core/domain/common/bases';
import { QueryContext } from '../../../core/domain/common/interfaces';
import { PaginatedResult } from '../../../core/domain/common/interfaces/contracts/pagination-result';
import { DbContext } from '../../../shared/migration-system/DbContext';

export abstract class BaseSQLiteRepository<T extends BaseEntity>
  implements BaseRepository<T>
{
  protected abstract tableName: string;

  constructor(protected readonly context: DbContext) {}

  protected get db() {
    return this.context.getDb();
  }

  async create(entity: T): Promise<void> {
    const keys = Object.keys(entity).join(', ');
    const placeholders = Object.keys(entity)
      .map(() => '?')
      .join(', ');
    const values = Object.values(entity).map((v) =>
      v instanceof Date ? v.toISOString() : v,
    );

    await this.db.run(
      `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders})`,
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

    const where = filters
      ? 'WHERE ' +
        Object.keys(filters)
          .map((k) => `${k} = ?`)
          .join(' AND ')
      : '';

    const order = sort ? `ORDER BY ${sort.field} ${sort.order}` : '';
    const limitClause = limit ? `LIMIT ${limit}` : '';
    const offsetClause = offset ? `OFFSET ${offset}` : '';

    const filterValues = filters ? Object.values(filters) : [];

    const rows = await this.db.all(
      `SELECT * FROM ${this.tableName} ${where} ${order} ${limitClause} ${offsetClause}`,
      ...filterValues,
    );

    const totalRow = await this.db.get(
      `SELECT COUNT(*) as total FROM ${this.tableName} ${where}`,
      ...filterValues,
    );

    return {
      items: rows.map((r) =>
        this.mapRowToEntity(r, ctx.getPopulate() ?? undefined),
      ),
      total: totalRow.total,
      limit: limit ?? 0,
      offset: offset ?? 0,
    };
  }

  async update(entity: T): Promise<void> {
    const keys = Object.keys(entity).filter((k) => k !== 'id');
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
