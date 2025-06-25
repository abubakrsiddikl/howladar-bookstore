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
router.get("/google", AuthController.googleAuthRedirect);
router.get("/google/callback", AuthController.googleCallback);

// logOut user
router.post("/logout", AuthController.logoutUser);

// get current user
router.get("/me", authenticate, AuthController.getCurrentUser);
export const AuthRoutes = router;
