import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { store } from "../../store";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    bookings: 0,
    memoryPhotos: 0,
    customerPhotos: 0,
    locationPhotos: 0,
  });

  useEffect(() => {
    setStats({
      bookings: store.getBookings().length,
      memoryPhotos: store.getMemoryGallery().length,
      customerPhotos: store.getCustomerGallery().length,
      locationPhotos: store.getLocationGallery().length,
    });
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-serif text-[var(--color-forest)] mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Bookings" value={stats.bookings} color="bg-blue-50 text-blue-700" />
        <StatCard title="Memory Photos" value={stats.memoryPhotos} color="bg-green-50 text-green-700" />
        <StatCard title="Customer Photos" value={stats.customerPhotos} color="bg-purple-50 text-purple-700" />
        <StatCard title="Location Photos" value={stats.locationPhotos} color="bg-orange-50 text-orange-700" />
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, color }: { title: string, value: number, color: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
      <h3 className="text-gray-500 font-medium mb-2">{title}</h3>
      <div className={`text-4xl font-bold ${color.split(' ')[1]}`}>
        {value}
      </div>
    </div>
  );
}
