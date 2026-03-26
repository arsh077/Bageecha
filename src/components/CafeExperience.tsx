"use client";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { store, LocationImage } from "../store";

gsap.registerPlugin(ScrollTrigger);

export default function CafeExperience() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [locations, setLocations] = useState<LocationImage[]>([]);

  useEffect(() => {
    setLocations(store.getLocationGallery());
  }, []);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia(parallaxRef);

    mm.add("(min-width: 768px)", () => {
      if (parallaxRef.current) {
        gsap.to(".parallax-bg", {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: parallaxRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".parallax-plants", {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: parallaxRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: Simple fade-in, no parallax
      gsap.from(parallaxRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top 85%",
        },
      });
    });
    
    return () => mm.revert();
  }, []);

  return (
    <section ref={parallaxRef} className="parallax w-full bg-[var(--color-dark-garden)] text-[var(--color-beige)] py-24 relative overflow-hidden">
      <div className="parallax-bg absolute inset-[-20%] opacity-20 z-0">
        <img src="https://picsum.photos/seed/garden/1920/1080" alt="Garden Background" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <div className="text-center mb-16 parallax-plants">
          <h2 className="text-4xl md:text-6xl mb-4 font-serif">Chai meets calm</h2>
          <h3 className="text-3xl md:text-5xl text-[var(--color-leaf)] font-serif">Plants meet people</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.slice(0, 3).map((item, i) => (
            <div 
              key={item.id}
              className="group cursor-pointer parallax-plants"
            >
              <div className="overflow-hidden rounded-2xl aspect-[3/4] mb-4">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
              </div>
              <h4 className="text-2xl font-serif text-center">{item.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
