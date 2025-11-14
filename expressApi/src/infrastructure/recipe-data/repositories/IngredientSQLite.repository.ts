import { DocumentIdRepository } from '../../../core/domain/common/bases';
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

  async findWithRecipes(id: string): Promise<Ingredient | null> {
    const ingredient = await this.findById(id);
    if (!ingredient) return null;

    const recipes = await this.recipeIngredientRepo.getRecipesByIngredient(id);
    ingredient.recipies = recipes;

    return ingredient;
  }

  findByDocumentId(documentId: string): Promise<Ingredient | null> {
    return this.documentIdRepo.findByDocumentId(documentId);
  }

  findAllByDocumentIds(documentIds: string[]): Promise<Ingredient[]> {
    return this.documentIdRepo.findAllByDocumentIds(documentIds);
  }
}
