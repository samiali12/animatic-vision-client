import AnimatedBackground from "@/components/Animations/AnimatedBackground";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Story-to-Animation Generator",
  description:
    "Turn your short stories into 20–30 sec 2D animated clips using AI — no external APIs, all in Python.",
};

const Home = () => {
  return (
    <AnimatedBackground>
      <main className="background flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <h1 className="mb-6 text-5xl font-bold text-primary">
          Story-to-Animation Generator
        </h1>

        <p className="mb-10 max-w-2xl text-lg font-medium text-secondary">
          Write a short story, let AI break it into scenes, create cartoon
          characters, add dialogue voices, and compile a 20–30 sec 2D animated
          MP4 — all powered by Python-based AI models.
        </p>

        <div className="space-x-6">
          {/* Login Button */}
          <Link
            href="/login"
            className="inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-md transition duration-300 hover:bg-secondary hover:shadow-lg hover:-translate-y-0.5"
          >
            Login
          </Link>

          {/* Register Button */}
          <Link
            href="/register"
            className="inline-block rounded-lg px-6 py-3 font-semibold shadow-md transition duration-300 border hover:bg-accent hover:text-primary-foreground hover:shadow-lg hover:-translate-y-0.5"
          >
            Register
          </Link>
        </div>
      </main>
    </AnimatedBackground>
  );
};

export default Home;
