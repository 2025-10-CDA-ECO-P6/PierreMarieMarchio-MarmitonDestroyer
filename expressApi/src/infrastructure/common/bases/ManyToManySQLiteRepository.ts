import {
  BaseEntity,
  ManyToManyRepository,
} from '../../../core/domain/common/bases';
import { DbContext } from '../../../shared/migration-system/DbContext';

export abstract class ManyToManySQLiteRepository<
  L extends BaseEntity,
  R extends BaseEntity,
> implements ManyToManyRepository<L, R>
{
  protected abstract tableName: string;
  protected abstract mapRightRow(row: any): R;
  protected abstract mapLeftRow(row: any): L;

  constructor(protected readonly context: DbContext) {}

  protected get db() {
    return this.context.getDb();
  }

  async addRelation(leftId: string, rightId: string): Promise<void> {
    await this.db.run(
      `INSERT INTO ${this.tableName} (recipeId, ingredientId) VALUES (?, ?)`,
      leftId,
      rightId,
    );
  }

  async removeRelation(leftId: string, rightId: string): Promise<void> {
    await this.db.run(
      `DELETE FROM ${this.tableName} WHERE recipeId = ? AND ingredientId = ?`,
      leftId,
      rightId,
    );
  }

  async getRightByLeft(leftId: string): Promise<R[]> {
    const rows = await this.db.all(
      `SELECT i.* FROM ingredients i
       INNER JOIN ${this.tableName} ri ON ri.ingredientId = i.id
       WHERE ri.recipeId = ?`,
      leftId,
    );
    return rows.map(this.mapRightRow.bind(this));
  }

  async getLeftByRight(rightId: string): Promise<L[]> {
    const rows = await this.db.all(
      `SELECT r.* FROM recipes r
       INNER JOIN ${this.tableName} ri ON ri.recipeId = r.id
       WHERE ri.ingredientId = ?`,
      rightId,
    );
    return rows.map(this.mapLeftRow.bind(this));
  }
}
