"use client";
import { axiosSecure } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterInput = z.infer<typeof registerSchema>;
export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data: RegisterInput) => {
    try {
      setServerError("");
      console.log(data);
      const res = await axiosSecure.post("/auth/register", data);
      if (res.data.success) {
        toast.success("Your account create successfull");
        router.push("/login");
      }
    } catch (error: any) {
      setServerError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-md mx-auto mt-20 bg-[#33C24D] shadow-md p-6 rounded-md ">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <p className="text-lg font-semibold">Name</p>
            <input
              {...register("name")}
              type="text"
              placeholder="Enter Your Name"
              className="w-full border rounded px-3 py-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <p className="text-lg font-semibold">Email</p>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded px-3 py-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <p className="text-lg font-semibold">Password</p>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter Your Password"
              className="w-full border rounded px-3 py-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {serverError && <p className="text-red-600 text-sm">{serverError}</p>}

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          You have already account?
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
