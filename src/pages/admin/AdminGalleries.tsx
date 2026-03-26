import { useEffect, useState, useRef } from "react";
import AdminLayout from "./AdminLayout";
import { store, MemoryImage, CustomerImage, LocationImage } from "../../store";
import { Plus, Trash2, Upload } from "lucide-react";

export default function AdminGalleries() {
  const [activeTab, setActiveTab] = useState<'memory' | 'customer' | 'location'>('memory');

  // Memory
  const [memoryImages, setMemoryImages] = useState<MemoryImage[]>([]);
  const [newMemory, setNewMemory] = useState({ img: '', caption: '' });
  const memoryFileRef = useRef<HTMLInputElement>(null);

  // Customer
  const [customerImages, setCustomerImages] = useState<CustomerImage[]>([]);
  const [newCustomer, setNewCustomer] = useState({ img: '' });
  const customerFileRef = useRef<HTMLInputElement>(null);

  // Location
  const [locationImages, setLocationImages] = useState<LocationImage[]>([]);
  const [newLocation, setNewLocation] = useState({ img: '', title: '' });
  const locationFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMemoryImages(store.getMemoryGallery());
    setCustomerImages(store.getCustomerGallery());
    setLocationImages(store.getLocationGallery());
  }, []);

  // Helper to convert file to Base64
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handlers for Memory
  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemory.img) return;
    const newItem: MemoryImage = {
      id: Date.now().toString(),
      img: newMemory.img,
      caption: newMemory.caption,
      rotation: Math.floor(Math.random() * 10) - 5 // Random rotation -5 to +5
    };
    const updated = [...memoryImages, newItem];
    setMemoryImages(updated);
    store.setMemoryGallery(updated);
    setNewMemory({ img: '', caption: '' });
  };

  const handleDeleteMemory = (id: string) => {
    const updated = memoryImages.filter(img => img.id !== id);
    setMemoryImages(updated);
    store.setMemoryGallery(updated);
  };

  // Handlers for Customer
  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.img) return;
    const newItem: CustomerImage = {
      id: Date.now().toString(),
      img: newCustomer.img,
    };
    const updated = [newItem, ...customerImages]; // Add to front
    setCustomerImages(updated);
    store.setCustomerGallery(updated);
    setNewCustomer({ img: '' });
  };

  const handleDeleteCustomer = (id: string) => {
    const updated = customerImages.filter(img => img.id !== id);
    setCustomerImages(updated);
    store.setCustomerGallery(updated);
  };

  // Handlers for Location
  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocation.img || !newLocation.title) return;
    const newItem: LocationImage = {
      id: Date.now().toString(),
      img: newLocation.img,
      title: newLocation.title,
    };
    const updated = [...locationImages, newItem];
    setLocationImages(updated);
    store.setLocationGallery(updated);
    setNewLocation({ img: '', title: '' });
  };

  const handleDeleteLocation = (id: string) => {
    const updated = locationImages.filter(img => img.id !== id);
    setLocationImages(updated);
    store.setLocationGallery(updated);
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-serif text-[var(--color-forest)] mb-6">Manage Galleries</h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-8">
        {(['memory', 'customer', 'location'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-4 font-medium capitalize transition-colors ${
              activeTab === tab 
                ? 'border-b-2 border-[var(--color-leaf)] text-[var(--color-forest)]' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab} Gallery
          </button>
        ))}
      </div>

      {/* Memory Gallery Tab */}
      {activeTab === 'memory' && (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium mb-4">Add New Memory Pin</h3>
            <form onSubmit={handleAddMemory} className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="block text-sm text-gray-600 mb-1">Image URL or Upload</label>
                <div className="flex gap-2">
                  <input 
                    type="url" required={!newMemory.img} value={newMemory.img} onChange={e => setNewMemory({...newMemory, img: e.target.value})}
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]"
                    placeholder="https://example.com/image.jpg"
                  />
                  <input 
                    type="file" accept="image/*" className="hidden" ref={memoryFileRef}
                    onChange={(e) => handleFileUpload(e, (base64) => setNewMemory({...newMemory, img: base64}))}
                  />
                  <button type="button" onClick={() => memoryFileRef.current?.click()} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-gray-600">
                    <Upload size={18} /> Upload
                  </button>
                </div>
              </div>
              <div className="flex-1 w-full">
                <label className="block text-sm text-gray-600 mb-1">Caption</label>
                <input 
                  type="text" required value={newMemory.caption} onChange={e => setNewMemory({...newMemory, caption: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]"
                  placeholder="Best chai ever..."
                />
              </div>
              <button type="submit" className="w-full md:w-auto px-6 py-2 bg-[var(--color-leaf)] text-white rounded-lg hover:bg-[#326649] flex items-center justify-center gap-2 h-[42px]">
                <Plus size={18} /> Add
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {memoryImages.map((item) => (
              <div key={item.id} className="bg-white p-3 rounded-xl shadow-sm border relative group">
                <img src={item.img} alt={item.caption} className="w-full aspect-square object-cover rounded-lg mb-3" />
                <p className="text-sm font-serif text-center truncate px-2">{item.caption}</p>
                <button 
                  onClick={() => handleDeleteMemory(item.id)}
                  className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Customer Gallery Tab */}
      {activeTab === 'customer' && (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium mb-4">Add Customer Photo (Social Feed)</h3>
            <form onSubmit={handleAddCustomer} className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="block text-sm text-gray-600 mb-1">Image URL or Upload</label>
                <div className="flex gap-2">
                  <input 
                    type="url" required={!newCustomer.img} value={newCustomer.img} onChange={e => setNewCustomer({img: e.target.value})}
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]"
                    placeholder="https://example.com/image.jpg"
                  />
                  <input 
                    type="file" accept="image/*" className="hidden" ref={customerFileRef}
                    onChange={(e) => handleFileUpload(e, (base64) => setNewCustomer({img: base64}))}
                  />
                  <button type="button" onClick={() => customerFileRef.current?.click()} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-gray-600">
                    <Upload size={18} /> Upload
                  </button>
                </div>
              </div>
              <button type="submit" className="w-full md:w-auto px-6 py-2 bg-[var(--color-leaf)] text-white rounded-lg hover:bg-[#326649] flex items-center justify-center gap-2 h-[42px]">
                <Plus size={18} /> Add
              </button>
            </form>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {customerImages.map((item) => (
              <div key={item.id} className="relative group rounded-xl overflow-hidden aspect-square">
                <img src={item.img} alt="Customer" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={() => handleDeleteCustomer(item.id)} className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Location Gallery Tab */}
      {activeTab === 'location' && (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium mb-4">Add Location Area</h3>
            <form onSubmit={handleAddLocation} className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="block text-sm text-gray-600 mb-1">Image URL or Upload</label>
                <div className="flex gap-2">
                  <input 
                    type="url" required={!newLocation.img} value={newLocation.img} onChange={e => setNewLocation({...newLocation, img: e.target.value})}
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]"
                    placeholder="https://example.com/image.jpg"
                  />
                  <input 
                    type="file" accept="image/*" className="hidden" ref={locationFileRef}
                    onChange={(e) => handleFileUpload(e, (base64) => setNewLocation({...newLocation, img: base64}))}
                  />
                  <button type="button" onClick={() => locationFileRef.current?.click()} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-gray-600">
                    <Upload size={18} /> Upload
                  </button>
                </div>
              </div>
              <div className="flex-1 w-full">
                <label className="block text-sm text-gray-600 mb-1">Title</label>
                <input 
                  type="text" required value={newLocation.title} onChange={e => setNewLocation({...newLocation, title: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]"
                  placeholder="e.g. Balcony"
                />
              </div>
              <button type="submit" className="w-full md:w-auto px-6 py-2 bg-[var(--color-leaf)] text-white rounded-lg hover:bg-[#326649] flex items-center justify-center gap-2 h-[42px]">
                <Plus size={18} /> Add
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locationImages.map((item) => (
              <div key={item.id} className="relative group rounded-2xl overflow-hidden aspect-[3/4]">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h4 className="text-2xl font-serif text-white">{item.title}</h4>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={() => handleDeleteLocation(item.id)} className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
