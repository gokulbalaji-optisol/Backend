import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middleware/auth/checkJwt";
import { validator } from "../utils/validation/validation";

const router = Router();
//Login route
router.post(
  "/login",
  //validator.loginValidation,
  AuthController.login
);

//Signup
router.post("/signup", AuthController.signup);

//forgotpassword
router.post("/forgotpassword", AuthController.forgotpassword);

//resetpassword
router.post("/resetpassword", AuthController.resetpassword);

export default router;
