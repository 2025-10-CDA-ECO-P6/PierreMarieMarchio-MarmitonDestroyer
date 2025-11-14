import { BaseEntity, BaseRepository } from '../../../core/domain/common/bases';
import { MetaContext } from '../../../core/domain/common/interfaces';
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

  async findById(id: string): Promise<T | null> {
    const row = await this.db.get(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      id,
    );
    if (!row) return null;
    return this.mapRowToEntity(row);
  }

  async findAll(meta?: MetaContext): Promise<{ items: T[]; total: number }> {
    const rows = await this.db.all(`SELECT * FROM ${this.tableName}`);
    return {
      items: rows.map((row: any) => this.mapRowToEntity(row)),
      total: rows.length,
    };
  }

  async update(entity: T): Promise<void> {
    const keys = Object.keys(entity).filter((k) => k !== 'id');
    const setClause = keys.map((k) => `${k} = ?`).join(', ');
    const values = keys.map((k) => {
      const value = (entity as any)[k];
      return value instanceof Date ? value.toISOString() : value;
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

  protected abstract mapRowToEntity(row: any): T;
}
