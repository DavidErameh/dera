"use client";

import React from "react";
import { motion } from "motion/react";

interface IMessageBubbleProps {
  variant: "white" | "blue";
  name: string;
  message: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

export function IMessageBubble({ 
  variant, 
  name, 
  message, 
  size = "medium",
  className 
}: IMessageBubbleProps) {
  const sizeClasses = {
    small: "max-w-[100px] text-[9px]",
    medium: "max-w-[130px] text-[10px]",
    large: "max-w-[160px] text-[11px]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      className={`relative ${className}`}
    >
      {/* Name tag */}
      <div 
        className={`absolute -top-4 left-4 text-[7px] font-semibold ${
          variant === "blue" ? "text-[#4F8EF7]" : "text-slate-400"
        }`}
      >
        {name}
      </div>
      
      {/* Bubble */}
      <div
        className={`
          ${sizeClasses[size]}
          ${variant === "blue" 
            ? "bg-[#4F8EF7] text-white" 
            : "bg-white text-slate-800 shadow-md"
          }
          rounded-2xl px-3 py-2
          ${variant === "blue" ? "rounded-bl-sm" : "rounded-br-sm"}
        `}
      >
        {message}
      </div>
      
      {/* Tail */}
      <div
        className={`absolute bottom-1 w-2 h-2 ${
          variant === "blue" 
            ? "right-0 bg-[#4F8EF7] -mr-1 rounded-br-xl" 
            : "left-0 bg-white -ml-1 rounded-bl-xl"
        }`}
        style={{
          clipPath: variant === "blue" 
            ? "polygon(0 0, 100% 0, 0 100%)" 
            : "polygon(100% 0, 100% 100%, 0 100%)"
        }}
      />
    </motion.div>
  );
}
