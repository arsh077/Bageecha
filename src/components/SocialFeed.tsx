"use client";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram } from "lucide-react";
import { store, CustomerImage } from "../store";

gsap.registerPlugin(ScrollTrigger);

export default function SocialFeed() {
  const feedRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<CustomerImage[]>([]);

  useEffect(() => {
    setImages(store.getCustomerGallery());
  }, []);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia(feedRef);

    mm.add("(min-width: 768px)", () => {
      // Desktop: Staggered scale & fade
      gsap.from(".social-img", {
        scale: 0.9,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: feedRef.current,
          start: "top 80%",
        },
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: Simple fade-in, no scale
      gsap.from(".social-img", {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: feedRef.current,
          start: "top 85%",
        },
      });
    });
    
    return () => mm.revert();
  }, []);

  return (
    <section ref={feedRef} className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl mb-4 font-serif">Join the Bageecha Community</h2>
        <p className="text-[var(--color-brown)] flex items-center justify-center gap-2">
          <Instagram size={20} /> @bageechacafe
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {images.slice(0, 9).map((item) => (
          <div 
            key={item.id}
            className="social-img aspect-square overflow-hidden rounded-xl will-change-transform"
          >
            <img 
              src={item.img} 
              alt="Community" 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
