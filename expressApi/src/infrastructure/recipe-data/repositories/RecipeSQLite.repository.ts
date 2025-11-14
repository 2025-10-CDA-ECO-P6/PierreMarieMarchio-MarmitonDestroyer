import { DocumentIdRepository } from '../../../core/domain/common/bases';
import { Recipe } from '../../../core/domain/recipes/entities';
import { RecipeIngredientRepository, RecipeRepository } from '../../../core/domain/recipes/interfaces';
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

  async findWithIngredients(id: string): Promise<Recipe | null> {
    const recipe = await this.findById(id);
    if (!recipe) return null;

    const ingredients =
      await this.recipeIngredientRepo.getIngredientsByRecipe(id);
    recipe.ingredients = ingredients;

    return recipe;
  }

  findByDocumentId(documentId: string): Promise<Recipe | null> {
    return this.documentIdRepo.findByDocumentId(documentId);
  }

  findAllByDocumentIds(documentIds: string[]): Promise<Recipe[]> {
    return this.documentIdRepo.findAllByDocumentIds(documentIds);
  }
}
