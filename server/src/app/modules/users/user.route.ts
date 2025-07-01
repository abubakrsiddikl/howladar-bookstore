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

//  get user stats
router.get(
  "/stats",
  authenticate,
  authorize("admin"),
  UserController.getUserStats
);
// promote user role only admin
router.patch(
  "/:id/role",
  authenticate,
  authorize("admin"),
  UserController.promoteUser
);
export const UserRoutes = router;
