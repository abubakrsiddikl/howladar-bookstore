import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export const AuthController = {
  registerUser: async (req: Request, res: Response) => {
    try {
      const data = await AuthService.registerUser(req.body);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  loginUser: async (req: Request, res: Response) => {
    try {
      console.log("auth controller loginUser", req);
      const { token, user } = await AuthService.loginUser(
        req.body.email,
        req.body.password
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
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
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.json({ success: true, message: "Logged out successfully" });
  },
  googleLogin: async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      console.log("jwt tokne google login", token);
      if (!token) {
        res.status(400).json({ message: "No token provided" });
        return;
      }

      const { token: jwtToken, user } = await AuthService.googleLogin(token);

      res
        .cookie("token", jwtToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({ message: "Login successful", user });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Google login failed" });
    }
  },
};
