import { Router } from 'express';
import {
  createRecipeController,
  deleteRecipeController,
  getAllRecipesController,
  getRecipeByIdController,
  updateRecipeController,
} from '../controllers';
import { authMiddleware } from '../middlewares/auth.middleware';

const recipesRouter = Router();

recipesRouter.use(authMiddleware());

recipesRouter.get('/', getAllRecipesController);
recipesRouter.get('/:id', getRecipeByIdController);
recipesRouter.post('/', createRecipeController);
recipesRouter.put('/:id', updateRecipeController);
recipesRouter.delete('/:id', deleteRecipeController);

export default recipesRouter;
