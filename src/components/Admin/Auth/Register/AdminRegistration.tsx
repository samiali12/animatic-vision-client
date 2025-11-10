"use client";

import Logo from "@/components/Logo/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRegisterAdminMutation } from "@/redux/features/admin/adminAuthApi";
import AnimatedBackground from "@/components/Animations/AnimatedBackground";

type RegisterFormInputs = {
  fullName: string;
  email: string;
  password: string;
};

const AdminRegistration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const router = useRouter();

  const [registerAdmin, { isLoading, isSuccess, data, error, isError }] =
    useRegisterAdminMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message ?? "Admin created!");
      router.push("/admin/(auth)/login");
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

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (values) => {
    await registerAdmin(values).unwrap();
  };

  return (
    <AnimatedBackground>
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-sm rounded-xl bg-card/95 backdrop-blur-sm p-6 shadow-xl ring-1 ring-primary/20 sm:p-8">
        <div className="mb-6 flex justify-center">
          <Logo size={72} />
        </div>
        <h2 className="mb-2 text-center text-2xl font-bold text-primary">
          Create Admin Account
        </h2>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          Register with your invite
        </p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div>
            <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
              Full Name
            </Label>
            <Input
              {...register("fullName", { required: "Full Name is required" })}
              id="fullName"
              type="text"
              placeholder="Jane Admin"
              className="mt-1.5 h-11 rounded-md border-primary/30 bg-background px-3 text-base"
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-destructive">{errors.fullName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </Label>
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Please enter a valid email" },
              })}
              id="email"
              type="email"
              placeholder="admin@example.com"
              className="mt-1.5 h-11 rounded-md border-primary/30 bg-background px-3 text-base"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </Label>
            <Input
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: "Min 8 chars with a letter and a number",
                },
              })}
              id="password"
              type="password"
              placeholder="••••••••"
              className="mt-1.5 h-11 rounded-md border-primary/30 bg-background px-3 text-base"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>
        
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 rounded-md bg-primary font-semibold text-primary-foreground"
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
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/admin/login" className="font-medium text-primary hover:underline">
            Login
          </Link>
        </p>
        </div>
      </div>
    </AnimatedBackground>
  );
}


export default AdminRegistration;