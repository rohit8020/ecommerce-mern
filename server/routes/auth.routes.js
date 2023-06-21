import express from 'express';
const authRouter = express.Router();
import AuthController from '../controllers/auth.controller.js';

authRouter.post('/signup', AuthController.signUpHandler);

authRouter.post('/login', AuthController.loginHandler);

export default authRouter;