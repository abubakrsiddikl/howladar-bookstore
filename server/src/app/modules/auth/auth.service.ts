import jwt from "jsonwebtoken";
import { AuthUserPayload, IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import config from "../../../config";
import { verifyGoogleToken } from "../../utils/googleAuth";
import { verifyToken } from "../../utils/verifyToken";
import axios from "axios";

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
  handleGoogleAuth: async (code: string) => {
    // Exchange code for access_token
    const tokenRes = await axios.post(
      `https://oauth2.googleapis.com/token`,
      {
        client_id: config.google_client_id,
        client_secret: config.google_client_secret,
        redirect_uri: config.google_redirect_uri,
        grant_type: "authorization_code",
        code,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const access_token = tokenRes.data.access_token;

    // Get user info
    const { data: userInfo } = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const { email, name } = userInfo;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name,
        role: "customer",
        isGoogleUser: true,
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        email: user.email,
      },
      config.jwt_secret,
      { expiresIn: "7d" }
    );

    return { token, user };
  },
};
