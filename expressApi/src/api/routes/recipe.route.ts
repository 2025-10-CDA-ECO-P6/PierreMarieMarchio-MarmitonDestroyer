import { Router } from 'express';
import {
  createRecipeController,
  deleteRecipeController,
  getAllRecipesController,
  getRecipeByIdController,
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

export default recipesRouter;
