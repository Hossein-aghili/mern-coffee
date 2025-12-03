import express from "express";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../Controllers/product.controller.js";
import { isAdmin } from "./../Middlewares/isAdmin.middlewares.js";
const productRouter = express.Router();
productRouter.route("/").post(isAdmin, create).get(getAll);
productRouter
  .route("/:id")
  .get(getOne)
  .patch(isAdmin, update)
  .delete(isAdmin, remove);
export default productRouter;
