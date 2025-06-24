import express from "express";
import { UserController } from "./user.controller";
import { authenticate, authorize } from "../auth/auth.middleware";

const router = express.Router();

// get user profile for login user
router.get("/profile", authenticate, UserController.getUserProfile);
// update user for login user
router.put("/profile", authenticate, UserController.updateUserProfile);

// get all user for only admin
router.get("/", authenticate, authorize("admin"), UserController.getAllUser);
// promote user role only admin
router.patch("/:id/promote", authenticate, authorize("admin"), UserController.promoteUser);
export const UserRoutes = router;
