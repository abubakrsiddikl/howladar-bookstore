import type { Request, Response } from "express";
import { UserService } from "./user.service";

export const UserController = {
  // !get user profile
  getUserProfile: async (req: Request, res: Response) => {
    try {
      const user = await UserService.getUserById(req.user!.userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json({ success: true, user });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
  //   ! updater user info
  updateUserProfile: async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const updatedUser = await UserService.updateUserProfile(userId, req.body);

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },
  //   ! get all user
  getAllUser: async (req: Request, res: Response) => {
    const { search } = req.query;
    const currentUserId = req.user?.userId;
    if (!currentUserId) {
      res.json({ success: false, message: "unauthorized access" });
    }
    try {
      const users = await UserService.getAllUsers(
        currentUserId as string,
        search as string
      );
      res.json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
  //  ! get user stats
  getUserStats: async (req: Request, res: Response) => {
    try {
      const stats = await UserService.getUserStats();

      res.status(200).json({
        success: true,
        message: "User stats fetched successfully",
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch user stats",
        error,
      });
    }
  },

  //   ! promote user role
  promoteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const allowedRoles = ["admin", "store-manager", "customer"];

      if (!allowedRoles.includes(role)) {
        res.status(400).json({ message: "Invalid role specified." });
        return;
      }

      if (req.user?.userId === id) {
        res.status(403).json({ message: "You cannot change your own role." });
        return;
      }

      const updatedUser = await UserService.promoteUserRole(id, role);
      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json({
        success: true,
        message: "Role promote successfull",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
};
