import { Router } from 'express';
import { loginController, registerController } from '../controllers';
import { guestOnly } from '../common/middlewares/guestOnly.middleware';

const authRouter = Router();

// Disabled for rendre test
// authRouter.post('/local', guestOnlyMiddleware(), loginController);
// authRouter.post('/local/register', guestOnlyMiddleware(), registerController);

authRouter.post('/local', loginController);
authRouter.post('/local/register', registerController);

export default authRouter;
