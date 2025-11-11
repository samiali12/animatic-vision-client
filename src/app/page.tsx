"use client";

import Link from "next/link";

const Home = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="videos/home_screen_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Foreground Content */}
      <main className="relative z-20 flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <h1 className="mb-6 text-5xl font-bold text-primary-foreground drop-shadow-lg">
          Story-to-Animation Generator
        </h1>

        <p className="mb-10 max-w-2xl text-lg font-medium text-primary-foreground drop-shadow-md">
          Write a short story, let AI break it into scenes, create cartoon
          characters, add dialogue voices, and compile a 20–30 sec 2D animated
          MP4 — all powered by Python-based AI models.
        </p>

        <div className="space-x-6">
          <Link
            href="/login"
            className="inline-block rounded-lg bg-accent text-primary-foreground px-6 py-3 font-semibold  shadow-md transition duration-300 hover:bg-secondary hover:shadow-lg hover:-translate-y-0.5"
          >
            Login
          </Link>

          <Link
            href="/register"
            className=" text-primary-foreground inline-block rounded-lg px-6 py-3 font-semibold shadow-md transition duration-300 border hover:bg-accent hover:text-primary-foreground hover:shadow-lg hover:-translate-y-0.5"
          >
            Register
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
