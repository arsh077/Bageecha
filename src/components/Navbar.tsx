import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Leaf } from "lucide-react";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.fromTo(navRef.current, {
      opacity: 0,
      y: -20
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.5,
    });
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-cream/95 backdrop-blur-md border-b border-leaf/20 shadow-sm">
      <nav ref={navRef} className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold text-forest flex items-center gap-1.5 hover:text-leaf transition-colors cursor-pointer" title="Go to Home">
          Bageecha <Leaf className="w-6 h-6 text-leaf drop-shadow-sm" />
        </Link>
        <div className="hidden md:flex gap-8 font-medium text-blue-900">
          <a href="/#about" className="hover:text-blue-700 transition-colors">About</a>
          <Link to="/menu" className="hover:text-blue-700 transition-colors">Menu</Link>
          <a href="/#booking" className="hover:text-blue-700 transition-colors">Reserve</a>
        </div>
        <Link to="/book" className="hidden md:block">
          <Button variant="secondary">Book Now</Button>
        </Link>
      </nav>
    </header>
  );
}
