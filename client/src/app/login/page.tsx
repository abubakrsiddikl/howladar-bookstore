"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosSecure } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email({ message: "Valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setServerError("");
      console.log(data);
      const res = await axiosSecure.post("/auth/login", data);

      if (res.data?.success) {
        const role = res.data?.user?.role;
        toast.success("You are Logged in")
        // role-based redirect
        if (role === "admin") {
          router.push("/dashboard/admin");
        } else if (role === "store-manager") {
          router.push("/dashboard/store");
        } else if (role === "customer") {
          router.push("/");
        } else {
          router.push("/"); // fallback route
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message || "Login failed");
      } else {
        console.log("Unexpected error", err);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">🔐 Login </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="********"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition"
          >
            {isSubmitting ? "প্রসেস হচ্ছে..." : "লগইন"}
          </button>

          {/* Server Error */}
          {serverError && (
            <p className="text-center text-red-500 text-sm">{serverError}</p>
          )}
          <GoogleLoginButton></GoogleLoginButton>
        </form>
      </div>
    </div>
  );
}
