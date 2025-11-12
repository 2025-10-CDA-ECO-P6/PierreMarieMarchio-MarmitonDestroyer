import { Database } from 'sqlite';
import { Ingredient } from '../../../core/domain/features/recipes/entities';
import { IngredientRepository } from '../../../core/domain/features/recipes/interfaces';
import { RecipeDbContext } from '../persistence/contexts/RecipeDbContext';

export class IngredientSQLiteRepository implements IngredientRepository {
  constructor(private readonly context: RecipeDbContext) {}

  private get db(): Database {
    return this.context.getDb();
  }

  async add(ingredient: Ingredient): Promise<void> {
    await this.db.run(
      `INSERT INTO ingredients (id, name) VALUES (?, ?)`,
      ingredient.id,
      ingredient.name,
    );
  }

  async findById(id: string): Promise<Ingredient | null> {
    const row = await this.db.get(`SELECT * FROM ingredients WHERE id = ?`, id);
    if (!row) return null;
    return new Ingredient(row.id, row.name);
  }

  async findAll(): Promise<Ingredient[]> {
    const rows = await this.db.all(`SELECT * FROM ingredients`);
    return rows.map((row: any) => new Ingredient(row.id, row.name));
  }

  async update(ingredient: Ingredient): Promise<void> {
    await this.db.run(
      `UPDATE ingredients SET name=? WHERE id=?`,
      ingredient.name,
      ingredient.id,
    );
  }

  async delete(id: string): Promise<void> {
    await this.db.run(`DELETE FROM ingredients WHERE id=?`, id);
  }
}
