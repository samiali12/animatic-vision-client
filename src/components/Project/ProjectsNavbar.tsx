"use client";

import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import WhiteTextLogo from "../Logo/WhiteTextLogo";
import { useLogoutUserMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";

const ProjectsNavbar = () => {
  const router = useRouter();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
      router.push("/");
    }
  };

  return (
    <header className="border-b bg-primary text-primary-foreground sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <WhiteTextLogo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/dashboard"
              className="text-primary-foreground font-medium transition"
            >
              Projects
            </Link>
            <Link
              href="/dashboard/templates"
              className="text-primary-foreground font-medium transition"
            >
              Templates
            </Link>
            <Link
              href="/dashboard/help"
              className="text-primary-foreground font-medium transition"
            >
              Help
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="hidden md:flex items-center space-x-2 text-primary-foreground"
            >
              <LogOut className="w-4 h-4" />
              <span>{isLoading ? "Logging out..." : "Logout"}</span>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6 text-primary-foreground" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/dashboard"
                className="px-4 py-2 text-primary-foreground font-medium"
              >
                Projects
              </Link>
              <Link
                href="/dashboard/templates"
                className="px-4 py-2 text-primary-foreground"
              >
                Templates
              </Link>
              <Link
                href="/dashboard/help"
                className="px-4 py-2 text-primary-foreground"
              >
                Help
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-primary-foreground font-medium text-left flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>{isLoading ? "Logging out..." : "Logout"}</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default ProjectsNavbar;
