import React from 'react';
import { Award, Check, Sparkles } from 'lucide-react';

export default function LoyaltyTracker({ loyaltyPoints, totalOrders, userName }) {
  // 1 stamp earned per beverage. If loyaltyPoints has stamps, they are tracked out of 10.
  // Stamps = loyaltyPoints % 10. Once it hits 10, the user gets a free reward.
  const currentStamps = loyaltyPoints % 10;
  const freeVouchersCount = Math.floor(loyaltyPoints / 10);

  return (
    <div className="rewards-page max-w-layout">
      {/* Intro section */}
      <div className="rewards-intro">
        <span className="hero-tag">
          <Sparkles />
          Caffeine &amp; Co. Club
        </span>
        <h2>Program Loyalitas Artisan</h2>
        <p>
          Kumpulkan stamp untuk setiap minuman yang dipesan. Selesaikan kartu Anda dengan 9 stamp untuk mendapatkan minuman ke-10 secara gratis dari kami.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="rewards-grid">
        
        {/* Left Card: Membership Card */}
        <div className="member-stats-card glass-panel">
          <div className="member-deco-glow"></div>
          <div>
            <span className="member-tier-lbl">
              <Award />
              {loyaltyPoints >= 10 ? 'Anggota Gold Roast' : 'Anggota Artisan'}
            </span>
            <h3 className="member-name">{userName}</h3>
          </div>

          <div className="member-stats-stack">
            <div className="member-stat-row">
              <span className="member-stat-lbl">Stamp Aktif</span>
              <span className="member-stat-val gold">
                {currentStamps} / 9
              </span>
            </div>
            <div className="member-stat-row">
              <span className="member-stat-lbl">Voucher Kopi Gratis</span>
              <span className="member-stat-val gold">
                <Sparkles />
                {freeVouchersCount} Tersedia
              </span>
            </div>
            <div className="member-stat-row">
              <span className="member-stat-lbl">Total Pesanan Terkirim</span>
              <span className="member-stat-val">{totalOrders}</span>
            </div>
          </div>
        </div>

        {/* Right Card: Stamp Card Panel */}
        <div className="stamp-card-container glass-panel">
          <div className="stamp-card-deco-line"></div>
          
          <div className="stamp-card-header">
            <div>
              <h4>Kartu Stamp Digital</h4>
              <p>Stamp otomatis diperbarui setelah checkout</p>
            </div>
            <div className="stamp-counter-badge">
              {currentStamps} <span>Stamp</span>
            </div>
          </div>

          {/* Stamps Slot Grid */}
          <div className="stamps-grid">
            {/* 9 Standard Stamps */}
            {Array.from({ length: 9 }).map((_, idx) => {
              const isStamped = idx < currentStamps;
              return (
                <div 
                  key={idx} 
                  className={`stamp-slot ${isStamped ? 'stamped' : ''}`}
                  title={isStamped ? "Stamped" : `Stamp ${idx + 1}`}
                >
                  {isStamped ? <Check /> : idx + 1}
                </div>
              );
            })}

            {/* 10th Free Voucher Stamp */}
            <div 
              className={`stamp-slot stamp-slot-free ${currentStamps >= 9 ? 'stamped' : ''}`}
              title="Slot Hadiah Minuman Ke-10"
            >
              <Award />
            </div>
          </div>

          <div className="stamp-card-footer">
            <p>
              Stamp hanya berlaku untuk pembelian minuman. Pembelian kue/pastry tidak mendapatkan stamp.
            </p>
            {currentStamps >= 9 && (
              <span className="stamp-card-footer-badge">
                Minuman Selanjutnya Gratis!
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Info Cards Row */}
      <div className="info-cards-row glass-panel">
        <div className="info-card-box">
          <h5>1. Pesan Minuman</h5>
          <p>Pesan espresso klasik, minuman khas, teh, atau cold brew dari menu kami.</p>
        </div>
        <div className="info-card-box">
          <h5>2. Dapatkan Stamp</h5>
          <p>Setiap minuman yang dipesan menambahkan satu stamp secara real-time di sistem loyalitas.</p>
        </div>
        <div className="info-card-box">
          <h5>3. Klaim Kopi Gratis</h5>
          <p>Tukarkan voucher Anda di keranjang belanja untuk memotong biaya minuman pilihan Anda.</p>
        </div>
      </div>

    </div>
  );
}
