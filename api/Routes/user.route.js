import express from "express";
import { getAll, getOne, update } from "../Controllers/user.controller.js";
import { isAdmin } from './../Middlewares/isAdmin.middlewares.js';
import { isLogin } from './../Middlewares/isLogin.middlewares.js';
const userRouter = express.Router();
userRouter.route("/").get(isAdmin,getAll);
userRouter.route("/:id").get(isAdmin,isLogin,getOne).patch(isAdmin,update);
export default userRouter;
