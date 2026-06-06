import React, { useState } from 'react';
import { Search, Sparkles, Plus, Edit2, Trash2, X } from 'lucide-react';

export const MENU_ITEMS = [
  {
    id: 'm1',
    name: 'Midnight Espresso',
    description: 'Double shot espresso panggangan gelap khas kami dengan crema yang kaya dan intens.',
    price: 32000,
    category: 'espresso',
    calories: 10,
    badge: 'Klasik',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'm2',
    name: 'Velvet Flat White',
    description: 'Espresso seimbang dengan susu whole milk berbusa mikro yang manis dan lembut.',
    price: 45000,
    category: 'espresso',
    calories: 120,
    badge: 'Populer',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'm3',
    name: 'Smoked Caramel Macchiato',
    description: 'Susu lembut beludru, sirup vanilla bean, espresso segar, dan siraman karamel asap yang memikat.',
    price: 52000,
    category: 'signatures',
    calories: 250,
    badge: 'Terlaris',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'm4',
    name: 'Golden Crema Latte',
    description: 'Susu oat hangat, espresso double shot, madu organik, dan taburan debu emas murni yang lembut.',
    price: 55000,
    category: 'signatures',
    calories: 180,
    badge: 'Khas',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'm5',
    name: 'Midnight Cold Brew',
    description: 'Kopi seduh dingin 12 jam dengan rasa halus, ringan, dan menyegarkan.',
    price: 42000,
    category: 'cold brew',
    calories: 5,
    badge: 'Dingin',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'm6',
    name: 'Vanilla Iced Latte',
    description: 'Perpaduan espresso, susu dingin, dan vanilla alami yang manis lembut.',
    price: 48000,
    category: 'cold brew',
    calories: 140,
    badge: 'Baru',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'm7',
    name: 'Matcha Cloud Latte',
    description: 'Matcha organik premium dengan susu lembut dan busa cream yang menyehatkan.',
    price: 45000,
    category: 'tea',
    calories: 130,
    badge: 'Organik',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'm8',
    name: 'Berry Hibiscus Refresher',
    description: 'Infused hibiscus & berry segar dengan sentuhan lemon. Segar, ringan, dan bebas kafein.',
    price: 42000,
    category: 'tea',
    calories: 45,
    badge: 'Bebas Kafein',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'm9',
    name: 'Pistachio Croissant',
    description: 'Croissant renyah berlapis yang dipanggang setiap hari, diisi dan diolesi pasta pistacio Persia yang manis.',
    price: 42000,
    category: 'pastries',
    calories: 380,
    badge: 'Pilihan Chef',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'm10',
    name: 'Midnight Dark Cookie',
    description: 'Kue cokelat hitam ganda mirip fudge dengan potongan cokelat Belgia 72% yang melimpah.',
    price: 32000,
    category: 'pastries',
    calories: 290,
    badge: 'Baru Dipanggang',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'Semua Menu' },
  { id: 'espresso', label: 'Klasik Espresso' },
  { id: 'cold brew', label: 'Cold Brew Dingin' },
  { id: 'signatures', label: 'Seduhan Khas' },
  { id: 'tea', label: 'Teh Artisan' },
  { id: 'pastries', label: 'Kue Segar' }
];

export const formatRupiah = (amount) => {
  return 'Rp ' + Math.round(amount).toLocaleString('id-ID');
};

