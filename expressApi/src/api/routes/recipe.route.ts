import { Router } from 'express';
import {
  addIngredientToRecipeController,
  createRecipeController,
  deleteRecipeController,
  getAllRecipesController,
  getRecipeByIdController,
  removeIngredientFromRecipeController,
  updateRecipeController,
} from '../controllers';
import { authentication } from '../common/middlewares/authentication.middleware';

const recipesRouter = Router();

// Disabled for rendre test
// recipesRouter.use(authMiddleware());

recipesRouter.get('/', getAllRecipesController);
recipesRouter.get('/:id', getRecipeByIdController);
recipesRouter.post('/', createRecipeController);
recipesRouter.put('/:id', updateRecipeController);
recipesRouter.delete('/:id', deleteRecipeController);

recipesRouter.post(
  '/:recipeId/ingredients/:ingredientId',
  addIngredientToRecipeController,
);
recipesRouter.delete(
  '/:recipeId/ingredients/:ingredientId',
  removeIngredientFromRecipeController,
);

export default recipesRouter;
