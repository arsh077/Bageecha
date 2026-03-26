import { cn } from "../lib/utils";
import { MapPin } from "lucide-react";

interface PinCardProps {
  image: string;
  caption: string;
  rotation?: number;
  className?: string;
}

export function PinCard({ image, caption, rotation = 0, className }: PinCardProps) {
  return (
    <div
      className={cn(
        "relative bg-[#FAF6F0] p-3 pb-8 shadow-md border border-white/50 w-full max-w-[280px] flex flex-col items-center group transition-transform duration-500 hover:scale-105 hover:z-20",
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="absolute -top-3 text-red-500 drop-shadow-md z-10">
        <MapPin fill="currentColor" size={24} />
      </div>
      <div className="w-full aspect-square overflow-hidden bg-gray-200 mb-4">
        <img src={image} alt={caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
      </div>
      <p className="font-serif italic text-[var(--color-forest)] text-center tracking-wide">
        "{caption}"
      </p>
    </div>
  );
}
