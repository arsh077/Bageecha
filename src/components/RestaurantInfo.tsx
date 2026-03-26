import { Star, MapPin, Clock, IndianRupee, Phone, Coffee } from "lucide-react";

export default function RestaurantInfo() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_40px_rgba(31,61,43,0.05)] border border-[var(--color-leaf)]/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-[var(--color-leaf)]/30 pb-8 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-forest)] mb-3">Bageecha</h1>
            <p className="text-[var(--color-brown)] flex items-center gap-2 text-sm md:text-base">
              <Coffee size={18} className="shrink-0" />
              North Indian, Tea, Coffee, Beverages
            </p>
          </div>
          <div className="flex gap-4 md:gap-6 w-full md:w-auto">
            <div className="bg-[#24963F] text-white px-4 py-3 rounded-2xl flex flex-col items-center justify-center flex-1 md:min-w-[110px] shadow-sm">
              <div className="flex items-center gap-1 text-xl font-bold">
                3.4 <Star size={16} className="fill-current relative top-[-1px]" />
              </div>
              <div className="text-xs opacity-90 border-b border-white/20 pb-1 mb-1 w-full text-center">190 Ratings</div>
              <div className="text-[10px] uppercase tracking-wider font-medium">Dining</div>
            </div>
            <div className="bg-[#F8F8F8] text-[var(--color-forest)] border border-gray-200 px-4 py-3 rounded-2xl flex flex-col items-center justify-center flex-1 md:min-w-[110px]">
              <div className="flex items-center gap-1 text-xl font-bold text-gray-400">
                - <Star size={16} className="relative top-[-1px]" />
              </div>
              <div className="text-xs text-gray-500 border-b border-gray-200 pb-1 mb-1 w-full text-center">0 Ratings</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">Delivery</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex gap-4">
            <MapPin className="text-[var(--color-leaf)] shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-[var(--color-ink)] mb-1">Location</h3>
              <p className="text-sm text-[var(--color-brown)] leading-relaxed">Strand Road, Dalhousie BBD Bagh, Kolkata</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Clock className="text-[var(--color-leaf)] shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-[var(--color-ink)] mb-1">Timing</h3>
              <p className="text-sm text-[var(--color-brown)] leading-relaxed">
                <span className="text-[#24963F] font-medium">Open now</span><br/>
                11am – 11pm (Today)
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <IndianRupee className="text-[var(--color-leaf)] shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-[var(--color-ink)] mb-1">Cost</h3>
              <p className="text-sm text-[var(--color-brown)] leading-relaxed">₹1,200 for two</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Phone className="text-[var(--color-leaf)] shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-[var(--color-ink)] mb-1">Contact</h3>
              <p className="text-sm text-[var(--color-brown)] leading-relaxed">+91 92309 71345</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
