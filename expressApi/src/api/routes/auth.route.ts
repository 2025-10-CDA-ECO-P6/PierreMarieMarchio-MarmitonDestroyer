import { Router } from 'express';
import { loginController, registerController } from '../controllers';
import { guestOnlyMiddleware } from '../middlewares/guestOnly.middleware';

const authRouter = Router();

authRouter.post('/local', guestOnlyMiddleware(), loginController);
authRouter.post('/local/register', guestOnlyMiddleware(), registerController);

export default authRouter;
