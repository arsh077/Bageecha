"use client";
import { useState, useRef, useEffect } from "react";
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

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({
  ignoreMobileResize: true,
});

// ─── Nature Soundscape Player ────────────────────────────────────────────────
function NatureSoundPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const windRef = useRef<HTMLAudioElement>(null);
  const birdsRef = useRef<HTMLAudioElement>(null);
  const [windVol, setWindVol] = useState(0.5);
  const [birdsVol, setBirdsVol] = useState(0.6);

  // Waveform bar heights for animation
  const bars = [3, 5, 7, 9, 6, 8, 4, 6, 9, 5, 7, 4, 8, 6, 5];

  useEffect(() => {
    if (windRef.current) windRef.current.volume = windVol;
  }, [windVol]);

  useEffect(() => {
    if (birdsRef.current) birdsRef.current.volume = birdsVol;
  }, [birdsVol]);

  const togglePlay = async () => {
    if (!isPlaying) {
      try {
        if (windRef.current) await windRef.current.play();
        if (birdsRef.current) await birdsRef.current.play();
        setIsPlaying(true);
      } catch (e) {
        console.warn("Audio playback failed:", e);
      }
    } else {
      windRef.current?.pause();
      birdsRef.current?.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      {/* Wind track – gentle forest breeze */}
      <audio
        ref={windRef}
        loop
        preload="auto"
        src="https://assets.mixkit.co/active_storage/sfx/2516/2516-preview.mp3"
      />
      {/* Birds track – morning bird chirps */}
      <audio
        ref={birdsRef}
        loop
        preload="auto"
        src="https://assets.mixkit.co/active_storage/sfx/2517/2517-preview.mp3"
      />

      {/* Floating Player */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 50,
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Expanded Card */}
        {isExpanded && (
          <div
            style={{
              background: "linear-gradient(135deg, #1a2e1a 0%, #2d4a2d 60%, #1a3a2a 100%)",
              border: "1px solid rgba(134,179,100,0.35)",
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "12px",
              width: "240px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(134,179,100,0.1)",
              backdropFilter: "blur(12px)",
              animation: "slideUp 0.3s ease",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <span style={{ fontSize: "18px" }}>🌿</span>
              <div>
                <div style={{ color: "#d4c9a8", fontSize: "13px", fontWeight: "600", letterSpacing: "0.05em" }}>
                  Garden Soundscape
                </div>
                <div style={{ color: "#86b364", fontSize: "11px", opacity: 0.8 }}>
                  {isPlaying ? "♪ Playing..." : "Paused"}
                </div>
              </div>
            </div>

            {/* Waveform Visualizer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "3px",
                height: "32px",
                marginBottom: "16px",
              }}
            >
              {bars.map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: "3px",
                    height: isPlaying ? `${h * 3}px` : "4px",
                    background: isPlaying
                      ? `rgba(134,179,100,${0.5 + (h / 10) * 0.5})`
                      : "rgba(134,179,100,0.25)",
                    borderRadius: "2px",
                    transition: "height 0.4s ease",
                    animation: isPlaying ? `wave ${0.8 + (i % 4) * 0.15}s ease-in-out infinite alternate` : "none",
                  }}
                />
              ))}
            </div>

            {/* Wind Volume */}
            <div style={{ marginBottom: "10px" }}>
              <label style={{ color: "#a8c490", fontSize: "11px", display: "flex", alignItems: "center", gap: "5px", marginBottom: "5px" }}>
                <span>💨</span> Wind
              </label>
              <input
                type="range" min="0" max="1" step="0.05"
                value={windVol}
                onChange={e => setWindVol(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#86b364", cursor: "pointer" }}
              />
            </div>

            {/* Birds Volume */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ color: "#a8c490", fontSize: "11px", display: "flex", alignItems: "center", gap: "5px", marginBottom: "5px" }}>
                <span>🐦</span> Birds
              </label>
              <input
                type="range" min="0" max="1" step="0.05"
                value={birdsVol}
                onChange={e => setBirdsVol(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#86b364", cursor: "pointer" }}
              />
            </div>

            {/* Play / Pause Button */}
            <button
              onClick={togglePlay}
              style={{
                width: "100%",
                padding: "10px",
                background: isPlaying
                  ? "rgba(134,179,100,0.15)"
                  : "linear-gradient(135deg, #5a8a3a, #86b364)",
                border: "1px solid rgba(134,179,100,0.4)",
                borderRadius: "12px",
                color: "#d4c9a8",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                letterSpacing: "0.05em",
                transition: "all 0.25s ease",
              }}
            >
              {isPlaying ? "⏸ Pause Sounds" : "▶ Play Sounds"}
            </button>
          </div>
        )}

        {/* Toggle Pill Button */}
        <button
          onClick={() => setIsExpanded(v => !v)}
          title="Nature Soundscape"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "linear-gradient(135deg, #1a2e1a, #2d4a2d)",
            border: "1px solid rgba(134,179,100,0.4)",
            borderRadius: "50px",
            padding: isExpanded ? "10px 18px" : "12px 20px",
            color: "#d4c9a8",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            transition: "all 0.3s ease",
            minWidth: isExpanded ? "auto" : "auto",
          }}
        >
          {/* Animated leaf icon */}
          <span
            style={{
              fontSize: "20px",
              display: "inline-block",
              animation: isPlaying ? "leafSway 2s ease-in-out infinite" : "none",
            }}
          >
            🌿
          </span>
          <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
            {isPlaying ? "🎵 Nature Sounds" : "Nature Sounds"}
          </span>
          {/* Live indicator dot */}
          {isPlaying && (
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#86b364",
                boxShadow: "0 0 6px #86b364",
                animation: "pulse 1.2s ease-in-out infinite",
              }}
            />
          )}
        </button>
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes wave {
          from { height: 4px; }
          to   { height: var(--h, 20px); }
        }
        @keyframes leafSway {
          0%, 100% { transform: rotate(-8deg) scale(1.05); }
          50%       { transform: rotate(8deg)  scale(1.0);  }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1;   transform: scale(1);   }
          50%       { opacity: 0.5; transform: scale(1.3); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen w-full bg-[var(--color-cream)] text-[var(--color-forest)] overflow-x-hidden">
        <ClickEffect />
        <NatureSoundPlayer />

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
