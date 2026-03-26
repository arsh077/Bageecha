"use client";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Button } from "../ui/Button";
import { Leaf, Calendar, Clock, Users, MessageSquare } from "lucide-react";
import { store } from "../store";

export default function BookingPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "1",
    date: "",
    time: "",
    requests: ""
  });

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    
    let ctx = gsap.context(() => {
      gsap.from(".animate-fade-up", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });
    }, pageRef);
    
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.addBooking(formData);
    setIsSubmitted(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-[var(--color-cream)] pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="flex justify-center mb-4">
            <Leaf className="w-12 h-12 text-[var(--color-leaf)] opacity-80" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-[var(--color-forest)] mb-6">
            Reserve Your Table
          </h1>
          <p className="text-lg text-[var(--color-brown)] italic max-w-2xl mx-auto">
            Plan your perfect evening at Bageecha. Whether it's a romantic dinner, a family gathering, or a quiet solo retreat, we'll make sure your table is ready.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-[var(--color-leaf)]/10 animate-fade-up">
          
          {isSubmitted ? (
            <div className="text-center py-16 animate-fade-up">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--color-leaf)]/10 mb-6">
                <Leaf className="w-10 h-10 text-[var(--color-leaf)]" />
              </div>
              <h2 className="text-3xl font-serif text-[var(--color-forest)] mb-4">Booking Confirmed!</h2>
              <p className="text-[var(--color-brown)] mb-8">
                Thank you for choosing Bageecha. We have sent a confirmation to your email. We look forward to hosting you!
              </p>
              <Button onClick={() => window.location.href = '/'} variant="secondary">
                Return Home
              </Button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              
              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--color-forest)] ml-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className="w-full px-5 py-4 rounded-xl bg-white/80 border border-[var(--color-leaf)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]/50 transition-all text-[var(--color-ink)]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--color-forest)] ml-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="w-full px-5 py-4 rounded-xl bg-white/80 border border-[var(--color-leaf)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]/50 transition-all text-[var(--color-ink)]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--color-forest)] ml-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-5 py-4 rounded-xl bg-white/80 border border-[var(--color-leaf)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]/50 transition-all text-[var(--color-ink)]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--color-forest)] ml-1">Number of Guests</label>
                  <div className="relative">
                    <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-brown)]/50" />
                    <select 
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full pl-12 pr-5 py-4 rounded-xl bg-white/80 border border-[var(--color-leaf)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]/50 transition-all text-[var(--color-ink)] appearance-none cursor-pointer"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3">3 People</option>
                      <option value="4">4 People</option>
                      <option value="5">5 People</option>
                      <option value="6+">6+ People (Large Group)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--color-forest)] ml-1">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-brown)]/50" />
                    <input 
                      type="date" 
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full pl-12 pr-5 py-4 rounded-xl bg-white/80 border border-[var(--color-leaf)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]/50 transition-all text-[var(--color-ink)] cursor-pointer"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--color-forest)] ml-1">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-brown)]/50" />
                    <select 
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full pl-12 pr-5 py-4 rounded-xl bg-white/80 border border-[var(--color-leaf)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]/50 transition-all text-[var(--color-ink)] appearance-none cursor-pointer"
                    >
                      <option value="">Select Time</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="21:00">9:00 PM</option>
                      <option value="22:00">10:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--color-forest)] ml-1">Special Requests / Occasion</label>
                <div className="relative">
                  <MessageSquare className="absolute left-5 top-5 w-5 h-5 text-[var(--color-brown)]/50" />
                  <textarea 
                    name="requests"
                    value={formData.requests}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Celebrating a birthday? Need a quiet corner? Let us know..."
                    className="w-full pl-12 pr-5 py-4 rounded-xl bg-white/80 border border-[var(--color-leaf)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]/50 transition-all text-[var(--color-ink)] resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4 flex justify-center">
                <Button type="submit" variant="primary" className="w-full md:w-auto px-12 py-4 text-lg">
                  Confirm Reservation
                </Button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
