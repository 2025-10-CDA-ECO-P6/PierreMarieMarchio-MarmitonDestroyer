import { Router } from 'express';
import { loginController, registerController } from '../controllers';
import { guestOnlyMiddleware } from '../middlewares/guestOnly.middleware';

const authRouter = Router();

authRouter.post('/login', guestOnlyMiddleware(), loginController);
authRouter.post('/register', guestOnlyMiddleware(), registerController);

export default authRouter;
