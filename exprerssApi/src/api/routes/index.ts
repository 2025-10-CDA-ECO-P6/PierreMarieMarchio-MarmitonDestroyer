import { Router } from 'express';
import authRouter from './auth.route';
import recipesRouter from './recipe.route';
import userRouter from './user.route';

const router = Router();

router.use('/auth', authRouter);
router.use('/recipes', recipesRouter);
router.use('/users', userRouter);

export default router;
