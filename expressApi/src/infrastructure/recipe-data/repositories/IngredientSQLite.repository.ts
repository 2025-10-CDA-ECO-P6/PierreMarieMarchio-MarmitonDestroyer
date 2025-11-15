import { DocumentIdRepository } from '../../../core/domain/common/bases';
import { QueryContext } from '../../../core/domain/common/interfaces';
import { PaginatedResult } from '../../../core/domain/common/interfaces/contracts/pagination-result';
import { Ingredient } from '../../../core/domain/recipes/entities';
import {
  IngredientRepository,
  RecipeIngredientRepository,
} from '../../../core/domain/recipes/interfaces';
import { DbContext } from '../../../shared/migration-system/DbContext';
import {
  BaseSQLiteRepository,
  DocumentIdSQLiteRepository,
} from '../../common/bases';

export class IngredientSQLiteRepository
  extends BaseSQLiteRepository<Ingredient>
  implements IngredientRepository
{
  protected tableName = 'ingredients';

  private documentIdRepo: DocumentIdRepository<Ingredient>;
  private recipeIngredientRepo: RecipeIngredientRepository;

  constructor(
    context: DbContext,
    recipeIngredientRepo: RecipeIngredientRepository,
  ) {
    super(context);

    this.documentIdRepo = new DocumentIdSQLiteRepository<Ingredient>(
      context,
      this.tableName,
      this.mapRowToEntity.bind(this),
    );

    this.recipeIngredientRepo = recipeIngredientRepo;
  }

  protected mapRowToEntity(row: any): Ingredient {
    return new Ingredient(
      row.id,
      row.documentId,
      row.name,
      new Date(row.createdAt),
      new Date(row.updatedAt),
    );
  }

  async findWithRecipes(
    id: string,
    ctx: QueryContext,
  ): Promise<Ingredient | null> {
    const ingredient = await this.findById(id, ctx.getPopulate() ?? undefined);
    if (!ingredient) return null;

    if (ctx.getPopulate()) {
      const recipes = await this.recipeIngredientRepo.getRecipesByIngredient(
        id,
        ctx,
      );
      ingredient.recipies = recipes.items;
    }

    return ingredient;
  }

  findByDocumentId(
    documentId: string,
    populate?: boolean,
  ): Promise<Ingredient | null> {
    return this.documentIdRepo.findByDocumentId(documentId, populate);
  }

  findAllByDocumentIds(
    documentIds: string[],
    ctx: QueryContext,
  ): Promise<PaginatedResult<Ingredient>> {
    return this.documentIdRepo.findAllByDocumentIds(documentIds, ctx);
  }
}
