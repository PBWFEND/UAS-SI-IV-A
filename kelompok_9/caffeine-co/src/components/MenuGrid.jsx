import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

export const MENU_ITEMS = [
  {
    id: 'm1',
    name: 'Midnight Espresso',
    description: 'Double shot espresso panggangan gelap khas kami dengan crema yang kaya dan intens.',
    price: 32000,
    category: 'espresso',
    calories: 10,
    badge: 'Klasik',
    image: '/images/midnight_espresso.png'
  },
  {
    id: 'm2',
    name: 'Velvet Flat White',
    description: 'Espresso seimbang dengan susu whole milk berbusa mikro yang manis dan lembut.',
    price: 45000,
    category: 'espresso',
    calories: 120,
    badge: 'Populer',
    image: '/images/velvet_flat_white.png'
  },
  {
    id: 'm3',
    name: 'Smoked Caramel Macchiato',
    description: 'Susu lembut beludru, sirup vanilla bean, espresso segar, dan siraman karamel asap yang memikat.',
    price: 52000,
    category: 'signatures',
    calories: 250,
    badge: 'Terlaris',
    image: '/images/caramel_macchiato.png'
  },
  {
    id: 'm4',
    name: 'Golden Crema Latte',
    description: 'Susu oat hangat, espresso double shot, madu organik, dan taburan debu emas murni yang lembut.',
    price: 55000,
    category: 'signatures',
    calories: 180,
    badge: 'Khas',
    image: '/images/golden_crema_latte.png'
  },
  {
    id: 'm5',
    name: 'Midnight Cold Brew',
    description: 'Kopi seduh dingin 12 jam dengan rasa halus, ringan, dan menyegarkan.',
    price: 42000,
    category: 'cold brew',
    calories: 5,
    badge: 'Dingin',
    image: '/images/midnight_cold_brew.png'
  },
  {
    id: 'm6',
    name: 'Vanilla Iced Latte',
    description: 'Perpaduan espresso, susu dingin, dan vanilla alami yang manis lembut.',
    price: 48000,
    category: 'cold brew',
    calories: 140,
    badge: 'Baru',
    image: '/images/vanilla_iced_latte.png'
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

export default function MenuGrid({ onSelectItem }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search query and active category
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="menu-page max-w-layout">
      {/* Search and Category Filters Bar */}
      <div className="filters-bar">
        {/* Category Scroll Bar */}
        <div className="categories-list">
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

        {/* Search Input Box */}
        <div className="search-box-wrapper">
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
              onClick={() => onSelectItem(item)}
              className="glass-card menu-item-card"
            >
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
                    Sesuaikan
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
    </div>
  );
}
