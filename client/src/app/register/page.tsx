"use client";
import GoogleLoginButton from "@/components/GoogleLoginButton";
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
      // console.log(data);
      const res = await axiosSecure.post("/auth/register", data);
      if (res.data.success) {
        toast.success("Your account create successfull");
        router.push("/login");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setServerError(error.message || "Something went wrong");
      } else {
        // console.log("Unexpected error", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-2 text-[#FF8600]">
          Register
        </h2>
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
          <p className=" text-sm ">
            আপনার একাউন্ট আছে ?
            <a href="/login" className="ml-2 text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </form>
        <GoogleLoginButton></GoogleLoginButton>
      </div>
    </div>
  );
}
