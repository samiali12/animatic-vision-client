import type { Metadata } from "next";
import AdminLogin from "@/components/Admin/Auth/Login/AdminLogin";

export const metadata: Metadata = {
  title: "Admin Login • Animatic Vision",
  description: "Sign in to the Animatic Vision admin dashboard to manage projects and users.",
};

const page = () => {
  return (
    <div>
      <AdminLogin />
    </div>
  );
};

export default page;
