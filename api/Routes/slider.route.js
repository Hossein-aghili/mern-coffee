import express from "express";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../Controllers/slider.controller.js";
import { isAdmin } from "./../Middlewares/isAdmin.middlewares.js";
const sliderRouter = express.Router();
sliderRouter.route("/").post(isAdmin, create).get(getAll);
sliderRouter
  .route("/:id")
  .get(getOne)
  .patch(isAdmin, update)
  .delete(isAdmin, remove);
export default sliderRouter;
