import { validateRequest } from "./../../middlewares/validateRequest";
import express from "express";
import { signupSchema } from "./auth.validation";
import { AuthController } from "./auth.controller";
import { authenticate } from "./auth.middleware";

const router = express.Router();

// create user
router.post(
  "/register",
  validateRequest(signupSchema),
  AuthController.registerUser
);
// login user
router.post("/login", AuthController.loginUser);

// google login

router.post("/google-login", AuthController.googleLogin);

// logOut user
router.post("/logout", AuthController.logoutUser);

// get current user
router.get("/me", authenticate, AuthController.getCurrentUser);
export const AuthRoutes = router;
