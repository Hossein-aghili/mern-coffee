import express from "express";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../Controllers/category.controller.js";
import { isAdmin } from "./../Middlewares/isAdmin.middlewares.js";
const categoryRouter = express.Router();
categoryRouter.route("/").post(isAdmin, create).get(getAll);
categoryRouter
  .route("/:id")
  .get(getOne)
  .patch(isAdmin, update)
  .delete(isAdmin, remove);
export default categoryRouter;
