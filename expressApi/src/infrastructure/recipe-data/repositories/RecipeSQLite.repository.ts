import { DocumentIdRepository } from '../../../core/domain/common/bases';
import { QueryContext } from '../../../core/domain/common/interfaces';
import { PaginatedResult } from '../../../core/domain/common/interfaces/contracts/pagination-result';
import { Recipe } from '../../../core/domain/recipes/entities';
import {
  RecipeIngredientRepository,
  RecipeRepository,
} from '../../../core/domain/recipes/interfaces';
import { DbContext } from '../../../shared/migration-system/DbContext';
import {
  BaseSQLiteRepository,
  DocumentIdSQLiteRepository,
} from '../../common/bases';

export class RecipeSQLiteRepository
  extends BaseSQLiteRepository<Recipe>
  implements RecipeRepository
{
  protected tableName = 'recipes';

  private documentIdRepo: DocumentIdRepository<Recipe>;
  private recipeIngredientRepo: RecipeIngredientRepository;

  constructor(
    context: DbContext,
    recipeIngredientRepo: RecipeIngredientRepository,
  ) {
    super(context);

    this.documentIdRepo = new DocumentIdSQLiteRepository<Recipe>(
      context,
      this.tableName,
      this.mapRowToEntity.bind(this),
    );

    this.recipeIngredientRepo = recipeIngredientRepo;
  }

  protected mapRowToEntity(row: any): Recipe {
    return new Recipe(
      row.id,
      row.documentId,
      row.title,
      row.preparationTime,
      row.difficulty,
      row.budget,
      row.description,
      new Date(row.createdAt),
      new Date(row.updatedAt),
      row.publishedAt ? new Date(row.publishedAt) : null,
    );
  }

  async findWithIngredients(
    id: string,
    ctx: QueryContext,
  ): Promise<Recipe | null> {
    const recipe = await this.findById(id);
    if (!recipe) return null;

    if (ctx.getPopulate()) {
      const ingredients =
        await this.recipeIngredientRepo.getIngredientsByRecipe(id, ctx);
      recipe.ingredients = ingredients.items;
    }

    return recipe;
  }

  findByDocumentId(
    documentId: string,
    populate?: boolean,
  ): Promise<Recipe | null> {
    return this.documentIdRepo.findByDocumentId(documentId, populate);
  }

  findAllByDocumentIds(
    documentIds: string[],
    ctx: QueryContext,
  ): Promise<PaginatedResult<Recipe>> {
    return this.documentIdRepo.findAllByDocumentIds(documentIds, ctx);
  }
}
