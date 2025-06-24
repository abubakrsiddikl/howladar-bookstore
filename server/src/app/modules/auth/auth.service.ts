import jwt from "jsonwebtoken";
import { AuthUserPayload, IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import config from "../../../config";
import { verifyGoogleToken } from "../../utils/googleAuth";
import { verifyToken } from "../../utils/verifyToken";

export const AuthService = {
  registerUser: async (payload: IUser) => {
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      throw new Error("Email already registered");
    }
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const user = await User.create({ ...payload, password: hashedPassword });
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  },
  // get logged in user
  getUserFromToken: async (token: string) => {
    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) return null;

    const user = await User.findById(decoded.userId).select("-password");
    return user;
  },

  loginUser: async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    // match requested password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    // genarate jwt token
    const token = AuthService.generateToken(user);
    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },
  generateToken: (user: AuthUserPayload) => {
    return jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );
  },
  googleLogin: async (token: string) => {
    // ১. Google token verify করা
    const { email, name, sub } = await verifyGoogleToken(token);
    if (!email || !sub) {
      throw new Error("Invalid Google token");
    }

    //    find user is exists or not
    let user = await User.findOne({ email });
    if (!user) {
      //   create user
      user = await User.create({
        name,
        email,
        googleId: sub,
        role: "customer",
        password: "",
      });
    }
    // genrate jwt token
    const jwtToken = AuthService.generateToken(user);

    return {
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },
};