export default function MenuGrid({ menuItems = [], onCreateItem, onUpdateItem, onDeleteItem, onSelectItem }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Form Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('espresso');
  const [calories, setCalories] = useState(0);
  const [badge, setBadge] = useState('');
  const [image, setImage] = useState('');

  // Filter products based on search query and active category
  const filteredItems = (menuItems.length > 0 ? menuItems : MENU_ITEMS).filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openCreateModal = () => {
    setEditingItem(null);
    setName('');
    setDescription('');
    setPrice(35000);
    setCategory('espresso');
    setCalories(120);
    setBadge('Baru');
    setImage('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80');
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setCategory(item.category);
    setCalories(item.calories || 0);
    setBadge(item.badge || '');
    setImage(item.image);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    const itemData = {
      id: editingItem ? editingItem.id : `m_${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      category,
      calories: Number(calories),
      badge: badge.trim() || undefined,
      image: image.trim() || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80'
    };

    if (editingItem) {
      onUpdateItem(itemData);
    } else {
      onCreateItem(itemData);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="menu-page max-w-layout">
      {/* Search and Category Filters Bar */}
      <div className="filters-bar" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Category Scroll Bar */}
          <div className="categories-list" style={{ flex: 1 }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Admin Control Trigger */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`btn-outline ${isAdminMode ? 'active' : ''}`}
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', borderColor: isAdminMode ? 'var(--gold)' : 'rgba(200,162,124,0.2)' }}
            >
              {isAdminMode ? 'Keluar Kelola' : 'Kelola Menu (Admin)'}
            </button>
            {isAdminMode && (
              <button
                onClick={openCreateModal}
                className="btn-gold"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <Plus className="w-4 h-4" /> Tambah Menu
              </button>
            )}
          </div>
        </div>

        {/* Search Input Box */}
        <div className="search-box-wrapper" style={{ alignSelf: 'flex-end', width: '100%', maxWidth: '350px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari menu..."
            className="search-input"
          />
          <Search />
        </div>
      </div>

      {/* Grid Menu Output */}
      {filteredItems.length > 0 ? (
        <div className="menu-grid-items">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (isAdminMode) {
                  openEditModal(item);
                } else {
                  onSelectItem(item);
                }
              }}
              className={`glass-card menu-item-card ${isAdminMode ? 'admin-card' : ''}`}
              style={{ position: 'relative' }}
            >
              {/* Admin overlays */}
              {isAdminMode && (
                <div style={{ display: 'flex', gap: '0.5rem', position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); openEditModal(item); }} 
                    className="cart-btn" 
                    title="Ubah Item"
                    style={{ width: '32px', height: '32px', padding: 0, borderRadius: '50%', background: 'var(--gold)', color: 'var(--bg-dark)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); if (window.confirm(`Hapus produk "${item.name}" dari menu?`)) onDeleteItem(item.id); }} 
                    className="cart-btn" 
                    title="Hapus Item"
                    style={{ width: '32px', height: '32px', padding: 0, borderRadius: '50%', background: '#ef4444', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Card Top: Image */}
              <div className="card-media">
                {/* Product Image */}
                <img 
                  className="card-media-image" 
                  src={item.image} 
                  alt={item.name} 
                  loading="lazy"
                />

                {/* Badge Overlay */}
                {item.badge && (
                  <span className="card-badge-overlay">
                    <Sparkles />
                    {item.badge}
                  </span>
                )}

                {/* Calories info */}
                <span className="card-info-row">
                  {item.calories} kkal
                </span>
              </div>

              {/* Card Bottom: Content */}
              <div className="card-content-wrap">
                <div>
                  <h3 className="card-title">
                    {item.name}
                  </h3>
                  <p className="card-desc">
                    {item.description}
                  </p>
                </div>

                <div className="card-footer-row">
                  <span className="card-price">
                    {formatRupiah(item.price)}
                  </span>
                  
                  <span className="card-action-btn">
                    {isAdminMode ? 'Ubah Rincian' : 'Sesuaikan'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state-container">
          <p>Tidak ada minuman artisan atau kue segar yang cocok dengan pencarian Anda.</p>
        </div>
      )}

      {/* Form Modal: Create / Edit Product */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box glass-panel" style={{ maxWidth: '600px', width: '90%' }}>
            
            <div className="modal-header">
              <div>
                <h3 className="modal-title">{editingItem ? 'Ubah Rincian Menu' : 'Tambah Menu Baru'}</h3>
                <p className="modal-subtitle">Format rincian produk kopi atau makanan pendamping</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="modal-close-btn" aria-label="Tutup"><X /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                {/* Product Name */}
                <div>
                  <label className="selector-label">Nama Produk</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama kopi/bakery..."
                    className="custom-select"
                    style={{ width: '100%', background: 'var(--bg-cream)' }}
                  />
                </div>

                {/* Price and Category */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '150px' }}>
                    <label className="selector-label">Harga Jual (Rp)</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Contoh: 35000"
                      className="custom-select"
                      style={{ width: '100%', background: 'var(--bg-cream)' }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: '150px' }}>
                    <label className="selector-label">Kategori Menu</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="custom-select"
                      style={{ width: '100%' }}
                    >
                      <option value="espresso">Klasik Espresso</option>
                      <option value="cold brew">Cold Brew Dingin</option>
                      <option value="signatures">Seduhan Khas</option>
                      <option value="tea">Teh Artisan</option>
                      <option value="pastries">Kue Segar (Bakery)</option>
                    </select>
                  </div>
                </div>

                {/* Calories and Badge */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '150px' }}>
                    <label className="selector-label">Estimasi Kalori (kkal)</label>
                    <input
                      type="number"
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      placeholder="Contoh: 150"
                      className="custom-select"
                      style={{ width: '100%', background: 'var(--bg-cream)' }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: '150px' }}>
                    <label className="selector-label">Label Sorotan Badge (Opsional)</label>
                    <input
                      type="text"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      placeholder="Contoh: Populer, Terlaris, Khas"
                      className="custom-select"
                      style={{ width: '100%', background: 'var(--bg-cream)' }}
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="selector-label">URL Tautan Gambar Ilustrasi</label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Masukkan url gambar..."
                    className="custom-select"
                    style={{ width: '100%', background: 'var(--bg-cream)' }}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="selector-label">Deskripsi Rasa & Bahan</label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tulis detail biji kopi, rasa karamel, or notes rasa..."
                    className="custom-textarea"
                    style={{ width: '100%', background: 'var(--bg-cream)' }}
                  />
                </div>

              </div>

              {/* Footer pricing */}
              <div className="modal-footer">
                <div>
                  <span className="modal-price-label">Rencana Harga</span>
                  <div className="modal-price-val" style={{ fontSize: '1.25rem' }}>
                    {formatRupiah(price || 0)}
                  </div>
                </div>

                <button type="submit" className="btn-gold modal-add-btn">
                  {editingItem ? 'Simpan Perubahan' : 'Tambah ke Menu'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

