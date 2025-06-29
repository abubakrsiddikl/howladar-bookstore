"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosSecure } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

const loginSchema = z.object({
  email: z.string().email({ message: "Valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const { refetchUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  // Submit Handler
  const onSubmit = async (data: LoginFormInputs) => {
    setServerError("");
    setLoading(true);
    try {
      const res = await axiosSecure.post("/auth/login", data);
      if (res.data?.success) {
        await refetchUser();
        const role = res.data?.user?.role;
        toast.success("You are logged in!");

        // Role-based redirect
        if (role === "admin") {
          router.push("/dashboard/admin");
        } else if (role === "store-manager") {
          router.push("/dashboard/store");
        } else if (role === "customer") {
          router.push("/");
        } else {
          router.push("/");
        }
      }
    } catch (err) {
      setServerError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">🔐 Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className={`w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition ${
              (isSubmitting || loading) && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Server Error */}
          {serverError && (
            <p className="text-center text-red-500 text-sm">{serverError}</p>
          )}
        </form>

        <div className="mt-4">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
}
