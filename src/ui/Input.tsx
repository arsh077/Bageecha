import { cn } from "../lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full bg-white border border-[#E0E0E0] rounded-xl px-4 py-3.5 text-[var(--color-forest)] placeholder:text-gray-400 focus:outline-none focus:border-[var(--color-leaf)] focus:ring-1 focus:ring-[var(--color-leaf)] transition-all",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
