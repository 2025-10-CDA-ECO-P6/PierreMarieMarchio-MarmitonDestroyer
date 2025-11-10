import { Router } from 'express';
import recipesRouter from './recipe.route';

const router = Router();
router.use('/recipes', recipesRouter);

export default router;
