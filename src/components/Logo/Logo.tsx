import React from "react";

interface LogoProps {
  size?: number; // default = 64
}

const Logo: React.FC<LogoProps> = ({ size = 64 }) => {
  const scale = size / 64;

  return (
    <div className="flex items-center select-none">
      {/* Brand Text */}
      <div className="flex items-baseline leading-none space-x-1">
        <span
          className="font-extrabold text-[#6B3F69] tracking-tight transition-colors group-hover:text-[#8D5F8C]"
          style={{ fontSize: `${1.8 * scale}rem` }}
        >
          Animatic
        </span>

        <span
          className="ml-2 font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#8D5F8C] to-[#A376A2]"
          style={{ fontSize: `${1.6 * scale}rem` }}
        >
          Vision
        </span>
      </div>
    </div>
  );
};

export default Logo;
