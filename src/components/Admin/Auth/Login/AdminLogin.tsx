"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
import Logo from "@/components/Logo/Logo";
import { useLoggedInAdminMutation } from "@/redux/features/admin/adminAuthApi";
import AnimatedBackground from "@/components/Animations/AnimatedBackground";

type LoginFormInputs = {
  email: string;
  password: string;
};

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const router = useRouter();

  const [loginAdmin, { isLoading, isError, error, isSuccess, data }] =
    useLoggedInAdminMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message ?? "Admin logged in!");
      router.push("/admin/dashboard");
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
    await loginAdmin(values).unwrap();
  };

  return (
    <AnimatedBackground>
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-sm rounded-xl bg-card/95 backdrop-blur-sm p-6 shadow-xl ring-1 ring-primary/20 sm:p-8">
        <div className="mb-6 flex justify-center">
          <Logo size={72} />
        </div>
        <h2 className="mb-2 text-center text-2xl font-bold text-primary">
          Admin Sign In
        </h2>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          Access the admin dashboard
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
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
                  message: "Enter a valid email",
                },
              })}
              id="email"
              type="email"
              placeholder="admin@example.com"
              className="mt-1.5 h-11 rounded-md border-primary/30 bg-background/80 px-3 text-base"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>
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
              className="mt-1.5 h-11 rounded-md border-primary/30 bg-background/80 px-3 text-base"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 rounded-md bg-primary font-semibold text-primary-foreground"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <LoaderCircle className="animate-spin" />
                Signing in…
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Need an account?{" "}
          <Link
            href="/admin/register"
            className="font-medium text-primary hover:underline"
          >
            Register as admin
          </Link>
        </p>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default AdminLogin;
