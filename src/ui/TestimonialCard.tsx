import { cn } from "../lib/utils";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  text: string;
  name: string;
  rating?: number;
  className?: string;
}

export function TestimonialCard({ text, name, rating = 4, className }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "min-w-[300px] md:min-w-[400px] bg-[#E8F0EA] rounded-[20px] p-6 shadow-sm hover:-translate-y-2 hover:shadow-lg transition-all duration-500",
        className
      )}
    >
      <div className="flex gap-1 mb-4 text-[var(--color-gold)]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} fill={i < rating ? "currentColor" : "none"} />
        ))}
      </div>
      <p className="font-sans text-[var(--color-forest)] mb-4 italic">"{text}"</p>
      <p className="font-serif font-medium text-[var(--color-forest)]">– {name}</p>
    </div>
  );
}
