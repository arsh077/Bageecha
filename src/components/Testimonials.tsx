"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { TestimonialCard } from "../ui/TestimonialCard";
import { testimonials } from "../data/testimonials";

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia(sectionRef);

    mm.add("(min-width: 768px)", () => {
      // Desktop: Floating effect
      gsap.utils.toArray(".testimonial").forEach((el: any) => {
        gsap.to(el, {
          x: "+=10",
          y: "+=5",
          repeat: -1,
          yoyo: true,
          duration: 3 + Math.random() * 2,
          ease: "sine.inOut",
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: No floating effect, just static or simple scroll reveal
      gsap.from(".testimonial", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    });
    
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 overflow-hidden bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-4xl md:text-5xl font-serif">Words from the Garden</h2>
      </div>
      <div className="flex gap-6 px-6 overflow-x-auto no-scrollbar pb-8 snap-x">
        {testimonials.map((t, i) => (
          <div key={i} className="snap-center testimonial will-change-transform md:transform-none">
            <TestimonialCard text={t.text} name={t.name} rating={t.rating} />
          </div>
        ))}
      </div>
    </section>
  );
}
