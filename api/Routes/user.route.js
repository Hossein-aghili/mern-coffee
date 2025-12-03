import express from "express";
import { getAll, getOne, update } from "../Controllers/user.controller.js";
const userRouter = express.Router();
userRouter.route("/").get(getAll);
userRouter.route("/:id").get(getOne).patch(update);
export default userRouter;
