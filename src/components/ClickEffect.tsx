"use client";
import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

interface Petal {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  rot: number;
}

export default function ClickEffect() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      const numPetals = 4 + Math.floor(Math.random() * 3); // 4 to 6 petals
      
      const newPetals = Array.from({ length: numPetals }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / numPetals + (Math.random() * 0.5 - 0.25);
        const distance = 40 + Math.random() * 50;
        return {
          id: id + i,
          x: e.clientX,
          y: e.clientY,
          tx: Math.cos(angle) * distance,
          ty: Math.sin(angle) * distance + 30, // slight downward gravity bias
          rot: Math.random() * 360,
        };
      });
      
      setPetals((prev) => [...prev, ...newPetals]);

      // Remove the petals from DOM after animation completes (800ms)
      setTimeout(() => {
        setPetals((prev) => prev.filter((p) => !newPetals.map(np => np.id).includes(p.id)));
      }, 800);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000] overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-petal"
          style={{
            left: petal.x,
            top: petal.y,
            '--tx': `${petal.tx}px`,
            '--ty': `${petal.ty}px`,
            '--rot': `${petal.rot}deg`,
          } as React.CSSProperties}
        >
          <Leaf className="text-[var(--color-leaf)] w-4 h-4 opacity-80" fill="currentColor" />
        </div>
      ))}
    </div>
  );
}
