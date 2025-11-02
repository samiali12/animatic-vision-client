"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLoggedInUserMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-toastify";
import Logo from "@/components/Logo/Logo";
import { LoaderCircle } from "lucide-react";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const router = useRouter();

  const [loginUser, { isLoading, isError, error, isSuccess, data }] =
    useLoggedInUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message ?? "Logged in!");
      router.push("/dashboard");
    }
    if (isError && error) {
      const msg =
        "data" in error
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (error.data as any)?.detail ?? "Login failed"
          : "Something went wrong";
      toast.error(msg);
    }
  }, [isSuccess, isError, error, data?.message, router]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (values) => {
    await loginUser(values).unwrap();
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
          Welcome Back
        </h2>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          Log in to start animating your stories
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <Label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email
            </Label>
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
              className="mt-1.5 h-11 rounded-md border-primary/30 bg-background/80 px-3 text-base transition-all focus:border-primary focus:ring-primary/20"
            />
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
            <Input
              {...register("password", { required: "Password is required" })}
              id="password"
              type="password"
              placeholder="••••••••"
              className="mt-1.5 h-11 rounded-md border-primary/30 bg-background/80 px-3 text-base transition-all focus:border-primary focus:ring-primary/20"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Link
              href="/forget-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 rounded-md bg-primary font-semibold text-primary-foreground shadow-md transition-all hover:bg-secondary hover:shadow-lg disabled:opacity-70"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <LoaderCircle className="animate-spin" />
                Logging in…
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        {/* Register link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
