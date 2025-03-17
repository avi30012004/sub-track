import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const authRouter = Router();

//path: /api/v1/auth/signup(POST)  
authRouter.post('/signup', signup);
//path: /api/v1/auth/login(POST)
authRouter.post('/login', login);
//path: /api/v1/auth/logout(POST)
authRouter.post('/logout', logout);

export default authRouter;