import { z } from "zod";

export const signupSchema = z.object({
  body: z
    .object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .optional(),
      role: z.enum(["admin", "store-manager", "customer"]).optional(),
      isGoogleUser: z.boolean().optional(),
    })
    .refine(
      (data) => {
        // যদি Google ইউজার না হয়, password অবশ্যই থাকবে
        if (!data.isGoogleUser) {
          return typeof data.password === "string" && data.password.length >= 6;
        }
        return true;
      },
      {
        message:
          "Password is required for non-Google users and must be at least 6 characters",
        path: ["password"],
      }
    ),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password required"),
  }),
});
