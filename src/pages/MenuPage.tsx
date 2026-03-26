"use client";
import { useLayoutEffect } from "react";
import MenuSection from "../components/MenuSection";

export default function MenuPage() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF6F0]">
      <MenuSection />
    </div>
  );
}
