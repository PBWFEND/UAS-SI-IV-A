import React, { useState, useEffect } from 'react';
import { 
  Car, 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  Check, 
  Calendar, 
  X, 
  Filter, 
  ArrowUpDown,
  AlertTriangle,
  Heart,
  Star,
  Sparkles,
  Scale,
  Wallet,
  Coins,
  TrendingUp,
  Fuel,
  Users,
  Settings
} from 'lucide-react';

// Preset cars with realistic details to help user quickly test/add new dream cars
const PRESETS = [
  {
    brand: 'Porsche',
    model: '911 GT3 RS',
    category: 'Sport',
    fuelType: 'Bensin',
    seats: 2,
    year: 2023,
    price: 6500000000,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80'
  },
  {
    brand: 'Tesla',
    model: 'Model S Plaid',
    category: 'Electric',
    fuelType: 'Listrik',
    seats: 5,
    year: 2024,
    price: 2800000000,
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=600&q=80'
  },
  {
    brand: 'Toyota',
    model: 'Land Cruiser 300',
    category: 'SUV',
    fuelType: 'Diesel',
    seats: 7,
    year: 2024,
    price: 2500000000,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/2021_Toyota_Land_Cruiser_300_%28Russia%29_front_view.jpg'
  },
  {
    brand: 'Honda',
    model: 'Civic Type R FL5',
    category: 'Sport',
    fuelType: 'Bensin',
    seats: 4,
    year: 2023,
    price: 1400000000,
    imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=600&q=80'
  },
  {
    brand: 'Hyundai',
    model: 'Ioniq 6 Signature',
    category: 'Electric',
    fuelType: 'Listrik',
    seats: 5,
    year: 2023,
    price: 1220000000,
    imageUrl: 'https://images.unsplash.com/photo-1669023414166-a4cf7c0fd1f2?auto=format&fit=crop&w=600&q=80'
  },
  {
    brand: 'Mazda',
    model: 'CX-60 Kuro',
    category: 'SUV',
    fuelType: 'Hibrida',
    seats: 5,
    year: 2023,
    price: 799000000,
    imageUrl: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=600&q=80'
  },
  {
    brand: 'Wuling',
    model: 'Air EV Lite',
    category: 'Electric',
    fuelType: 'Listrik',
    seats: 4,
    year: 2023,
    price: 190000000,
    imageUrl: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=600&q=80'
  }
];

// Initial mock data if localStorage is empty
const INITIAL_CARS = [
  {
    id: '1',
    brand: 'Porsche',
    model: '911 GT3 RS',
    category: 'Sport',
    fuelType: 'Bensin',
    seats: 2,
    year: 2023,
    price: 6500000000,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    isWishlisted: true,
    wishlistNotes: 'Mobil sport impian masa kecil. Harus warna GT Silver Metallic!',
    wishlistPriority: 5,
    wishlistSavedAmount: 1500000000
  },
  {
    id: '2',
    brand: 'Tesla',
    model: 'Model S Plaid',
    category: 'Electric',
    fuelType: 'Listrik',
    seats: 5,
    year: 2024,
    price: 2800000000,
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=600&q=80',
    isWishlisted: true,
    wishlistNotes: 'Akselerasi 0-100 km/jam di bawah 2 detik. Cocok buat harian ramah lingkungan.',
    wishlistPriority: 4,
    wishlistSavedAmount: 800000000
  },
  {
    id: '3',
    brand: 'Toyota',
    model: 'Land Cruiser 300',
    category: 'SUV',
    fuelType: 'Diesel',
    seats: 7,
    year: 2024,
    price: 2500000000,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/2021_Toyota_Land_Cruiser_300_%28Russia%29_front_view.jpg',
    isWishlisted: false,
    wishlistNotes: '',
    wishlistPriority: 3,
    wishlistSavedAmount: 0
  },
  {
    id: '4',
    brand: 'Honda',
    model: 'Civic Type R FL5',
    category: 'Sport',
    fuelType: 'Bensin',
    seats: 4,
    year: 2023,
    price: 1400000000,
    imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=600&q=80',
    isWishlisted: true,
    wishlistNotes: 'Manual gearbox terbaik di kelasnya. Untuk track day di Sentul.',
    wishlistPriority: 4,
    wishlistSavedAmount: 1400000000
  },
  {
    id: '5',
    brand: 'Hyundai',
    model: 'Ioniq 6 Signature',
    category: 'Electric',
    fuelType: 'Listrik',
    seats: 5,
    year: 2023,
    price: 1220000000,
    imageUrl: 'https://images.unsplash.com/photo-1669023414166-a4cf7c0fd1f2?auto=format&fit=crop&w=600&q=80',
    isWishlisted: false,
    wishlistNotes: '',
    wishlistPriority: 3,
    wishlistSavedAmount: 0
  },
  {
    id: '6',
    brand: 'Mazda',
    model: 'CX-60 Kuro',
    category: 'SUV',
    fuelType: 'Hibrida',
    seats: 5,
    year: 2023,
    price: 799000000,
    imageUrl: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=600&q=80',
    isWishlisted: true,
    wishlistNotes: 'Desain Kodo mewah banget & mesin 6 silinder inline turbo.',
    wishlistPriority: 3,
    wishlistSavedAmount: 400000000
  }
];

const DEFAULT_FORM_DATA = {
  brand: '',
  model: '',
  category: 'Sedan',
  price: '',
  fuelType: 'Bensin',
  seats: '5',
  year: new Date().getFullYear(),
  imageUrl: ''
};

