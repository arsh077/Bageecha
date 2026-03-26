import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { store, Booking } from "../../store";
import { Check, X } from "lucide-react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    setBookings(store.getBookings().reverse()); // Newest first
  };

  const handleStatusUpdate = (id: string, status: Booking['status']) => {
    store.updateBookingStatus(id, status);
    loadBookings();
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-[var(--color-forest)]">Manage Bookings</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {bookings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No bookings found yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                  <th className="p-4 font-medium border-b">Date & Time</th>
                  <th className="p-4 font-medium border-b">Customer</th>
                  <th className="p-4 font-medium border-b">Guests</th>
                  <th className="p-4 font-medium border-b">Requests</th>
                  <th className="p-4 font-medium border-b">Status</th>
                  <th className="p-4 font-medium border-b">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{booking.date}</div>
                      <div className="text-sm text-gray-500">{booking.time}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{booking.name}</div>
                      <div className="text-sm text-gray-500">{booking.phone}</div>
                      <div className="text-sm text-gray-400">{booking.email}</div>
                    </td>
                    <td className="p-4 text-gray-700">{booking.guests}</td>
                    <td className="p-4 text-gray-600 max-w-xs truncate" title={booking.requests}>
                      {booking.requests || '-'}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {booking.status === 'pending' && (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                            className="p-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                            title="Confirm"
                          >
                            <Check size={16} />
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                            className="p-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                            title="Cancel"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
