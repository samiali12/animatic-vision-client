"use client";

import Logo from "@/components/Logo/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterUserMutation } from "@/redux/features/auth/authApi";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type RegisterFormInputs = {
  fullName: string;
  email: string;
  password: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const router = useRouter();

  const [userRegistration, { isLoading, isSuccess, data, error, isError }] =
    useRegisterUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message ?? "Account created!");
      router.push("/login"); // or wherever you want after success
    }
    if (isError && error) {
      const msg =
        "data" in error
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (error.data as any)?.detail ?? "Registration failed"
          : "Something went wrong";
      toast.error(msg);
    }
  }, [isSuccess, isError, error, data?.message, router]);

  // ── Form submit ────────────────────────────────────────
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (values) => {
    await userRegistration(values).unwrap();
  };

  return (
    <div className="background flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Card */}
      <div className="w-full max-w-sm rounded-xl bg-card p-6 shadow-xl ring-1 ring-primary/20 sm:p-8">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Logo size={72} />
        </div>

        {/* Title */}
        <h2 className="mb-2 text-center text-2xl font-bold text-primary">
          Create Your Account
        </h2>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          Join Animatic Vision and start animating your stories
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          {/* Full Name */}
          <div>
            <Label
              htmlFor="fullName"
              className="text-sm font-medium text-foreground"
            >
              Full Name
            </Label>
            <div className="mt-1.5 rounded-md bg-gradient-to-r from-primary to-secondary p-[1px]">
              <Input
                {...register("fullName", { required: "Full Name is required" })}
                id="fullName"
                type="text"
                placeholder="John Doe"
                className="h-11 rounded-md bg-background px-3 text-base transition-all focus:outline-none"
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-xs text-destructive">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email
            </Label>
            <div className="mt-1.5 rounded-md bg-gradient-to-r from-primary to-secondary p-[1px]">
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Please enter a valid email",
                  },
                })}
                id="email"
                type="email"
                placeholder="you@example.com"
                className="h-11 rounded-md bg-background px-3 text-base transition-all focus:outline-none"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </Label>
            <div className="mt-1.5 rounded-md bg-linear-to-r from-primary to-secondary p-[1px]">
              <Input
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                    message:
                      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
                  },
                })}
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-11 rounded-md bg-background px-3 text-base transition-all focus:outline-none"
              />
            </div>

            {errors.password && (
              <p className="mt-1 text-xs text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 rounded-md bg-primary font-semibold text-primary-foreground shadow-md transition-all hover:bg-secondary hover:shadow-lg disabled:opacity-70"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <LoaderCircle className="animate-spin" />
                Creating…
              </span>
            ) : (
              "Register"
            )}
          </Button>
        </form>

        {/* Login link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
