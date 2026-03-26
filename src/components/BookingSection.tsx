import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

export default function BookingSection() {
  const [seatingType, setSeatingType] = useState<string>('Indoor');

  return (
    <section id="booking" className="max-w-3xl mx-auto px-6 py-24">
      <div 
        className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_40px_rgba(31,61,43,0.08)]"
      >
        <h2 className="text-4xl text-center mb-8 font-serif">Reserve Your Spot</h2>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <Input type="date" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Time</label>
              <Select>
                <option>Morning (9 AM - 12 PM)</option>
                <option>Afternoon (12 PM - 4 PM)</option>
                <option>Evening (4 PM - 8 PM)</option>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-3">Seating Preference</label>
            <div className="flex flex-wrap gap-4">
              {['Indoor', 'Verandah', 'Terrace'].map((type) => (
                <Button 
                  key={type}
                  type="button"
                  variant={seatingType === type ? 'primary' : 'secondary'} 
                  className="flex-1 min-w-[120px]"
                  onClick={() => setSeatingType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Button className="w-full text-lg">🌿 Reserve Your Spot</Button>
          </div>
        </form>
      </div>
    </section>
  );
}
