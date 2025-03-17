import { Router } from "express";
import { get } from "mongoose";
import { getuser, getusers } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', getusers);
userRouter.get('/:id', authorize, getuser);
userRouter.post('/', (req, res) => {
  res.send({title: 'create User'});
});
userRouter.put('/:id', (req, res) => {
  res.send({title: 'update User'});
});
userRouter.delete('/:id', (req, res) => {
  res.send({title: 'delete User'});
});

export default userRouter;