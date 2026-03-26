"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const storyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia(storyRef);

    mm.add("(min-width: 768px)", () => {
      if (storyRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top top",
            end: "+=200%",
            scrub: 1,
            pin: true,
          },
        });

        tl.to(".gallery-img", { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" })
          .to(".scene1", { opacity: 1, y: 0, duration: 1 }, "<")
          .to(".scene1", { opacity: 0, y: -50, duration: 1 }, "+=0.5")
          .to(".scene2", { opacity: 1, y: 0, duration: 1 })
          .to(".scene2", { opacity: 0, y: -50, duration: 1 }, "+=0.5")
          .to(".scene3", { opacity: 1, y: 0, duration: 1 });
      }
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: Simple fade-in per scene, no pinning
      gsap.utils.toArray(".scene-mobile").forEach((scene: any) => {
        gsap.from(scene, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: scene,
            start: "top 85%",
          },
        });
      });
    });
    
    return () => mm.revert();
  }, []);

  return (
    <section id="about" ref={storyRef} className="story w-full h-auto md:h-screen bg-[var(--color-dark-garden)] text-[var(--color-beige)] flex items-center justify-center relative overflow-hidden py-24 md:py-0">
      <div className="absolute inset-0 opacity-10">
        <img src="https://picsum.photos/seed/leaves/1920/1080" alt="Leaves" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
        
        {/* Left: Customer Gallery */}
        <div className="hidden md:grid grid-cols-2 gap-4 relative">
          <div className="gallery-img opacity-0 translate-y-10 mt-12">
            <img src="https://picsum.photos/seed/cafe1/600/800" alt="Customer" className="w-full h-full object-cover rounded-2xl shadow-2xl aspect-[3/4]" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
          </div>
          <div className="gallery-img opacity-0 translate-y-10">
            <img src="https://picsum.photos/seed/coffee2/600/600" alt="Customer" className="w-full h-full object-cover rounded-2xl shadow-2xl aspect-square" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
          </div>
          <div className="gallery-img opacity-0 translate-y-10">
            <img src="https://picsum.photos/seed/friends3/600/600" alt="Customer" className="w-full h-full object-cover rounded-2xl shadow-2xl aspect-square" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
          </div>
          <div className="gallery-img opacity-0 translate-y-10 -mt-12">
            <img src="https://picsum.photos/seed/tea4/600/800" alt="Customer" className="w-full h-full object-cover rounded-2xl shadow-2xl aspect-[3/4]" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-cream)]/10 backdrop-blur-md px-6 py-3 rounded-full border border-[var(--color-cream)]/20 text-[var(--color-cream)] font-serif italic shadow-xl whitespace-nowrap">
            Customer Gallery
          </div>
        </div>

        {/* Right: Text Scenes */}
        <div className="relative text-center md:text-left h-auto md:h-[300px] flex flex-col md:block items-center justify-center w-full gap-16 md:gap-0">
          <div className="scene1 scene-mobile md:absolute md:top-1/2 md:left-0 md:-translate-y-1/2 w-full md:opacity-0 md:translate-y-10 will-change-transform">
            <h2 className="text-4xl md:text-6xl font-serif mb-6">A Hidden Escape</h2>
            <p className="text-xl md:text-2xl text-[var(--color-leaf)] italic">Away from the city's noise.</p>
          </div>
          
          <div className="scene2 scene-mobile md:absolute md:top-1/2 md:left-0 md:-translate-y-1/2 w-full md:opacity-0 md:translate-y-10 will-change-transform">
            <h2 className="text-4xl md:text-6xl font-serif mb-6">Where Time Slows Down</h2>
            <p className="text-xl md:text-2xl text-[var(--color-leaf)] italic">Every cup tells a story.</p>
          </div>
          
          <div className="scene3 scene-mobile md:absolute md:top-1/2 md:left-0 md:-translate-y-1/2 w-full md:opacity-0 md:translate-y-10 will-change-transform">
            <h2 className="text-4xl md:text-6xl font-serif mb-6">Welcome to Your Sanctuary</h2>
            <p className="text-xl md:text-2xl text-[var(--color-leaf)] italic">Breathe. Relax. Enjoy.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
