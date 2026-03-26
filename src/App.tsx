"use client";
import { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import BookingPage from "./pages/BookingPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminGalleries from "./pages/admin/AdminGalleries";
import ClickEffect from "./components/ClickEffect";
import { Volume2, VolumeX } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({
  ignoreMobileResize: true,
});

export default function App() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <Router>
      <div className="relative min-h-screen w-full bg-[var(--color-cream)] text-[var(--color-forest)] overflow-x-hidden">
        <ClickEffect />
        {/* Sound Layer */}
        {/* Soft nature breeze and gentle birds */}
        <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2021/08/09/audio_82c6114115.mp3?filename=soft-wind-and-birds-68694.mp3" preload="auto" />
        <button 
          onClick={toggleAudio}
          className={`fixed bottom-6 right-6 z-40 bg-[var(--color-dark-garden)] text-[var(--color-beige)] p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 ${isMuted ? 'animate-pulse ring-4 ring-[var(--color-leaf)]/50' : ''}`}
          title={isMuted ? "Click to play soothing sounds" : "Mute sounds"}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>

        {/* Main Content */}
        <main className="w-full">
          <Routes>
            <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
            <Route path="/menu" element={<><Navbar /><MenuPage /><Footer /></>} />
            <Route path="/book" element={<><Navbar /><BookingPage /><Footer /></>} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/galleries" element={<AdminGalleries />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
