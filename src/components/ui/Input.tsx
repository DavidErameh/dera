import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export const Input = ({
  label,
  error,
  required,
  className,
  id,
  ...props
}: InputProps) => {
  const inputId =
    id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col w-full gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs md:text-sm font-medium text-[#0A1628]"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full px-3 py-2 md:py-3 text-sm md:text-base bg-white border rounded-[8px] transition-all duration-200 outline-none",
          "border-gray-200 hover:border-gray-300",
          "focus:border-blue-700 focus:ring-2 focus:ring-blue-50",
          error &&
            "border-red-500 text-red-500 focus:border-red-500 focus:ring-red-50",
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-[10px] md:text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};