const DEFAULT_WISHLIST_FORM_DATA = {
  notes: '',
  priority: 3,
  savedAmount: 0
};

function App() {
  // Syncing states with LocalStorage (supporting fallback from old VeloDream storage)
  const [cars, setCars] = useState(() => {
    const saved = localStorage.getItem('mygarasi_wishlist_cars') || localStorage.getItem('velo_wishlist_cars');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map(car => {
          if (car.brand === 'Toyota' && car.model === 'Land Cruiser 300' && car.imageUrl.includes('1594568284297')) {
            return {
              ...car,
              imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/2021_Toyota_Land_Cruiser_300_%28Russia%29_front_view.jpg'
            };
          }
          return car;
        });
      } catch (e) {
        // ignore
      }
    }
    return INITIAL_CARS;
  });

  const [globalSavings, setGlobalSavings] = useState(() => {
    const saved = localStorage.getItem('mygarasi_wishlist_global_savings') || localStorage.getItem('velo_wishlist_global_savings');
    return saved ? Number(saved) : 500000000;
  });

  const [monthlySavings, setMonthlySavings] = useState(() => {
    const saved = localStorage.getItem('mygarasi_wishlist_monthly_savings') || localStorage.getItem('velo_wishlist_monthly_savings');
    return saved ? Number(saved) : 25000000;
  });

  // Navigation state
  const [activeTab, setActiveTab] = useState('wishlist');

  // Filters & Sorting state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [sortBy, setSortBy] = useState('default');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditCarModalOpen, setIsEditCarModalOpen] = useState(false);
  const [isEditWishlistModalOpen, setIsEditWishlistModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);

  // Form states
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [wishlistFormData, setWishlistFormData] = useState(DEFAULT_WISHLIST_FORM_DATA);
  const [formError, setFormError] = useState('');
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(null);

  // Sync to local storage on changes
  useEffect(() => {
    localStorage.setItem('mygarasi_wishlist_cars', JSON.stringify(cars));
  }, [cars]);

  useEffect(() => {
    localStorage.setItem('mygarasi_wishlist_global_savings', globalSavings.toString());
  }, [globalSavings]);

  useEffect(() => {
    localStorage.setItem('mygarasi_wishlist_monthly_savings', monthlySavings.toString());
  }, [monthlySavings]);

  // Format Rupiah (Rp)
  const formatCredits = (num) => {
    const formatted = new Intl.NumberFormat('id-ID', {
      maximumFractionDigits: 0
    }).format(num);
    return `Rp ${formatted}`;
  };

  // Helper to determine Forza Performance Index (PI) Badge
  const getPerformanceIndex = (car) => {
    const price = car.price;
    const cat = car.category.toLowerCase();
    
    if (cat === 'sport' && price >= 5000000000) {
      return { classCode: 'X', score: 999, className: 'pi-x' };
    } else if (cat === 'sport' && price >= 2000000000) {
      return { classCode: 'S2', score: 985, className: 'pi-s2' };
    } else if (cat === 'sport' || price >= 1500000000) {
      return { classCode: 'S1', score: 890, className: 'pi-s1' };
    } else if (cat === 'electric' || price >= 1000000000) {
      return { classCode: 'A', score: 798, className: 'pi-a' };
    } else if (cat === 'suv' || price >= 700000000) {
      return { classCode: 'B', score: 685, className: 'pi-b' };
    } else if (price >= 300000000) {
      return { classCode: 'C', score: 550, className: 'pi-c' };
    } else {
      return { classCode: 'D', score: 480, className: 'pi-d' };
    }
  };

  // Handle Input Changes for Spec Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (['brand', 'model', 'category', 'fuelType', 'seats', 'imageUrl', 'price', 'year'].includes(name)) {
      setSelectedPresetIndex(null);
    }
  };

  // Quick Preset Selection in Form
  const applyPreset = (preset, index) => {
    setSelectedPresetIndex(index);
    setFormData({
      brand: preset.brand,
      model: preset.model,
      category: preset.category,
      fuelType: preset.fuelType,
      seats: preset.seats.toString(),
      year: preset.year,
      price: preset.price,
      imageUrl: preset.imageUrl
    });
  };

  // Validate Specification Form
  const validateForm = () => {
    if (!formData.brand.trim()) return 'Merek mobil tidak boleh kosong';
    if (!formData.model.trim()) return 'Model mobil tidak boleh kosong';
    if (!formData.price || Number(formData.price) <= 0) return 'Harga mobil harus lebih dari Rp 0';
    if (!formData.year || Number(formData.year) < 1900 || Number(formData.year) > new Date().getFullYear() + 2) {
      return `Tahun pembuatan harus diantara 1900 dan ${new Date().getFullYear() + 2}`;
    }
    if (!formData.seats || Number(formData.seats) <= 0) return 'Kapasitas tempat duduk tidak valid';
    return '';
  };

  // Add Dream Car to Catalog
  const handleAddCar = (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setFormError(error);
      return;
    }

    const newCar = {
      id: Date.now().toString(),
      brand: formData.brand.trim(),
      model: formData.model.trim(),
      category: formData.category,
      price: Number(formData.price),
      fuelType: formData.fuelType,
      seats: Number(formData.seats),
      year: Number(formData.year),
      imageUrl: formData.imageUrl.trim() || 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=600&q=80',
      isWishlisted: false,
      wishlistNotes: '',
      wishlistPriority: 3,
      wishlistSavedAmount: 0,
      isCustom: true
    };

    setCars(prev => [newCar, ...prev]);
    setIsAddModalOpen(false);
    resetForm();
  };

  // Edit Specification Car details
  const openEditCarModal = (car) => {
    setEditingCar(car);
    setFormData({
      brand: car.brand,
      model: car.model,
      category: car.category,
      price: car.price,
      fuelType: car.fuelType,
      seats: car.seats.toString(),
      year: car.year,
      imageUrl: car.imageUrl
    });
    setFormError('');
    setIsEditCarModalOpen(true);
  };

  const handleEditCarSpecs = (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setFormError(error);
      return;
    }

    setCars(prev => prev.map(car => {
      if (car.id === editingCar.id) {
        return {
          ...car,
          brand: formData.brand.trim(),
          model: formData.model.trim(),
          category: formData.category,
          price: Number(formData.price),
          fuelType: formData.fuelType,
          seats: Number(formData.seats),
          year: Number(formData.year),
          imageUrl: formData.imageUrl.trim() || 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=600&q=80'
        };
      }
      return car;
    }));

    setIsEditCarModalOpen(false);
    resetForm();
  };

  // Delete Car from Catalog
  const handleDeleteCar = (id) => {
    const car = cars.find(c => c.id === id);
    if (window.confirm(`Apakah Anda yakin ingin menghapus "${car.brand} ${car.model}" dari katalog?`)) {
      setCars(prev => prev.filter(c => c.id !== id));
    }
  };

  // Toggle Wishlist Status
  const toggleWishlist = (id) => {
    setCars(prev => prev.map(car => {
      if (car.id === id) {
        const nextWishlisted = !car.isWishlisted;
        return {
          ...car,
          isWishlisted: nextWishlisted,
          wishlistNotes: nextWishlisted ? car.wishlistNotes || '' : '',
          wishlistPriority: nextWishlisted ? car.wishlistPriority || 3 : 3,
          wishlistSavedAmount: nextWishlisted ? car.wishlistSavedAmount || 0 : 0
        };
      }
      return car;
    }));
  };

  // Open Edit Wishlist Details Modal
  const openEditWishlistModal = (car) => {
    setEditingCar(car);
    setWishlistFormData({
      notes: car.wishlistNotes || '',
      priority: car.wishlistPriority || 3,
      savedAmount: car.wishlistSavedAmount || 0
    });
    setIsEditWishlistModalOpen(true);
  };

  const handleEditWishlistDetails = (e) => {
    e.preventDefault();
    if (Number(wishlistFormData.savedAmount) < 0) {
      alert('Tabungan yang dialokasikan tidak boleh negatif');
      return;
    }
    if (Number(wishlistFormData.savedAmount) > editingCar.price) {
      if (!window.confirm('Dana tabungan yang Anda alokasikan melebihi harga mobil. Tetap simpan?')) {
        return;
      }
    }

    setCars(prev => prev.map(car => {
      if (car.id === editingCar.id) {
        return {
          ...car,
          wishlistNotes: wishlistFormData.notes.trim(),
          wishlistPriority: Number(wishlistFormData.priority),
          wishlistSavedAmount: Number(wishlistFormData.savedAmount)
        };
      }
      return car;
    }));

    setIsEditWishlistModalOpen(false);
    setEditingCar(null);
  };

  // Reset form helper
  const resetForm = () => {
    setFormData(DEFAULT_FORM_DATA);
    setFormError('');
    setEditingCar(null);
    setSelectedPresetIndex(null);
  };

  // Stats calculation
  const totalCatalogCars = cars.length;
  const wishlistedCars = cars.filter(c => c.isWishlisted);
  const totalWishlistCount = wishlistedCars.length;
  const totalWishlistBudget = wishlistedCars.reduce((sum, c) => sum + c.price, 0);
  const totalAllocatedSavings = wishlistedCars.reduce((sum, c) => sum + c.wishlistSavedAmount, 0);

  // Filters + Search + Sort logic
  const getFilteredCars = (isWishlistOnly = false) => {
    return cars.filter(car => {
      if (isWishlistOnly && !car.isWishlisted) return false;
      const searchString = `${car.brand} ${car.model} ${car.category}`.toLowerCase();
      const matchesSearch = searchString.includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'Semua' || car.category === categoryFilter;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'year-desc') return b.year - a.year;
      if (sortBy === 'priority-desc' && isWishlistOnly) {
        return b.wishlistPriority - a.wishlistPriority;
      }
      if (sortBy === 'progress-desc' && isWishlistOnly) {
        const progressA = a.wishlistSavedAmount / a.price;
        const progressB = b.wishlistSavedAmount / b.price;
        return progressB - progressA;
      }
      return 0; // default order
    });
  };

  const catalogFiltered = getFilteredCars(false);
  const wishlistFiltered = getFilteredCars(true);

  // Distinct categories
  const allCategories = ['Semua', ...new Set(cars.map(c => c.category))];

  return (
    <div>
      {/* Header */}
      <header className="app-header">
        <div className="logo-section">
          <div className="logo-icon">
            <Sparkles size={24} color="#ffffff" />
          </div>
          <h1>MYGARASI</h1>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-wishlist"
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
          >
            <Plus size={18} />
            TAMBAH MOBIL (ADD CAR)
          </button>
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'wishlist' ? 'active wishlist-tab-active' : ''}`}
          onClick={() => {
            setActiveTab('wishlist');
            setSearchQuery('');
          }}
        >
          <Heart size={16} fill={activeTab === 'wishlist' ? 'var(--fh-pink)' : 'none'} color={activeTab === 'wishlist' ? 'var(--fh-pink)' : 'currentColor'} />
          <span>GARASI FESTIVAL (WISHLIST)</span>
          {totalWishlistCount > 0 && <span className="tab-badge">{totalWishlistCount}</span>}
        </button>
        <button 
          className={`tab-btn ${activeTab === 'catalog' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('catalog');
            setSearchQuery('');
          }}
        >
          <Car size={16} />
          <span>SHOWROOM MOBIL (CATALOG)</span>
          <span className="tab-badge-blue">{totalCatalogCars}</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'compare' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('compare');
          }}
        >
          <Scale size={16} />
          <span>BANDINGKAN SPEK (COMPARE)</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'budget' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('budget');
          }}
        >
          <Wallet size={16} />
          <span>REKENING BALAP (BUDGET)</span>
        </button>
      </nav>

      {/* Statistics Row */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(0, 243, 255, 0.08)' }}>
            <Car size={24} color="var(--fh-cyan)" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{totalCatalogCars}</span>
            <span className="stat-label">TOTAL DI SHOWROOM</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(255, 0, 127, 0.08)' }}>
            <Heart size={24} color="var(--fh-pink)" fill="var(--fh-pink)" />
          </div>
          <div className="stat-info">
            <span className="stat-value" style={{ color: 'var(--fh-pink)' }}>{totalWishlistCount}</span>
            <span className="stat-label">DIAMBIL DI GARASI</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(255, 235, 0, 0.08)' }}>
            <Coins size={24} color="var(--fh-yellow)" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{formatCredits(totalWishlistBudget)}</span>
            <span className="stat-label">TARGET DANA (Rp)</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(138, 43, 226, 0.08)' }}>
            <TrendingUp size={24} color="#a855f7" />
          </div>
          <div className="stat-info">
            <span className="stat-value" style={{ color: '#c084fc' }}>{formatCredits(totalAllocatedSavings)}</span>
            <span className="stat-label">DANA TERKUMPUL (Rp)</span>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      {(activeTab === 'catalog' || activeTab === 'wishlist') && (
        <section className="control-bar">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Cari merek, tipe, kategori..." 
              className="form-control-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-actions">
            <div className="filter-group">
              <Filter size={16} className="filter-label" />
              <select 
                className="select-control"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {allCategories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'Semua' ? 'SEMUA KATEGORI' : cat.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <ArrowUpDown size={16} className="filter-label" />
              <select 
                className="select-control"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">URUTAN DEFAULT</option>
                <option value="price-asc">HARGA: TERENDAH</option>
                <option value="price-desc">HARGA: TERTINGGI</option>
                <option value="year-desc">TAHUN: TERBARU</option>
                {activeTab === 'wishlist' && (
                  <>
                    <option value="priority-desc">PRIORITAS: TERTINGGI</option>
                    <option value="progress-desc">PROGRES TABUNGAN: TERBESAR</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </section>
      )}

      {/* TABS CONTENT */}

      {/* 1. CATALOG TAB */}
      {activeTab === 'catalog' && (
        <main className="cars-grid">
          {catalogFiltered.length > 0 ? (
            catalogFiltered.map(car => (
              <div className={`car-card ${car.isWishlisted ? 'wishlisted' : ''}`} key={car.id}>
                {car.isCustom && <span className="custom-car-badge" style={{ left: 'auto', right: '70px' }}>KUSTOM</span>}
                
                {/* Performance Index (PI) Badge */}
                <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 11 }}>
                  {(() => {
                    const pi = getPerformanceIndex(car);
                    return (
                      <div className="pi-badge">
                        <span className={`pi-class ${pi.className}`}>{pi.classCode}</span>
                        <span className="pi-score">{pi.score}</span>
                      </div>
                    );
                  })()}
                </div>

                {/* Image Section */}
                <div className="car-image-container">
                  <img 
                    src={car.imageUrl} 
                    alt={`${car.brand} ${car.model}`}
                    className="car-image"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  {/* Floating Heart Button */}
                  <button 
                    className={`floating-wishlist-btn ${car.isWishlisted ? 'wishlisted' : ''}`}
                    onClick={() => toggleWishlist(car.id)}
                    title={car.isWishlisted ? 'Hapus dari Wishlist' : 'Tambah ke Wishlist'}
                  >
                    <Heart size={20} fill={car.isWishlisted ? 'var(--fh-pink)' : 'none'} />
                  </button>
                </div>

                {/* Specs Section */}
                <div className="car-content">
                  <span className="car-category">{car.category}</span>
                  <div className="car-header">
                    <span className="car-brand-model">{car.brand} {car.model}</span>
                    <span className="car-year">{car.year}</span>
                  </div>

                  <div className="car-specs">
                    <div className="spec-item">
                      <Fuel size={12} />
                      <span>{car.fuelType.toUpperCase()}</span>
                    </div>
                    <div className="spec-item">
                      <Users size={12} />
                      <span>{car.seats} Kursi</span>
                    </div>
                  </div>

                  <div className="car-price-row">
                    <div>
                      <span className="price-label">HARGA PASAR</span>
                      <div className="price-value">{formatCredits(car.price)}</div>
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button 
                        className="btn-icon-only" 
                        onClick={() => openEditCarModal(car)}
                        title="Edit Spesifikasi Mobil"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        className="btn-icon-only" 
                        onClick={() => handleDeleteCar(car.id)}
                        style={{ color: 'var(--fh-pink)' }}
                        title="Hapus Mobil"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <AlertTriangle size={48} className="empty-state-icon" />
              <h3>Katalog kosong / tidak ditemukan</h3>
              <p>Coba ubah kata kunci pencarian Anda atau tambahkan mobil baru ke katalog impian.</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  resetForm();
                  setIsAddModalOpen(true);
                }}
              >
                TAMBAH MOBIL BARU
              </button>
            </div>
          )}
        </main>
      )}

      {/* 2. WISHLIST TAB */}
      {activeTab === 'wishlist' && (
        <main className="cars-grid">
          {wishlistFiltered.length > 0 ? (
            wishlistFiltered.map(car => {
              const progressPct = Math.round(Math.min(100, (car.wishlistSavedAmount / car.price) * 100)) || 0;
              return (
                <div className="car-card wishlisted" key={car.id}>
                  {/* Performance Index (PI) Badge */}
                  <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 11 }}>
                    {(() => {
                      const pi = getPerformanceIndex(car);
                      return (
                        <div className="pi-badge">
                          <span className={`pi-class ${pi.className}`}>{pi.classCode}</span>
                          <span className="pi-score">{pi.score}</span>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Image Section */}
                  <div className="car-image-container">
                    <img 
                      src={car.imageUrl} 
                      alt={`${car.brand} ${car.model}`}
                      className="car-image"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <button 
                      className="floating-wishlist-btn wishlisted"
                      onClick={() => toggleWishlist(car.id)}
                      title="Hapus dari Wishlist"
                    >
                      <Heart size={20} fill="var(--fh-pink)" />
                    </button>
                  </div>

                  {/* Wishlist details */}
                  <div className="car-content">
                    <span className="car-category">{car.category}</span>
                    <div className="car-header">
                      <span className="car-brand-model">{car.brand} {car.model}</span>
                      <span className="car-year">{car.year}</span>
                    </div>

                    <div className="wishlist-meta-block">
                      <div className="priority-stars-row">
                        <span className="priority-label">SKALA PRIORITAS:</span>
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star 
                            key={star} 
                            size={13} 
                            fill={star <= car.wishlistPriority ? '#fbbf24' : 'none'} 
                            color={star <= car.wishlistPriority ? '#fbbf24' : '#64748b'} 
                          />
                        ))}
                      </div>

                      <div className={`dream-note ${!car.wishlistNotes ? 'empty' : ''}`}>
                        {car.wishlistNotes ? `"${car.wishlistNotes}"` : 'Belum ada catatan impian...'}
                      </div>

                      <div className="savings-progress-container">
                        <div className="savings-labels">
                          <span>ALOKASI TABUNGAN:</span>
                          <span className="savings-pct">{progressPct}%</span>
                        </div>
                        <div className="progress-bar-bg">
                          <div 
                            className="progress-bar-fill"
                            style={{ 
                              width: `${progressPct}%`,
                              background: 'linear-gradient(90deg, var(--fh-pink) 0%, var(--fh-cyan) 100%)'
                            }}
                          ></div>
                        </div>
                        <div className="savings-labels" style={{ marginTop: '2px', color: 'var(--text-muted)' }}>
                          <span>{formatCredits(car.wishlistSavedAmount)}</span>
                          <span>Target: {formatCredits(car.price)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="car-price-row">
                      <div>
                        <span className="price-label">HARGA PASAR</span>
                        <div className="price-value">{formatCredits(car.price)}</div>
                      </div>

                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => openEditWishlistModal(car)}
                        title="Sesuaikan Impian"
                      >
                        <Settings size={14} />
                        SESUAIKAN
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-state">
              <Sparkles size={48} className="empty-state-icon" style={{ color: 'var(--fh-pink)' }} />
              <h3>GARASI IMPIAN ANDA KOSONG</h3>
              <p>Buka menu Showroom Mobil dan klik ikon hati untuk memasukkan mobil impian Anda ke daftar garasi Horizon ini.</p>
              <button 
                className="btn btn-wishlist"
                onClick={() => setActiveTab('catalog')}
              >
                JELAJAHI SHOWROOM MOBIL
              </button>
            </div>
          )}
        </main>
      )}

      {/* 3. COMPARE TAB */}
      {activeTab === 'compare' && (
        <main className="compare-container">
          {wishlistedCars.length > 0 ? (
            <div>
              <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Scale size={20} color="var(--fh-cyan)" />
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: '800', fontStyle: 'italic', textTransform: 'uppercase' }}>
                  KOMPARASI SPEK HORIZON
                </h2>
              </div>
              
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>SPESIFIKASI</th>
                    {wishlistedCars.map(car => (
                      <th key={car.id}>
                        <div className="compare-header-cell">
                          <img 
                            src={car.imageUrl} 
                            alt={`${car.brand} ${car.model}`}
                            className="compare-img"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=600&q=80';
                            }}
                          />
                          <div>
                            {/* PI Badge inside Comparison Table Header */}
                            {(() => {
                              const pi = getPerformanceIndex(car);
                              return (
                                <div className="pi-badge" style={{ marginBottom: '6px' }}>
                                  <span className={`pi-class ${pi.className}`}>{pi.classCode}</span>
                                  <span className="pi-score">{pi.score}</span>
                                </div>
                              );
                            })()}
                            <div className="compare-title" style={{ fontStyle: 'italic', textTransform: 'uppercase' }}>{car.brand} {car.model}</div>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{car.category.toUpperCase()}</span>
                          </div>
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => toggleWishlist(car.id)}
                            style={{ borderColor: 'rgba(255, 0, 127, 0.2)', color: 'var(--fh-pink)' }}
                          >
                            HAPUS IMPIAN
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>NILAI MOBIL (Rp)</strong></td>
                    {wishlistedCars.map(car => (
                      <td key={car.id} style={{ fontSize: '16px', fontWeight: '800', color: 'var(--fh-cyan)' }}>
                        {formatCredits(car.price)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>PRIORITAS</strong></td>
                    {wishlistedCars.map(car => (
                      <td key={car.id}>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star 
                              key={star} 
                              size={14} 
                              fill={star <= car.wishlistPriority ? '#fbbf24' : 'none'} 
                              color={star <= car.wishlistPriority ? '#fbbf24' : '#64748b'} 
                            />
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>DANA ALOKASI</strong></td>
                    {wishlistedCars.map(car => {
                      const pct = Math.round(Math.min(100, (car.wishlistSavedAmount / car.price) * 100)) || 0;
                      return (
                        <td key={car.id}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontWeight: '700' }}>{formatCredits(car.wishlistSavedAmount)}</span>
                            <span style={{ fontSize: '11px', color: 'var(--fh-cyan)', fontWeight: '800' }}>{pct}% TERKUMPUL</span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td><strong>BAHAN BAKAR</strong></td>
                    {wishlistedCars.map(car => (
                      <td key={car.id}>{car.fuelType.toUpperCase()}</td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>TEMPAT DUDUK</strong></td>
                    {wishlistedCars.map(car => (
                      <td key={car.id}>{car.seats} Kursi</td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>TAHUN RILIS</strong></td>
                    {wishlistedCars.map(car => (
                      <td key={car.id}>{car.year}</td>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>CATATAN GARASI</strong></td>
                    {wishlistedCars.map(car => (
                      <td key={car.id} style={{ fontStyle: 'italic', fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '250px', wordBreak: 'break-word' }}>
                        {car.wishlistNotes ? `"${car.wishlistNotes}"` : '-'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state" style={{ border: 'none' }}>
              <Scale size={48} className="empty-state-icon" />
              <h3>TIDAK ADA PERBANDINGAN TERSEDIA</h3>
              <p>Tambahkan setidaknya 1 mobil ke wishlist Anda terlebih dahulu agar dapat melihat perbandingan spek.</p>
              <button 
                className="btn btn-primary"
                onClick={() => setActiveTab('catalog')}
              >
                LIHAT SHOWROOM MOBIL
              </button>
            </div>
          )}
        </main>
      )}

      {/* 4. BUDGET PLANNER TAB */}
      {activeTab === 'budget' && (
        <main>
          {/* Planner inputs */}
          <div className="budget-planner-header">
            <div className="budget-inputs">
              <div className="budget-input-group">
                <label className="budget-input-label">
                  <Wallet size={16} color="var(--fh-cyan)" />
                  TOTAL DANA BALAP (Rp) SEKARANG:
                </label>
                <div className="budget-input-wrapper">
                  <span className="budget-input-prefix">Rp</span>
                  <input 
                    type="number" 
                    className="budget-control"
                    placeholder="Contoh: 500000000"
                    value={globalSavings || ''}
                    onChange={(e) => setGlobalSavings(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="budget-input-group">
                <label className="budget-input-label">
                  <Coins size={16} color="var(--fh-yellow)" />
                  ALOKASI DANA BULANAN (Rp):
                </label>
                <div className="budget-input-wrapper">
                  <span className="budget-input-prefix">Rp</span>
                  <input 
                    type="number" 
                    className="budget-control"
                    placeholder="Contoh: 25000000"
                    value={monthlySavings || ''}
                    onChange={(e) => setMonthlySavings(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            {/* Affordability summary */}
            {wishlistedCars.length > 0 && (
              <div className="budget-status-summary">
                <div className="budget-summary-badge">
                  <span className="budget-summary-label">TOTAL DANA BALAP</span>
                  <span className="budget-summary-value" style={{ color: 'var(--fh-cyan)' }}>{formatCredits(globalSavings)}</span>
                </div>
                
                <div className={`budget-summary-badge ${wishlistedCars.filter(c => globalSavings >= c.price).length === 0 ? 'shortfall' : ''}`}>
                  <span className="budget-summary-label">SIAP DIKEMUDIKAN NOW</span>
                  <span className={`budget-summary-value ${wishlistedCars.filter(c => globalSavings >= c.price).length > 0 ? 'affordable' : 'shortfall'}`}>
                    {wishlistedCars.filter(c => globalSavings >= c.price).length} MOBIL
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Budget Grid */}
          {wishlistedCars.length > 0 ? (
            <div className="budget-grid">
              {wishlistedCars.map(car => {
                const isAffordable = globalSavings >= car.price;
                const shortfall = isAffordable ? 0 : car.price - globalSavings;
                const progressPct = Math.round(Math.min(100, (globalSavings / car.price) * 100));
                const monthsNeeded = monthlySavings > 0 ? Math.ceil(shortfall / monthlySavings) : 0;

                return (
                  <div className={`budget-card ${isAffordable ? 'affordable' : ''}`} key={car.id}>
                    <div className="budget-card-header">
                      <img 
                        src={car.imageUrl} 
                        alt={`${car.brand} ${car.model}`}
                        className="budget-card-img"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <div className="budget-card-info">
                        {/* PI Badge inside budget card */}
                        {(() => {
                          const pi = getPerformanceIndex(car);
                          return (
                            <div className="pi-badge" style={{ width: 'fit-content', marginBottom: '4px' }}>
                              <span className={`pi-class ${pi.className}`}>{pi.classCode}</span>
                              <span className="pi-score">{pi.score}</span>
                            </div>
                          );
                        })()}
                        <span className="budget-card-title">{car.brand} {car.model}</span>
                        <span className="budget-card-price">{formatCredits(car.price)}</span>
                      </div>
                    </div>

                    <div className={`budget-status-row ${isAffordable ? 'affordable' : 'shortfall'}`}>
                      <span>STATUS KETERSEDIAAN:</span>
                      <span>{isAffordable ? 'DANA TERPENUHI! 🎉' : `KURANG ${formatCredits(shortfall)}`}</span>
                    </div>

                    <div className="budget-progress-section">
                      <div className="budget-progress-labels">
                        <span>PENCAPAIAN DANA BALAP:</span>
                        <span style={{ fontWeight: '800', color: isAffordable ? 'var(--fh-cyan)' : 'var(--fh-yellow)' }}>{progressPct}%</span>
                      </div>
                      <div className="budget-progress-bar-bg">
                        <div 
                          className={`budget-progress-bar-fill ${isAffordable ? 'affordable' : 'shortfall'}`}
                          style={{ width: `${progressPct}%` }}
                        ></div>
                      </div>
                    </div>

                    {!isAffordable && (
                      <div className="projection-box">
                        <Calendar size={15} color="var(--fh-yellow)" />
                        <div>
                          {monthlySavings > 0 ? (
                            <span>
                              Butuh menabung sekitar <strong>{monthsNeeded} bulan</strong> lagi (dengan menyisihkan {formatCredits(monthlySavings)}/bln).
                            </span>
                          ) : (
                            <span>Masukkan target Rp bulanan untuk melihat proyeksi.</span>
                          )}
                        </div>
                      </div>
                    )}

                    {isAffordable && (
                      <div className="projection-box" style={{ borderColor: 'rgba(0, 243, 255, 0.2)', backgroundColor: 'rgba(0, 243, 255, 0.02)' }}>
                        <Check size={15} color="var(--fh-cyan)" />
                        <span style={{ color: 'var(--fh-cyan)', fontWeight: '600' }}>
                          Selamat! Dana balap Anda mencukupi. Siap untuk dikemudikan di Horizon Festival!
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <Wallet size={48} className="empty-state-icon" />
              <h3>BELUM ADA RENCANA KEUANGAN</h3>
              <p>Garasi wishlist mobil impian Anda masih kosong. Tambahkan mobil impian terlebih dahulu untuk mensimulasikan dana balap Anda.</p>
              <button 
                className="btn btn-primary"
                onClick={() => setActiveTab('catalog')}
              >
                LIHAT SHOWROOM
              </button>
            </div>
          )}
        </main>
      )}

      {/* 5. ADD CUSTOM DREAM CAR MODAL */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <Plus size={20} />
                TAMBAH MOBIL BARU (ADD CAR)
              </h2>
              <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddCar}>
              <div className="modal-body">
                {formError && (
                  <div style={{
                    backgroundColor: 'rgba(255, 0, 127, 0.1)',
                    border: '1px solid var(--fh-pink)',
                    borderRadius: '4px',
                    padding: '10px 14px',
                    marginBottom: '16px',
                    color: 'var(--fh-pink)',
                    fontSize: '14px',
                    fontWeight: '700'
                  }}>
                    {formError}
                  </div>
                )}

                <div className="form-group-full" style={{ marginBottom: '16px' }}>
                  <label className="preset-picker-label">PENGISIAN CEPAT PRESET:</label>
                  <div className="image-presets">
                    {PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`preset-chip ${selectedPresetIndex === idx ? 'active' : ''}`}
                        onClick={() => applyPreset(preset, idx)}
                      >
                        {preset.brand} {preset.model}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">MEREK MOBIL (BRAND) *</label>
                    <input 
                      type="text" 
                      name="brand" 
                      placeholder="Contoh: Porsche" 
                      className="form-control"
                      value={formData.brand}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">MODEL MOBIL *</label>
                    <input 
                      type="text" 
                      name="model" 
                      placeholder="Contoh: 911 GT3" 
                      className="form-control"
                      value={formData.model}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">KATEGORI *</label>
                    <select 
                      name="category" 
                      className="form-control"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Sport">Sport</option>
                      <option value="Electric">Electric</option>
                      <option value="MPV">MPV</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">TAHUN RILIS *</label>
                    <input 
                      type="number" 
                      name="year" 
                      placeholder="Contoh: 2024" 
                      className="form-control"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">ESTIMASI NILAI (Rp) *</label>
                    <input 
                      type="number" 
                      name="price" 
                      placeholder="Contoh: 2500000000" 
                      className="form-control"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">BAHAN BAKAR</label>
                    <select 
                      name="fuelType" 
                      className="form-control"
                      value={formData.fuelType}
                      onChange={handleInputChange}
                    >
                      <option value="Bensin">Bensin</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Listrik">Listrik</option>
                      <option value="Hibrida">Hibrida</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">KAPASITAS KURSI</label>
                    <input 
                      type="number" 
                      name="seats" 
                      placeholder="Contoh: 2" 
                      className="form-control"
                      value={formData.seats}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group form-group-full">
                    <label className="form-label">URL GAMBAR MOBIL</label>
                    <input 
                      type="url" 
                      name="imageUrl" 
                      placeholder="https://images.unsplash.com/... (opsional)" 
                      className="form-control"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  BATAL
                </button>
                <button type="submit" className="btn btn-wishlist">
                  SIMPAN SHOWROOM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. EDIT CAR SPECIFICATIONS MODAL */}
      {isEditCarModalOpen && (
        <div className="modal-overlay" onClick={() => setIsEditCarModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <Edit size={20} />
                EDIT SPEK MOBIL (EDIT SPECS)
              </h2>
              <button className="modal-close-btn" onClick={() => setIsEditCarModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditCarSpecs}>
              <div className="modal-body">
                {formError && (
                  <div style={{
                    backgroundColor: 'rgba(255, 0, 127, 0.1)',
                    border: '1px solid var(--fh-pink)',
                    borderRadius: '4px',
                    padding: '10px 14px',
                    marginBottom: '16px',
                    color: 'var(--fh-pink)',
                    fontSize: '14px',
                    fontWeight: '700'
                  }}>
                    {formError}
                  </div>
                )}

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">MEREK MOBIL (BRAND) *</label>
                    <input 
                      type="text" 
                      name="brand" 
                      className="form-control"
                      value={formData.brand}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">MODEL MOBIL *</label>
                    <input 
                      type="text" 
                      name="model" 
                      className="form-control"
                      value={formData.model}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">KATEGORI *</label>
                    <select 
                      name="category" 
                      className="form-control"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Sport">Sport</option>
                      <option value="Electric">Electric</option>
                      <option value="MPV">MPV</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">TAHUN RILIS *</label>
                    <input 
                      type="number" 
                      name="year" 
                      className="form-control"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">ESTIMASI NILAI (Rp) *</label>
                    <input 
                      type="number" 
                      name="price" 
                      className="form-control"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">BAHAN BAKAR</label>
                    <select 
                      name="fuelType" 
                      className="form-control"
                      value={formData.fuelType}
                      onChange={handleInputChange}
                    >
                      <option value="Bensin">Bensin</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Listrik">Listrik</option>
                      <option value="Hibrida">Hibrida</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">KAPASITAS KURSI</label>
                    <input 
                      type="number" 
                      name="seats" 
                      className="form-control"
                      value={formData.seats}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group form-group-full">
                    <label className="form-label">URL GAMBAR MOBIL</label>
                    <input 
                      type="url" 
                      name="imageUrl" 
                      className="form-control"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditCarModalOpen(false)}>
                  BATAL
                </button>
                <button type="submit" className="btn btn-wishlist">
                  PERBARUI SPEK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. EDIT WISHLIST / DREAM DETAILS MODAL */}
      {isEditWishlistModalOpen && editingCar && (
        <div className="modal-overlay" onClick={() => setIsEditWishlistModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <Heart size={20} fill="var(--fh-pink)" color="var(--fh-pink)" />
                DETAIL GARASI: {editingCar.brand.toUpperCase()} {editingCar.model.toUpperCase()}
              </h2>
              <button className="modal-close-btn" onClick={() => setIsEditWishlistModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditWishlistDetails}>
              <div className="modal-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">CATATAN GARASI (NOTES):</label>
                    <textarea 
                      rows="3"
                      className="form-control"
                      placeholder="Tulis alasan mengapa ingin mengoleksi mobil ini..."
                      value={wishlistFormData.notes}
                      onChange={(e) => setWishlistFormData(prev => ({ ...prev, notes: e.target.value }))}
                      style={{ resize: 'vertical', minHeight: '80px' }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">SKALA PRIORITAS GARASI:</label>
                    <div className="interactive-stars">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          className={`star-input-btn ${star <= wishlistFormData.priority ? 'active' : ''}`}
                          onClick={() => setWishlistFormData(prev => ({ ...prev, priority: star }))}
                        >
                          <Star size={26} fill={star <= wishlistFormData.priority ? '#fbbf24' : 'none'} />
                        </button>
                      ))}
                      <span style={{ fontSize: '14px', color: 'var(--text-secondary)', marginLeft: '8px', fontWeight: '700' }}>
                        {wishlistFormData.priority} / 5 BINTANG
                      </span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">DANA YANG DIALOKASIKAN (Rp):</label>
                    <div className="budget-input-wrapper">
                      <span className="budget-input-prefix">Rp</span>
                      <input 
                        type="number" 
                        className="budget-control"
                        placeholder="Contoh: 50000000"
                        value={wishlistFormData.savedAmount || ''}
                        onChange={(e) => setWishlistFormData(prev => ({ ...prev, savedAmount: Number(e.target.value) }))}
                      />
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Membantu Anda melacak progres pembelian mobil ini secara spesifik. Nilai mobil: {formatCredits(editingCar.price)}.
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditWishlistModalOpen(false)}>
                  BATAL
                </button>
                <button type="submit" className="btn btn-wishlist">
                  SIMPAN IMPIAN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer / Credits */}
      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-copyright">&copy; {new Date().getFullYear()} MYGARASI. Hak Cipta Dilindungi.</p>
          <p className="footer-group-info">Dikembangkan oleh <span className="footer-credits">Kelompok 7</span></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
