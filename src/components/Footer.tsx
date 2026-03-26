"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia(footerRef);

    mm.add("(min-width: 768px)", () => {
      // Desktop: Fireflies effect
      gsap.utils.toArray(".firefly").forEach((dot: any) => {
        gsap.to(dot, {
          opacity: Math.random(),
          y: "+=20",
          x: `+=${(Math.random() - 0.5) * 20}`,
          repeat: -1,
          yoyo: true,
          duration: Math.random() * 3 + 2,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: No fireflies animation, keep it static or hide them
      gsap.set(".firefly", { display: "none" });
    });
    
    return () => mm.revert();
  }, []);

  return (
    <footer ref={footerRef} className="w-full bg-[var(--color-dark-garden)] text-[var(--color-beige)] pt-20 pb-10 relative overflow-hidden">
      {/* Fireflies effect - hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="firefly absolute w-1 h-1 bg-[#D4A373] rounded-full blur-[1px] opacity-0 will-change-transform"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl mb-6 font-serif">Bageecha</h2>
            <p className="text-[var(--color-blush)] max-w-sm italic">
              A sanctuary of calm, chai, and conversations.
            </p>
          </div>
          <div>
            <h4 className="text-xl mb-6 font-serif">Explore</h4>
            <ul className="space-y-4 text-[var(--color-blush)]">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Menu</a></li>
              <li><a href="#workshops" className="hover:text-white transition-colors">Workshops</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl mb-6 font-serif">Visit</h4>
            <ul className="space-y-4 text-[var(--color-blush)]">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="shrink-0 mt-1" />
                <span>Strand Road, Dalhousie BBD Bagh, Kolkata</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} />
                <span>+91 92309 71345</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} />
                <span>hello@bageecha.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--color-blush)]">
          <p>© 2026 Bageecha Cafe. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
