import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Image as ImageIcon, CalendarCheck, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Bookings", path: "/admin/bookings", icon: CalendarCheck },
    { name: "Galleries", path: "/admin/galleries", icon: ImageIcon },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-serif text-[var(--color-forest)] font-bold">Bageecha Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? "bg-[var(--color-leaf)] text-white shadow-md" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-[var(--color-forest)]"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Back to Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
