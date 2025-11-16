import { QueryContext } from '../../../../domain/common/interfaces';
import { Ingredient, Recipe } from '../../../../domain/recipes/entities';
import { IngredientRepository } from '../../../../domain/recipes/interfaces';
import { NotFoundError } from '../../../common/exceptions';
import { UseCase } from '../../../common/interfaces';
import { IngredientFullDTO, RecipeFullDTO } from '../../dto';

export interface GetIngredientByIdResponse {
  data: IngredientFullDTO | null;
  meta: {};
}

export class GetIngredientByIdUseCase
  implements
    UseCase<{ id: string; ctx: QueryContext }, GetIngredientByIdResponse>
{
  constructor(private readonly ingredientRepo: IngredientRepository) {}

  async execute(input: {
    id: string;
    ctx: QueryContext;
  }): Promise<GetIngredientByIdResponse> {
    const populate = input.ctx.getPopulate() ?? false;

    const ingredient = populate
      ? await this.ingredientRepo.findWithRecipes(input.id, input.ctx)
      : await this.ingredientRepo.findByDocumentId(input.id);

    if (!ingredient) throw new NotFoundError('Ingredient not found');

    return {
      data: this.toDTO(ingredient, populate),
      meta: {},
    };
  }

  private toDTO(ingredient: Ingredient, populate: boolean): IngredientFullDTO {
    return {
      id: ingredient.id,
      documentId: ingredient.documentId,
      name: ingredient.name,
      recipies: populate
        ? (ingredient.recipies?.map((r) => this.toRecipeDTO(r)) ?? [])
        : undefined,
    };
  }

  private toRecipeDTO(recipe: Recipe): RecipeFullDTO {
    return {
      id: recipe.id,
      documentId: recipe.documentId,
      title: recipe.title,
      preparationTime: recipe.preparationTime,
      difficulty: recipe.difficulty,
      budget: recipe.budget,
      description: recipe.description,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
      publishedAt: recipe.publishedAt,
    };
  }
}
