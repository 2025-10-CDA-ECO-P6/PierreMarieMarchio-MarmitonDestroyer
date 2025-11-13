import { Router } from 'express';
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
} from '../controllers';
import { authMiddleware } from '../middlewares/auth.middleware';

const userRouter = Router();

userRouter.use(authMiddleware());

userRouter.get('/', getAllUsersController);
userRouter.get('/:id', getUserByIdController);
userRouter.post('/', createUserController);
userRouter.put('/:id', updateUserController);
userRouter.delete('/:id', deleteUserController);

export default userRouter;
