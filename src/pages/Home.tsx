"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EntryScreen from "../components/EntryScreen";
import PinBoard from "../components/PinBoard";
import RestaurantInfo from "../components/RestaurantInfo";
import StorySection from "../components/StorySection";
import CafeExperience from "../components/CafeExperience";
import BookingSection from "../components/BookingSection";
import Testimonials from "../components/Testimonials";
import SocialFeed from "../components/SocialFeed";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const homeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia(homeRef);

    mm.add("(min-width: 768px)", () => {
      // Desktop: Section reveal breathing effect
      gsap.utils.toArray(".section-reveal").forEach((section: any) => {
        gsap.from(section, {
          opacity: 0,
          y: 80,
          duration: 1.5,
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
      gsap.utils.toArray(".section-reveal").forEach((section: any) => {
        gsap.from(section, {
          opacity: 0,
          y: 30,
          duration: 0.8,
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

  return (
    <div ref={homeRef}>
      <EntryScreen />
      <div className="section-reveal"><PinBoard /></div>
      <div className="section-reveal"><RestaurantInfo /></div>
      <StorySection />
      <div className="section-reveal"><CafeExperience /></div>
      <div className="section-reveal"><BookingSection /></div>
      <div className="section-reveal"><Testimonials /></div>
      <div className="section-reveal"><SocialFeed /></div>
    </div>
  );
}
