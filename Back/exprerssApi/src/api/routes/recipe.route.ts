import { Router } from 'express';
import {
  createRecipeController,
  deleteRecipeController,
  getAllRecipesController,
  getRecipeByIdController,
  updateRecipeController,
} from '../controllers';

const router = Router();

router.get('/', getAllRecipesController);
router.get('/:id', getRecipeByIdController);
router.post('/', createRecipeController);
router.put('/:id', updateRecipeController);
router.delete('/:id', deleteRecipeController);
export default router;
