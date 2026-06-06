import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MenuGrid, { MENU_ITEMS } from './components/MenuGrid';
import CustomizationModal from './components/CustomizationModal';
import DrinkBuilder from './components/DrinkBuilder';
import LoyaltyTracker from './components/LoyaltyTracker';
import CartDrawer from './components/CartDrawer';
import OrderHistory from './components/OrderHistory';
import OrderManager from './components/OrderManager';
import { Coffee, ShieldCheck, Sparkles, MapPin, Phone } from 'lucide-react';

export default function App() {
  // Loading & Splash States
  const [isLoading, setIsLoading] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);

  // Theme State (Dark by default, 'light' or 'dark')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('caffeine_co_theme') || 'dark';
  });

  const [activeTab, setActiveTab] = useState('menu');
  const [cart, setCart] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [userName, setUserName] = useState('Della Kartika');
  const [orders, setOrders] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Dynamic Menu Items State
  const [menuItems, setMenuItems] = useState([]);

  // Multi-Member Loyalty States
  const defaultMembers = [
    { id: 'm_della', name: 'Della Kartika', loyaltyPoints: 0, totalOrders: 0 },
    { id: 'm_ahmad', name: 'Ahmad Fauzi', loyaltyPoints: 12, totalOrders: 4 },
    { id: 'm_siti', name: 'Siti Rahma', loyaltyPoints: 8, totalOrders: 2 }
  ];
  const [members, setMembers] = useState([]);
  const [activeMemberId, setActiveMemberId] = useState('');

  // Splash Screen timer sequence
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeSplash(true);
    }, 2000);

    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Theme toggle action
  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('caffeine_co_theme', nextTheme);
      return nextTheme;
    });
  };

  // Load state from localStorage on init
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('caffeine_co_cart');
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedOrders = localStorage.getItem('caffeine_co_orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      // Load Menu
      const storedMenu = localStorage.getItem('caffeine_co_menu');
      if (storedMenu) {
        setMenuItems(JSON.parse(storedMenu));
      } else {
        setMenuItems(MENU_ITEMS);
        localStorage.setItem('caffeine_co_menu', JSON.stringify(MENU_ITEMS));
      }

      // Load Members
      const storedMembers = localStorage.getItem('caffeine_co_members');
      const storedActiveId = localStorage.getItem('caffeine_co_active_member_id');
      let currentMembers = defaultMembers;
      let currentActiveId = 'm_della';

      if (storedMembers) {
        currentMembers = JSON.parse(storedMembers);
      } else {
        localStorage.setItem('caffeine_co_members', JSON.stringify(defaultMembers));
      }
      setMembers(currentMembers);

      if (storedActiveId) {
        currentActiveId = storedActiveId;
      } else {
        localStorage.setItem('caffeine_co_active_member_id', 'm_della');
      }
      setActiveMemberId(currentActiveId);

      const activeMember = currentMembers.find(m => m.id === currentActiveId);
      if (activeMember) {
        setUserName(activeMember.name);
        setLoyaltyPoints(activeMember.loyaltyPoints);
        setTotalOrders(activeMember.totalOrders);
      }
    } catch (e) {
      console.error('Gagal mengambil data dari penyimpanan lokal:', e);
    }
  }, []);

  // Save states to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('caffeine_co_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync menuItems to local storage
  useEffect(() => {
    if (menuItems.length > 0) {
      localStorage.setItem('caffeine_co_menu', JSON.stringify(menuItems));
    }
  }, [menuItems]);

  // Sync members to local storage
  useEffect(() => {
    if (members.length > 0) {
      localStorage.setItem('caffeine_co_members', JSON.stringify(members));
    }
  }, [members]);

  // Sync active member selections
  useEffect(() => {
    if (activeMemberId && members.length > 0) {
      localStorage.setItem('caffeine_co_active_member_id', activeMemberId);
      const activeMember = members.find(m => m.id === activeMemberId);
      if (activeMember) {
        setUserName(activeMember.name);
        setLoyaltyPoints(activeMember.loyaltyPoints);
        setTotalOrders(activeMember.totalOrders);
      }
    }
  }, [activeMemberId, members]);

  // Sync loyalty points to local storage
  useEffect(() => {
    localStorage.setItem('caffeine_co_loyalty', loyaltyPoints.toString());
  }, [loyaltyPoints]);

  // Sync total orders count
  useEffect(() => {
    localStorage.setItem('caffeine_co_total_orders', totalOrders.toString());
  }, [totalOrders]);

  // Sync user profile name
  useEffect(() => {
    localStorage.setItem('caffeine_co_username', userName);
  }, [userName]);

  // Sync tracking orders
  useEffect(() => {
    localStorage.setItem('caffeine_co_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart actions
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      // Find if item with same options already exists
      const existingIdx = prevCart.findIndex((cartItem) => {
        if (cartItem.itemId !== item.itemId && cartItem.id !== item.id) return false;
        
        // Match details deep equality
        const detailsMatch = JSON.stringify(cartItem.details) === JSON.stringify(item.details);
        const notesMatch = cartItem.specialNotes === item.specialNotes;
        
        return detailsMatch && notesMatch;
      });

      if (existingIdx > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIdx].quantity = (updatedCart[existingIdx].quantity || 1) + 1;
        return updatedCart;
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });

    // Auto open cart for confirmation feedback
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCart((prevCart) => 
      prevCart.map((item) => item.id === id ? { ...item, quantity } : item)
    );
  };

  const handleRemoveCartItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Checkout process
  const handleCheckout = (checkoutDetails) => {
    // Generate new order object
    const newOrder = {
      id: `ord_${Date.now()}`,
      customerName: checkoutDetails.customerName,
      orderType: checkoutDetails.orderType,
      tableNumber: checkoutDetails.tableNumber,
      paymentMethod: checkoutDetails.paymentMethod,
      items: [...cart],
      subtotal: checkoutDetails.subtotal,
      tax: checkoutDetails.tax,
      totalPrice: checkoutDetails.totalPrice,
      status: 'Queued',
      timestamp: new Date().toISOString(),
      stepIndex: 0,
      progressPercent: 10
    };

    // Calculate Loyalty Adjustments
    // 1. Subtract 10 stamps if reward coupon was checked (meaning 9 slots are reset)
    let loyaltyDelta = 0;
    if (checkoutDetails.redeemedReward) {
      loyaltyDelta -= 10;
    }

    // 2. Add stamps for all beverages in the order (excluding pastries)
    const beverageCount = cart.reduce((count, item) => {
      if (item.category !== 'pastries') {
        return count + (item.quantity || 1);
      }
      return count;
    }, 0);

    loyaltyDelta += beverageCount;

    // Update Member Loyalty points & Total orders in members list
    setMembers((prevMembers) =>
      prevMembers.map((m) => {
        if (m.id === activeMemberId) {
          const nextLoyalty = Math.max(0, m.loyaltyPoints + loyaltyDelta);
          const nextOrders = m.totalOrders + 1;
          
          setLoyaltyPoints(nextLoyalty);
          setTotalOrders(nextOrders);
          
          return {
            ...m,
            loyaltyPoints: nextLoyalty,
            totalOrders: nextOrders,
            name: checkoutDetails.customerName
          };
        }
        return m;
      })
    );

    // Fallback if no active member
    if (!activeMemberId) {
      setLoyaltyPoints((prev) => Math.max(0, prev + loyaltyDelta));
      setTotalOrders((prev) => prev + 1);
      setUserName(checkoutDetails.customerName);
    }

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    setCart([]); // Clear cart

    // Navigate to active orders tracking page
    setActiveTab('orders');
  };

  // Order advancement simulation completion handler
  const handleCompleteOrder = (orderId) => {
    setOrders((prevOrders) => 
      prevOrders.map((order) => 
        order.id === orderId 
          ? { ...order, status: 'Completed', stepIndex: 4, progressPercent: 100 } 
          : order
      )
    );
  };

  // Order Manager (Barista CRUD) Action Handlers
  const handleCreateOrder = (newOrder) => {
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
  };

  const handleUpdateOrder = (updatedOrder) => {
    setOrders((prevOrders) => 
      prevOrders.map((order) => order.id === updatedOrder.id ? updatedOrder : order)
    );
  };

  const handleDeleteOrder = (orderId) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  };

  // Menu CRUD Handlers
  const handleCreateMenuItem = (newItem) => {
    setMenuItems((prev) => [...prev, newItem]);
  };

  const handleUpdateMenuItem = (updatedItem) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteMenuItem = (itemId) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const totalCartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <>
      {/* Premium Loading Splash Overlay */}
      {isLoading && (
        <div className={`splash-screen ${fadeSplash ? 'fade-out' : ''}`}>
          <div className="splash-logo-container">
            <div className="splash-icon-wrapper">
              <Coffee />
            </div>
            <div style={{ textAlign: 'center' }}>
              <h2 className="splash-title">Caffeine &amp; Co.</h2>
              <p className="splash-subtitle">Panggangan &amp; Seduhan Midnight</p>
            </div>
          </div>
        </div>
      )}

      {/* Main App Container with Active Theme attributes */}
      <div className="page-container" data-theme={theme}>
        
        {/* Sticky Header Nav */}
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          cartCount={totalCartCount} 
          setIsCartOpen={setIsCartOpen}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        {/* Main Pages Router Section */}
        <main className="main-content">
          
          {/* Banner Hero Display for Artisan Menu Home */}
          {activeTab === 'menu' && (
            <div className="hero-banner">
              <div className="hero-glow"></div>
              <div className="hero-inner">
                <span className="hero-tag">
                  <Sparkles />
                  Meracik Kehangatan dalam Setiap Cangkir
                </span>
                <h2 className="hero-title font-serif">
                  Seduhan Segar <br />
                  <span className="text-gold-gradient italic">Minuman Artisan Terbaik</span>
                </h2>
                <p className="hero-desc">
                  Selamat datang di Caffeine &amp; Co. Kami memilih biji kopi single-origin premium dan menyeduhnya dengan presisi tinggi. Atur preferensi rasa Anda sendiri di Lab Kopi atau pilih dari menu kurasi kami.
                </p>
                
                <div className="hero-actions">
                  <button 
                    onClick={() => {
                      const el = document.getElementById('menu-anchor');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-gold"
                  >
                    Pesan Sekarang
                  </button>
                  <button 
                    onClick={() => setActiveTab('builder')}
                    className="btn-outline"
                  >
                    Masuk Lab Kopi
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab Anchor for scrolling target */}
          <div id="menu-anchor"></div>

          {/* Dynamic Navigation Pages */}
          {activeTab === 'menu' && (
            <MenuGrid
              menuItems={menuItems}
              onCreateItem={handleCreateMenuItem}
              onUpdateItem={handleUpdateMenuItem}
              onDeleteItem={handleDeleteMenuItem}
              onSelectItem={setSelectedItem}
            />
          )}

          {activeTab === 'builder' && (
            <DrinkBuilder onAddToCart={handleAddToCart} />
          )}

          {activeTab === 'rewards' && (
            <LoyaltyTracker
              members={members}
              activeMemberId={activeMemberId}
              setActiveMemberId={setActiveMemberId}
              setMembers={setMembers}
              loyaltyPoints={loyaltyPoints}
              totalOrders={totalOrders}
              userName={userName}
            />
          )}

          {activeTab === 'orders' && (
            <OrderHistory
              orders={orders}
              onCompleteOrder={handleCompleteOrder}
              setOrders={setOrders}
            />
          )}

          {activeTab === 'manager' && (
            <OrderManager
              orders={orders}
              menuItems={menuItems}
              onCreateOrder={handleCreateOrder}
              onUpdateOrder={handleUpdateOrder}
              onDeleteOrder={handleDeleteOrder}
            />
          )}

      </main>

      {/* Elegant Footer Panel */}
      <footer className="footer-container">
        <div className="footer-inner">
          
          {/* Col 1: Brand details */}
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <div className="footer-brand-logo-wrapper">
                <Coffee />
              </div>
              <h3 className="footer-brand-title">Caffeine &amp; Co.</h3>
            </div>
            <p className="footer-brand-desc">
              Pengalaman seduhan kopi panggangan malam premium untuk para penikmat kopi sejati. Biji kopi kami diperoleh secara etis dan disangrai dengan sempurna.
            </p>
            <div className="footer-social-links">
              {/* Instagram kustom */}
              <a href="#" aria-label="Instagram">
                <svg className="stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* Facebook kustom */}
              <a href="#" aria-label="Facebook">
                <svg className="fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Hours */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Jam Operasional</h4>
            <ul className="footer-list">
              <li>Senin - Jumat: 07.00 - 22.00 WIB</li>
              <li>Sabtu - Minggu: 08.00 - 23.00 WIB</li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Informasi Kontak</h4>
            <ul className="footer-list">
              <li className="footer-list-item-flex">
                <MapPin />
                Jl. Artisan Raya No. 12, Jakarta Selatan
              </li>
              <li className="footer-list-item-flex">
                <Phone />
                +62 812-3456-7890
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="footer-bottom-bar">
          <p>&copy; {new Date().getFullYear()} Caffeine &amp; Co. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="footer-bottom-bar-right">
            <ShieldCheck />
            Simulasi Checkout &amp; Penyimpanan Lokal Aktif
          </p>
        </div>
      </footer>

      {/* Customization Popup Modal */}
      {selectedItem && (
        <CustomizationModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer Sliding Sidebar */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        loyaltyPoints={loyaltyPoints}
        onCheckout={handleCheckout}
      />

    </div>
  </>
  );
}
