import { Database } from 'sqlite';
import {
  RecipeFilters,
  RecipeRepository,
} from '../../../core/domain/recipes/interfaces';
import { Ingredient, Recipe } from '../../../core/domain/recipes/entities';
import { RecipeDbContext } from '../persistence/contexts/RecipeDbContext';
import { MetaInput } from '../../../core/domain/common/interfaces';

export class RecipeSQLiteRepository implements RecipeRepository {
  constructor(private readonly context: RecipeDbContext) {}

  private get db(): Database {
    return this.context.getDb();
  }

  async create(recipe: Recipe): Promise<void> {
    await this.db.run(
      `INSERT INTO recipes (id, documentId, Title, preparation_time, dificulty, budget, description, createdAt, updatedAt, publishedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      recipe.id,
      recipe.documentId,
      recipe.Title,
      recipe.preparation_time,
      recipe.dificulty,
      recipe.budget,
      recipe.description,
      recipe.createdAt.toISOString(),
      recipe.updatedAt.toISOString(),
      recipe.publishedAt?.toISOString() ?? null,
    );
  }

  async findById(documentId: string): Promise<Recipe | null> {
    const row = await this.db.get(
      `SELECT * FROM recipes WHERE documentId = ?`,
      documentId,
    );

    if (!row) return null;

    return new Recipe(
      row.id,
      row.documentId,
      row.Title,
      row.preparation_time,
      row.dificulty,
      row.budget,
      row.description,
      new Date(row.createdAt),
      new Date(row.updatedAt),
      row.publishedAt ? new Date(row.publishedAt) : null,
    );
  }

  async findByDocumentId(
    documentId: string,
    populate = false,
  ): Promise<Recipe | null> {
    const row = await this.db.get(
      `SELECT * FROM recipes WHERE documentId = ?`,
      documentId,
    );

    if (!row) return null;

    const recipe = new Recipe(
      row.id,
      row.documentId,
      row.Title,
      row.preparation_time,
      row.dificulty,
      row.budget,
      row.description,
      new Date(row.createdAt),
      new Date(row.updatedAt),
      row.publishedAt ? new Date(row.publishedAt) : null,
    );

    if (!populate) return recipe;
    return this.populateRecipe(recipe);
  }

  async update(recipe: Recipe): Promise<void> {
    await this.db.run(
      `UPDATE recipes
       SET Title=?, preparation_time=?, dificulty=?, budget=?, description=?, updatedAt=?
       WHERE documentId=?`,
      recipe.Title,
      recipe.preparation_time,
      recipe.dificulty,
      recipe.budget,
      recipe.description,
      recipe.updatedAt.toISOString(),
      recipe.documentId,
    );
  }

  async delete(documentId: string): Promise<void> {
    await this.db.run(`DELETE FROM recipes WHERE documentId = ?`, documentId);
  }

  async findWithIngredients(documentId: string): Promise<Recipe | null> {
    const recipe = await this.findByDocumentId(documentId, false);
    if (!recipe) return null;

    return this.populateRecipe(recipe);
  }

  async findAll(filters?: RecipeFilters): Promise<Recipe[]> {
    const conditions: string[] = [];
    const params: any[] = [];

    if (filters?.afterDate) {
      conditions.push(`createdAt > ?`);
      params.push(filters.afterDate.toISOString());
    }
    if (filters?.titleContains) {
      conditions.push(`Title LIKE ?`);
      params.push(`%${filters.titleContains}%`);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(' AND ')}`
      : '';

    const rows = await this.db.all(
      `SELECT * FROM recipes ${whereClause}`,
      params,
    );

    return rows.map(
      (row: any) =>
        new Recipe(
          row.id,
          row.documentId,
          row.Title,
          row.preparation_time,
          row.dificulty,
          row.budget,
          row.description,
          new Date(row.createdAt),
          new Date(row.updatedAt),
          row.publishedAt ? new Date(row.publishedAt) : null,
        ),
    );
  }

  async findAllWithMeta(
    input: MetaInput,
  ): Promise<{ items: Recipe[]; total: number }> {
    const conditions = [];
    const params = [];

    if (input.filters?.titleContains) {
      conditions.push(`Title LIKE ?`);
      params.push(`%${input.filters.titleContains}%`);
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const totalRow = await this.db.get(
      `SELECT COUNT(*) as total FROM recipes ${where}`,
      params,
    );

    const orderBy = input.sort
      ? `ORDER BY ${input.sort.field} ${input.sort.order}`
      : '';

    const rows = await this.db.all(
      `
      SELECT * FROM recipes
      ${where}
      ${orderBy}
      LIMIT ? OFFSET ?
    `,
      ...params,
      input.limit,
      input.offset,
    );

    let items = rows.map(
      (row) =>
        new Recipe(
          row.id,
          row.documentId,
          row.Title,
          row.preparation_time,
          row.dificulty,
          row.budget,
          row.description,
          new Date(row.createdAt),
          new Date(row.updatedAt),
          row.publishedAt ? new Date(row.publishedAt) : null,
        ),
    );

    if (input.populate === true) {
      items = await Promise.all(items.map((r) => this.populateRecipe(r)));
    }

    return { items, total: totalRow.total };
  }

  private async populateRecipe(recipe: Recipe): Promise<Recipe> {
    const rows = await this.db.all(
      `SELECT i.id, i.name
       FROM ingredients i
       INNER JOIN recipe_ingredients ri ON ri.ingredient_id = i.id
       WHERE ri.recipe_id = ?`,
      recipe.id,
    );

    recipe.ingredients = rows.map((r: any) => new Ingredient(r.id, r.name));
    return recipe;
  }
}
