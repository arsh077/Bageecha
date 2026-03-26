import { cn } from "../lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-full px-6 py-3 min-h-[48px] font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105",
          variant === "primary" && "bg-[var(--color-leaf)] text-white hover:bg-[#4a8f68] hover:shadow-[0_0_15px_rgba(62,124,89,0.4)] active:bg-[#2d5e42]",
          variant === "secondary" && "border border-[var(--color-leaf)] bg-transparent text-[var(--color-leaf)] hover:bg-[var(--color-leaf)] hover:text-white hover:shadow-[0_0_15px_rgba(62,124,89,0.2)]",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
