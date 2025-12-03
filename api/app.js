import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import sliderRouter from "./Routes/slider.route.js";
import categoryRouter from "./Routes/category.route.js";
import blogRouter from "./Routes/blog.route.js";
import productRouter from "./Routes/product.route.js";
import userRouter from "./Routes/user.route.js";
import authRouter from "./Routes/auth.route.js";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// app.use(express.static("Public"));
app.use("/api/auth", authRouter);
app.use("/api/slider", sliderRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blog", blogRouter);
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);

export default app;
