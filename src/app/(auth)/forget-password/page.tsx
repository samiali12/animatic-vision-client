"use client";

import Logo from "@/components/Logo/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

type FormInputs = {
  email: string;
};

export default function ForgetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);
    try {
      const { status } = await axios.post(
        "http://localhost:8000/auth/forgot-password",
        { email: data.email },
        { withCredentials: true }
      );

      if (status === 200) {
        toast.success("Password reset link sent to your email");
        setIsSubmitted(true);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const msg =
        err?.response?.data?.detail ||
        "Failed to send reset link. Please try again.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="background flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Card */}
      <div className="w-full max-w-lg rounded-xl bg-card p-6 shadow-xl ring-1 ring-primary/20 sm:p-8">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Logo size={72} />
        </div>

        {/* ── SUCCESS STATE ── */}
        {isSubmitted ? (
          <div className="text-center space-y-5">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-foreground">
              Password Reset Email Sent
            </h1>

            <p className="text-sm text-muted-foreground">
              We’ve sent instructions to reset your password. Check your inbox
              and follow the link.
            </p>

            <Button
              asChild
              className="w-full h-11 rounded-md bg-primary font-semibold text-primary-foreground shadow-md transition-all hover:bg-secondary hover:shadow-lg"
            >
              <Link href="/login">Return to Login</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* ── FORM STATE ── */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-primary">
                Forgot Password
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter your email to receive a password reset link
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="mt-6 space-y-5"
            >
              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </Label>

                <div className="mt-1.5 rounded-md bg-gradient-to-r from-primary to-secondary p-[1px]">
                  <Input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                        message: "Enter a valid email address",
                      },
                    })}
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    disabled={isLoading}
                    className="h-11 rounded-md bg-background px-3 text-base transition-all focus:outline-none"
                  />
                </div>

                {errors.email && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.email.message}
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
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>

            {/* Login link */}
            <p className="mt-5 text-center text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}