export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  requests: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface MemoryImage {
  id: string;
  img: string;
  caption: string;
  rotation: number;
}

export interface CustomerImage {
  id: string;
  img: string;
}

export interface LocationImage {
  id: string;
  title: string;
  img: string;
}

// Initial Default Data
const initialMemoryGallery: MemoryImage[] = [
  { id: '1', img: "https://picsum.photos/seed/chai/400/400", caption: "Best chai ever ☕", rotation: -3 },
  { id: '2', img: "https://picsum.photos/seed/plants/400/400", caption: "Found my peace here 🌿", rotation: 2 },
  { id: '3', img: "https://picsum.photos/seed/friends/400/400", caption: "Sunday evenings ✨", rotation: -1 }
];

const initialCustomerGallery: CustomerImage[] = Array.from({ length: 9 }).map((_, i) => ({
  id: `cust-${i}`,
  img: `https://picsum.photos/seed/cafe${i}/400/400`
}));

const initialLocationGallery: LocationImage[] = [
  { id: 'loc-1', title: "Indoor", img: "https://picsum.photos/seed/indoor/600/800" },
  { id: 'loc-2', title: "Verandah", img: "https://picsum.photos/seed/verandah/600/800" },
  { id: 'loc-3', title: "Terrace", img: "https://picsum.photos/seed/terrace/600/800" }
];

export const store = {
  getBookings: (): Booking[] => {
    const data = localStorage.getItem('bageecha_bookings');
    return data ? JSON.parse(data) : [];
  },
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const bookings = store.getBookings();
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    localStorage.setItem('bageecha_bookings', JSON.stringify(bookings));
  },
  updateBookingStatus: (id: string, status: Booking['status']) => {
    const bookings = store.getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index > -1) {
      bookings[index].status = status;
      localStorage.setItem('bageecha_bookings', JSON.stringify(bookings));
    }
  },

  getMemoryGallery: (): MemoryImage[] => {
    const data = localStorage.getItem('bageecha_memory');
    return data ? JSON.parse(data) : initialMemoryGallery;
  },
  setMemoryGallery: (gallery: MemoryImage[]) => {
    localStorage.setItem('bageecha_memory', JSON.stringify(gallery));
  },

  getCustomerGallery: (): CustomerImage[] => {
    const data = localStorage.getItem('bageecha_customer');
    return data ? JSON.parse(data) : initialCustomerGallery;
  },
  setCustomerGallery: (gallery: CustomerImage[]) => {
    localStorage.setItem('bageecha_customer', JSON.stringify(gallery));
  },

  getLocationGallery: (): LocationImage[] => {
    const data = localStorage.getItem('bageecha_location');
    return data ? JSON.parse(data) : initialLocationGallery;
  },
  setLocationGallery: (gallery: LocationImage[]) => {
    localStorage.setItem('bageecha_location', JSON.stringify(gallery));
  }
};
