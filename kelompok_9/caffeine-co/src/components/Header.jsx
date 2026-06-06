import React, { useState } from 'react';
import { Coffee, ShoppingBag, Award, History, Menu, X, Sun, Moon, Sliders } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, cartCount, setIsCartOpen, theme, toggleTheme }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'menu', label: 'Menu Artisan', icon: Coffee },
    { id: 'builder', label: 'Lab Kopi (DIY)', icon: Coffee },
    { id: 'rewards', label: 'Loyalty & Reward', icon: Award },
    { id: 'orders', label: 'Status Pesanan', icon: History },
    { id: 'manager', label: 'Kelola Pesanan', icon: Sliders }
  ];

  return (
    <header className="header-container glass-panel">
      <div className="header-inner">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('menu')}
          className="logo-section"
        >
          <div className="logo-icon-wrapper">
            <Coffee />
          </div>
          <div>
            <h1 className="logo-text-title">
              Caffeine <span className="text-gold-gradient font-serif">&amp; Co.</span>
            </h1>
            <p className="logo-text-subtitle">Midnight Roast &amp; Brew</p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
              >
                <Icon />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Group */}
        <div className="actions-section">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="cart-btn"
            style={{ marginRight: '0.25rem' }}
            aria-label="Alih Tema"
            title={theme === 'dark' ? "Mode Terang" : "Mode Gelap"}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Cart Icon Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="cart-btn"
            aria-label="Keranjang"
          >
            <ShoppingBag />
            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="menu-toggle-btn"
            aria-label="Buka menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
              >
                <Icon />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
