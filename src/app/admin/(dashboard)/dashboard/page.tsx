import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo/Logo";
import { Button } from "@/components/ui/button";
import { CalendarClock, Hammer } from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-2xl border border-primary/20 bg-card/80 backdrop-blur p-10 text-center shadow-xl">
        <div className="mx-auto mb-6 flex items-center justify-center gap-3">
          <Logo size={48} />
          <span className="text-2xl font-bold text-primary">Admin Dashboard</span>
        </div>

        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Hammer size={28} />
        </div>

        <h1 className="mb-2 text-3xl font-extrabold tracking-tight">Coming Soon</h1>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">
          We&apos;re crafting powerful admin tools for managing users, projects, and
          system insights. Check back shortly.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
          <CalendarClock size={18} />
          <span className="text-xs font-medium">ETA: Next Release</span>
        </div>
      </div>
    </div>
  );
};

export default Page;