"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { menuData } from "../data/menu";
import { Camera, Flower2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function MenuSection() {
  const menuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia(menuRef);

    mm.add("(min-width: 768px)", () => {
      // Desktop: Staggered reveal for menu categories
      gsap.utils.toArray(".menu-category").forEach((category: any) => {
        gsap.from(category, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: category,
            start: "top 85%",
          },
        });
      });
      
      gsap.utils.toArray(".section-reveal").forEach((section: any) => {
        gsap.from(section, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: Lighter fade-in
      gsap.utils.toArray(".menu-category").forEach((category: any) => {
        gsap.from(category, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: category,
            start: "top 90%",
          },
        });
      });
      
      gsap.utils.toArray(".section-reveal").forEach((section: any) => {
        gsap.from(section, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
          },
        });
      });
    });
    
    return () => mm.revert();
  }, []);

  // Split menu into two columns
  const leftColumn = menuData.slice(0, 6); // Drinks & Cold Stuff
  const rightColumn = menuData.slice(6); // Food & Desserts

  return (
    <section id="menu" ref={menuRef} className="w-full py-24 bg-[#FAF6F0] text-[var(--color-ink)]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-20 section-reveal">
          <h2 className="text-5xl md:text-7xl font-serif text-[var(--color-forest)] mb-6">Our Menu</h2>
          <p className="text-lg text-[var(--color-brown)] italic max-w-2xl mx-auto">
            Crafted with love, served with warmth. Explore our selection of teas, coffees, and delightful bites.
          </p>
          
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-[var(--color-forest)]">
            <div className="flex items-center gap-2">
              <Camera size={16} className="text-[var(--color-gold)]" />
              <span>Picture Worthy</span>
            </div>
            <div className="flex items-center gap-2">
              <Flower2 size={16} className="text-[var(--color-leaf)]" />
              <span>Bageecha Must Try</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Column */}
          <div className="space-y-16">
            {leftColumn.map((category, idx) => (
              <div key={idx} className="menu-category will-change-transform">
                <div className="mb-8 border-b border-[var(--color-leaf)]/30 pb-2">
                  <h3 className="text-2xl md:text-3xl font-serif text-[var(--color-forest)] tracking-wide uppercase">
                    {category.category}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-[var(--color-brown)] italic mt-1">{category.description}</p>
                  )}
                </div>
                
                <div className="space-y-6">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex flex-col">
                      <div className="flex justify-between items-baseline gap-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-lg font-medium text-[var(--color-ink)] uppercase tracking-wider">
                            {item.name}
                          </h4>
                          <div className="flex gap-1">
                            {item.isSignature && <Camera size={14} className="text-[var(--color-gold)]" />}
                            {item.isMustTry && <Flower2 size={14} className="text-[var(--color-leaf)]" />}
                          </div>
                        </div>
                        <div className="flex-grow border-b border-dotted border-[var(--color-brown)]/30 mx-2 relative top-[-6px]"></div>
                        <span className="text-lg font-serif text-[var(--color-forest)]">{item.price}</span>
                      </div>
                      {item.description && (
                        <p className="text-sm text-[var(--color-brown)] mt-1 whitespace-pre-line leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-16">
            {rightColumn.map((category, idx) => (
              <div key={idx} className="menu-category will-change-transform">
                <div className="mb-8 border-b border-[var(--color-leaf)]/30 pb-2">
                  <h3 className="text-2xl md:text-3xl font-serif text-[var(--color-forest)] tracking-wide uppercase">
                    {category.category}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-[var(--color-brown)] italic mt-1">{category.description}</p>
                  )}
                </div>
                
                <div className="space-y-6">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex flex-col">
                      <div className="flex justify-between items-baseline gap-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-lg font-medium text-[var(--color-ink)] uppercase tracking-wider">
                            {item.name}
                          </h4>
                          <div className="flex gap-1">
                            {item.isSignature && <Camera size={14} className="text-[var(--color-gold)]" />}
                            {item.isMustTry && <Flower2 size={14} className="text-[var(--color-leaf)]" />}
                          </div>
                        </div>
                        <div className="flex-grow border-b border-dotted border-[var(--color-brown)]/30 mx-2 relative top-[-6px]"></div>
                        <span className="text-lg font-serif text-[var(--color-forest)]">{item.price}</span>
                      </div>
                      {item.description && (
                        <p className="text-sm text-[var(--color-brown)] mt-1 whitespace-pre-line leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
        
        <div className="mt-20 text-center text-sm text-[var(--color-brown)] italic section-reveal">
          <p>5 % GST APPLICABLE | LET US KNOW ABOUT ANY ALLERGIES</p>
        </div>
      </div>
    </section>
  );
}
