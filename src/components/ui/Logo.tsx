"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  showText?: boolean;
}

const Logo = ({ variant = "dark", className, showText = true }: LogoProps) => {
  return (
    <Link href="/" className={cn("flex items-center gap-2 group cursor-pointer", className)}>
      <div className="relative overflow-hidden" style={{ width: '40px', height: '40px' }}>
        <img
          src="/image.svg"
          alt="Dera Logo"
          className={cn(
            "w-[500px] h-[500px] object-contain object-center -translate-x-20 -translate-y-20 transition-transform duration-200 group-hover:scale-105",
            variant === "light" && "brightness-0 invert"
          )}
        />
      </div>
      {showText && (
        <span
          className={cn(
            "font-display font-bold text-xl tracking-tight",
            variant === "dark" && "text-blue-900",
            variant === "light" && "text-white"
          )}
        >
          Dera
        </span>
      )}
    </Link>
  );
};

export { Logo };
