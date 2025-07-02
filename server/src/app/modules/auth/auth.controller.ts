import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import config from "../../../config";

export const AuthController = {
  registerUser: async (req: Request, res: Response) => {
    try {
      const data = await AuthService.registerUser(req.body);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  // ! get current user
  getCurrentUser: async (req: Request, res: Response) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      const user = await AuthService.getUserFromToken(token);
      if (!user) {
        res.status(401).json({ success: false, message: "Invalid token" });
        return;
      }

      res.json({ success: true, isLoggedIn: true, user });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  loginUser: async (req: Request, res: Response) => {
    try {
      const { token, user } = await AuthService.loginUser(
        req.body.email,
        req.body.password
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: config.env === "production",
        sameSite: config.env === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ success: true, message: "User login successfull", user });
    } catch (error: any) {
      res.status(401).json({ success: false, message: error.message });
    }
  },
  logoutUser: (req: Request, res: Response) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: config.env === "production",
      sameSite: config.env === "production" ? "none" : "lax",
    });

    res.json({ success: true, message: "Logged out successfully" });
  },
  googleAuthRedirect: (req: Request, res: Response) => {
    const redirectURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.google_client_id}&redirect_uri=${config.google_redirect_uri}&response_type=code&scope=email%20profile;
    res.redirect(redirectURL)`;
  },

  // 🔹  callback handler
  googleCallback: async (req: Request, res: Response) => {
    const code = req.query.code as string;

    const result = await AuthService.handleGoogleAuth(code);

    const { token, ...user } = result;

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: config.env === "production",
        sameSite: config.env === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .redirect(`${config.client_url}/dashboard`);
  },
};
