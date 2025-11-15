import { Router } from 'express';
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
} from '../controllers';
import { authentication } from '../common/middlewares/authentication.middleware';

const userRouter = Router();

// Disabled for rendre test
// userRouter.use(authMiddleware());

userRouter.get('/', getAllUsersController);
userRouter.get('/:id', getUserByIdController);
userRouter.post('/', createUserController);
userRouter.put('/:id', updateUserController);
userRouter.delete('/:id', deleteUserController);

export default userRouter;
