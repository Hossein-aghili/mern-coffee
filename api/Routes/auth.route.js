import express from "express";
import {
  adminLogin,
  auth,
  checkOtp,
  checkPassword,
  forgetPassword,
  resendCode,
} from "../Controllers/auth.controller.js";
const authRouter = express.Router();
authRouter.route("/").post(auth);
authRouter.route("/checkOtp").post(checkOtp);
authRouter.route("/checkPassword").post(checkPassword);
authRouter.route("/forgetPassword").post(forgetPassword);
authRouter.route("/resendCode").post(resendCode);
authRouter.route("/adminLogin").post(adminLogin);
export default authRouter;
