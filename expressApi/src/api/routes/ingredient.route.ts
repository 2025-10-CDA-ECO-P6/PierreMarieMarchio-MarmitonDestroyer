import { Router } from 'express';
import {
  createIngredientController,
  getAllIngredientsController,
  updateIngredientController,
  deleteIngredientController,
  getIngredientsByRecipeController,
  addIngredientToRecipeController,
  removeIngredientFromRecipeController,
  getIngredientByIdController,
} from '../controllers';
import { authentication } from '../common/middlewares/authentication.middleware';

const ingredientsRouter = Router();

// Disabled for rendre test
// ingredientsRouter.use(authMiddleware());

ingredientsRouter.get('/recipe/:recipeId', getIngredientsByRecipeController);

ingredientsRouter.post('/', createIngredientController);
ingredientsRouter.get('/', getAllIngredientsController);
ingredientsRouter.get('/:id', getIngredientByIdController);
ingredientsRouter.put('/:id', updateIngredientController);
ingredientsRouter.delete('/:id', deleteIngredientController);

ingredientsRouter.post(
  '/recipe/:recipeId/:ingredientId',
  addIngredientToRecipeController,
);
ingredientsRouter.delete(
  '/recipe/:recipeId/:ingredientId',
  removeIngredientFromRecipeController,
);

export default ingredientsRouter;
