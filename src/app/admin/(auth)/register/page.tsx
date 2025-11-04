import type { Metadata } from "next";
import AdminRegistration from "@/components/Admin/Auth/Register/AdminRegistration";
import React from "react";

export const metadata: Metadata = {
  title: "Admin Registration • Animatic Vision",
  description: "Create an Animatic Vision admin account using your invite to access admin tools.",
};

const page = () => {
  return (
    <div>
      <AdminRegistration />
    </div>
  );
};

export default page;
