"use client";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PinCard } from "../ui/PinCard";
import { store, MemoryImage } from "../store";

gsap.registerPlugin(ScrollTrigger);

export default function PinBoard() {
  const pinboardRef = useRef<HTMLDivElement>(null);
  const [gallery, setGallery] = useState<MemoryImage[]>([]);

  useEffect(() => {
    setGallery(store.getMemoryGallery());
  }, []);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia(pinboardRef);

    mm.add("(min-width: 768px)", () => {
      // Desktop: Floating effect & staggered reveal
      gsap.utils.toArray(".pin").forEach((el: any) => {
        gsap.to(el, {
          y: "+=15",
          rotation: "+=2",
          repeat: -1,
          yoyo: true,
          duration: 3 + Math.random() * 2,
          ease: "sine.inOut",
        });
      });

      gsap.from(".pin-container", {
        opacity: 0,
        y: 100,
        stagger: 0.2,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: pinboardRef.current,
          start: "top 80%",
        },
      });

      // Map Road reveal
      gsap.from(".map-path", {
        strokeDashoffset: 1500,
        strokeDasharray: "1500 1500",
        duration: 2.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: pinboardRef.current,
          start: "top 70%",
        }
      });
      
      gsap.from(".map-point", {
        scale: 0,
        opacity: 0,
        transformOrigin: "center",
        stagger: 0.5,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: pinboardRef.current,
          start: "top 70%",
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: Simple fade-in, no floating
      gsap.from(".pin-container", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: pinboardRef.current,
          start: "top 85%",
        },
      });
    });
    
    return () => mm.revert();
  }, []);

  return (
    <section ref={pinboardRef} className="pinboard max-w-7xl mx-auto px-6 py-12 md:py-24">
      <div className="text-center mt-16 md:mt-20 mb-16">
        <h1 className="text-5xl md:text-7xl mb-4 font-serif">Memories Pinned</h1>
        <p className="italic text-lg text-[var(--color-brown)] tracking-wide">“Yahan waqt thoda dheere chalta hai…”</p>
      </div>
      
      <div className="relative w-full min-h-[600px] flex flex-wrap justify-center gap-8 md:gap-16 items-center">
        
        {/* Map Road SVG Effect */}
        <div className="absolute inset-0 pointer-events-none hidden md:block z-0 opacity-60">
          <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Winding Map Path */}
            <path 
              className="map-path"
              d="M 50 250 C 250 100, 350 450, 600 450 C 850 450, 950 200, 1150 250" 
              stroke="var(--color-brown)" 
              strokeWidth="4" 
              strokeDasharray="16 16" 
              strokeLinecap="round" 
            />
            {/* Decorative Map Points */}
            <circle cx="200" cy="180" r="6" fill="var(--color-leaf)" className="map-point opacity-80" />
            <circle cx="600" cy="450" r="10" fill="none" stroke="var(--color-leaf)" strokeWidth="3" className="map-point opacity-80" />
            <circle cx="600" cy="450" r="4" fill="var(--color-leaf)" className="map-point" />
            <circle cx="1000" cy="225" r="6" fill="var(--color-leaf)" className="map-point opacity-80" />
          </svg>
        </div>

        {gallery.slice(0, 4).map((item, i) => (
          <div key={item.id} className="pin-container relative z-10">
            <div className="pin will-change-transform md:transform-none">
              <PinCard 
                image={item.img} 
                caption={item.caption} 
                rotation={item.rotation} 
                className={i % 2 === 0 ? "md:-mt-12" : "md:mt-24"}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
