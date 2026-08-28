import { Router } from 'express';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidator.js';
import { celebrate } from 'celebrate';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/register', celebrate(registerUserSchema), registerUser);
authRouter.post('/login', celebrate(loginUserSchema), loginUser);
authRouter.post('/refresh', refreshUserSession);

authRouter.post('/logout', logoutUser);

export default authRouter;
