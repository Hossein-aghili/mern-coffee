import express from "express";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../Controllers/blog.controller.js";
import { isAdmin } from "./../Middlewares/isAdmin.middlewares.js";
const blogRouter = express.Router();
blogRouter.route("/").post(isAdmin, create).get(getAll);
blogRouter
  .route("/:id")
  .get(getOne)
  .patch(isAdmin, update)
  .delete(isAdmin, remove);
export default blogRouter;
