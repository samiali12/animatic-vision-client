"use client";

import Logo from "@/components/Logo/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import AnimatedBackground from "@/components/Animations/AnimatedBackground";

type FormInputs = {
  newPassword: string;
  confirmNewPassword: string;
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    mode: "onBlur",
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const newPassword = watch("newPassword");

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        { token, newPassword: data.newPassword },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success("Password reset successfully");
        router.replace("/login");
      }
    } catch (err) {
      const msg =
        err instanceof AxiosError && err.response?.data?.detail
          ? err.response.data.detail
          : "Failed to reset password. Please try again.";
      toast.error(msg);
    }
  };

  return (
    <AnimatedBackground>
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Card */}
        <div className="w-full max-w-sm rounded-xl bg-card/95 backdrop-blur-sm p-6 shadow-xl ring-1 ring-primary/20 sm:p-8">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Logo size={72} />
        </div>

        {/* Title */}
        <h2 className="mb-2 text-center text-2xl font-bold text-primary">
          Reset Password
        </h2>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          Enter a strong new password below
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {/* New Password */}
          <div>
            <Label htmlFor="newPassword" className="text-sm font-medium text-foreground">
              New Password
            </Label>

            <div className="mt-1.5 rounded-md bg-gradient-to-r from-primary to-secondary p-[1px]">
              <Input
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Must contain uppercase, lowercase, number & special character",
                  },
                })}
                id="newPassword"
                type="password"
                placeholder="••••••••"
                disabled={isSubmitting}
                className="h-11 rounded-md bg-background px-3 text-base transition-all focus:outline-none"
              />
            </div>

            {errors.newPassword && (
              <p className="mt-1 text-xs text-destructive">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmNewPassword" className="text-sm font-medium text-foreground">
              Confirm New Password
            </Label>

            <div className="mt-1.5 rounded-md bg-gradient-to-r from-primary to-secondary p-[1px]">
              <Input
                {...register("confirmNewPassword", {
                  required: "Please confirm your new password",
                  validate: (v) =>
                    v === newPassword || "Passwords do not match",
                })}
                id="confirmNewPassword"
                type="password"
                placeholder="••••••••"
                disabled={isSubmitting}
                className="h-11 rounded-md bg-background px-3 text-base transition-all focus:outline-none"
              />
            </div>

            {errors.confirmNewPassword && (
              <p className="mt-1 text-xs text-destructive">
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 rounded-md bg-primary font-semibold text-primary-foreground shadow-md transition-all hover:bg-secondary hover:shadow-lg disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Resetting…
              </span>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>

        {/* Back to login */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Remembered it?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Login
          </Link>
        </p>
        </div>
      </div>
    </AnimatedBackground>
  );
}