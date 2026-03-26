"use client";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Leaf } from "lucide-react";

export default function EntryScreen() {
  const entryRef = useRef<HTMLDivElement>(null);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  // Generate 25 random leaves for the animation
  const leaves = Array.from({ length: 25 });

  useLayoutEffect(() => {
    // Commented out session storage so you can see the animation on every refresh during development
    // if (sessionStorage.getItem("bageecha_intro_seen")) {
    //   setHasSeenIntro(true);
    //   return;
    // }

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (entryRef.current) {
            entryRef.current.style.display = "none";
            // sessionStorage.setItem("bageecha_intro_seen", "true");
          }
        }
      });

      // 1. Text fades in slightly upward
      tl.from(".title-line", {
        opacity: 0,
        y: 30,
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out",
      }, 0.2);

      // 2. Clouds sweep across the screen slowly
      tl.fromTo(".intro-cloud", {
        x: "-100vw",
        opacity: 0
      }, {
        x: "100vw",
        opacity: 1,
        duration: 4,
        stagger: 0.4,
        ease: "power1.inOut"
      }, 0);

      // 3. Leaves fly from bottom to top right
      tl.fromTo(".intro-leaf", {
        y: "110vh",
        x: () => gsap.utils.random(-200, 100),
        opacity: 0,
        rotation: () => gsap.utils.random(-180, 180),
      }, {
        y: "-20vh",
        x: "+=300",
        opacity: () => gsap.utils.random(0.4, 0.9),
        rotation: "+=360",
        duration: () => gsap.utils.random(2.5, 4.5),
        stagger: {
          each: 0.08,
          from: "random"
        },
        ease: "power1.out"
      }, 0.3);

      // 4. Fade out the entire entry screen
      tl.to(entryRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
      }, 3.5);

    }, entryRef);
    
    return () => ctx.revert();
  }, []);

  if (hasSeenIntro) return null;

  return (
    <div ref={entryRef} className="fixed inset-0 bg-[var(--color-dark-garden)] z-[100] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Clouds (Smoke Effect) */}
      <div className="absolute inset-0 pointer-events-none opacity-70">
        <div className="intro-cloud absolute top-[10%] -left-[20%] w-[120vw] h-[40vh] bg-white/20 blur-[100px] rounded-full"></div>
        <div className="intro-cloud absolute top-[40%] -left-[40%] w-[150vw] h-[50vh] bg-white/25 blur-[120px] rounded-full"></div>
        <div className="intro-cloud absolute bottom-[0%] -left-[10%] w-[100vw] h-[40vh] bg-[var(--color-leaf)]/20 blur-[100px] rounded-full"></div>
      </div>

      {/* Floating Leaves */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {leaves.map((_, i) => (
          <Leaf 
            key={i}
            className="intro-leaf absolute text-[var(--color-leaf)] drop-shadow-xl"
            style={{
              left: `${Math.random() * 100}vw`,
              width: `${Math.random() * 24 + 16}px`,
              height: `${Math.random() * 24 + 16}px`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center">
        <h1 className="title-line text-[var(--color-beige)] text-5xl md:text-7xl font-serif mb-4 drop-shadow-lg">
          Welcome to <br /> Bageecha Cafe
        </h1>
        <p className="title-line text-[var(--color-leaf)] italic tracking-[0.2em] text-lg mt-6 flex items-center justify-center gap-3">
          <Leaf size={18} className="opacity-70" />
          Entering the garden...
          <Leaf size={18} className="opacity-70" />
        </p>
      </div>

    </div>
  );
}
