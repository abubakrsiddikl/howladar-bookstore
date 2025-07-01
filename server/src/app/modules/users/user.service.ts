import bcrypt from "bcrypt";
import { omit } from "lodash";
import { User } from "./../auth/user.model";
import { IUser } from "../auth/user.interface";

export const UserService = {
  getUserById: async (id: string) => {
    return User.findById(id).select("-password");
  },
  updateUserProfile: async (id: string, payload: Partial<IUser>) => {
    // disallowed field
    const safePayload = omit(payload, ["role", "_id", "createdAt"]);
    // check update email duplicate
    if (safePayload.email) {
      const existing = await User.findOne({
        email: safePayload.email,
        _id: { $ne: id },
      });
      if (existing) {
        throw new Error("Email already in use");
      }
    }
    if (safePayload.password) {
      safePayload.password = await bcrypt.hash(safePayload.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(id, safePayload, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  },
  getAllUsers: async (id: string, search?: string) => {
    const filter = { _id: { $ne: id } }; // নিজের ID বাদ দিয়ে

    let query: Record<string, unknown> = { ...filter };

    if (search) {
      const regex = new RegExp(search, "i");

      query = {
        ...filter,
        $or: [
          { name: { $regex: regex } },
          { email: { $regex: regex } },
          { phone: { $regex: regex } },
        ],
      };
    }

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .select("-password");

    return users;
  },
  // ! get user stats
  getUserStats: async () => {
    const totalUsers = await User.countDocuments();

    return {
      totalUsers,
    };
  },
  promoteUserRole: async (id: string, newRole: string) => {
    return User.findByIdAndUpdate(id, { role: newRole }, { new: true }).select(
      "-password"
    );
  },
};
