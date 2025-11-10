"use client";

import React, { useMemo } from "react";

const AnimatedBackground = ({ children }: { children: React.ReactNode }) => {
  // Generate more particles with fixed positions for better performance
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: (i * 4.2 + 3) % 100,
      top: (i * 8.5 + 5) % 100,
      delay: i * 0.5,
      duration: 8 + (i % 7) * 1.5,
      size: 2 + (i % 3),
    }));
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-linear-to-br from-background via-background to-muted/20">
      {/* Animated gradient orbs - More vibrant and larger */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating orb - top left */}
        <div className="absolute -left-1/4 -top-1/4 h-128 w-lg rounded-full bg-linear-to-br from-primary/40 via-secondary/30 to-transparent blur-3xl animate-float-slow animate-pulse-orb" />
        
        {/* Medium floating orb - bottom right */}
        <div className="absolute -bottom-1/4 -right-1/4 h-112 w-md rounded-full bg-linear-to-tl from-accent/40 via-secondary/30 to-transparent blur-3xl animate-float-medium animate-pulse-orb" style={{ animationDelay: "1s" }} />
        
        {/* Small floating orb - center right */}
        <div className="absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-linear-to-bl from-primary/35 via-accent/35 to-transparent blur-3xl animate-float-fast animate-pulse-orb" />
        
        {/* Additional accent orb - bottom left */}
        <div className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-linear-to-tr from-secondary/35 via-primary/25 to-transparent blur-3xl animate-float-slow animate-pulse-orb" style={{ animationDelay: "2s" }} />
        
        {/* Top center orb */}
        <div className="absolute left-1/2 -top-1/3 h-96 w-[24rem] -translate-x-1/2 rounded-full bg-linear-to-b from-accent/30 via-primary/20 to-transparent blur-3xl animate-float-medium animate-pulse-orb" style={{ animationDelay: "0.5s" }} />
        
        {/* Center left orb */}
        <div className="absolute -left-1/3 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-linear-to-r from-secondary/30 via-accent/25 to-transparent blur-3xl animate-float-fast animate-pulse-orb" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Animated mesh gradient overlay - More intense */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-linear-to-r from-primary/15 via-accent/20 to-secondary/15 bg-size-[200%_200%] animate-gradient-shift animate-pulse-gradient" />
      </div>

      {/* Additional rotating gradient rings */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/30 animate-rotate-slow" />
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 translate-x-1/2 translate-y-1/2 rounded-full border-2 border-accent/30 animate-rotate-fast" style={{ animationDelay: "1s" }} />
      </div>

      {/* Floating particles - More and larger */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-primary/50 animate-particle-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size * 4}px`,
              height: `${particle.size * 4}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Animated grid pattern - More visible */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none animate-grid-shift"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(107, 63, 105) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(107, 63, 105) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Wave effects */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-t from-primary/30 to-transparent animate-wave" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-32 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-secondary/30 to-transparent animate-wave-reverse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedBackground;

