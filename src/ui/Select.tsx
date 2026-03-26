import { cn } from "../lib/utils";
import { SelectHTMLAttributes, forwardRef } from "react";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full bg-white border border-[#E0E0E0] rounded-xl px-4 py-3.5 text-[var(--color-forest)] focus:outline-none focus:border-[var(--color-leaf)] focus:ring-1 focus:ring-[var(--color-leaf)] transition-all appearance-none",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";
