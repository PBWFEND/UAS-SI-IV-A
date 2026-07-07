import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CreditCard, Coffee, Award, Sparkles } from 'lucide-react';
import { formatRupiah } from './MenuGrid';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  loyaltyPoints,
  onCheckout
}) {
  if (!isOpen) return null;

  // Checkout inputs state
  const [customerName, setCustomerName] = useState('Della Kartika');
  const [orderType, setOrderType] = useState('Dine In');
  const [tableNumber, setTableNumber] = useState('5');
  const [paymentMethod, setPaymentMethod] = useState('Cashless / QRIS');
  const [redeemReward, setRedeemReward] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  // Loyalty calculations: User needs 9 stamps to get a voucher reward
  const availableVouchers = Math.floor(loyaltyPoints / 10) || (loyaltyPoints >= 9 ? 1 : 0);

  // Subtotal calculation
  const subtotal = cartItems.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);

  // Determine discount
  // Find the cheapest beverage item in the cart to apply the free reward to
  const getCheapestBeveragePrice = () => {
    const beverageItems = cartItems.filter((item) => item.category !== 'pastries');
    if (beverageItems.length === 0) return 0;
    return Math.min(...beverageItems.map((item) => item.finalPrice));
  };

  const discountAmount = redeemReward && availableVouchers > 0 ? getCheapestBeveragePrice() : 0;
  const tax = Math.round((subtotal - discountAmount) * 0.11); // 11% tax Indonesia (PB1)
  const totalPrice = Math.max(0, subtotal - discountAmount + tax);

  const handleCheckoutClick = () => {
    if (!customerName.trim()) {
      setCheckoutError('Harap masukkan nama pelanggan.');
      return;
    }
    if (orderType === 'Dine In' && !tableNumber.trim()) {
      setCheckoutError('Harap masukkan nomor meja Anda.');
      return;
    }

    setCheckoutError('');
    onCheckout({
      customerName,
      orderType: orderType === 'Dine In' ? 'Makan di Tempat' : 'Bawa Pulang',
      tableNumber: orderType === 'Dine In' ? tableNumber : '',
      paymentMethod,
      redeemedReward: redeemReward && availableVouchers > 0,
      subtotal,
      tax,
      totalPrice
    });
    
    // Clear check state
    setRedeemReward(false);
    onClose();
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div 
        className="cart-drawer-panel" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-drawer-header-left">
            <Coffee />
            <h3>Keranjang Belanja Anda</h3>
          </div>
          <button 
            onClick={onClose} 
            className="modal-close-btn"
            aria-label="Tutup keranjang"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="cart-body">
          {cartItems.length > 0 ? (
            <>
              {/* Items Stack */}
              <div className="cart-items-stack">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item-card">
                    {/* Item Text Details */}
                    <div className="cart-item-main-details">
                      <h4 className="cart-item-title">{item.name}</h4>
                      
                      {/* Sub-options printout */}
                      {item.details && (
                        <p className="cart-item-options-text">
                          Ukuran: {item.details.size || 'Grande'} 
                          {item.details.milk ? ` • ${item.details.milk}` : ''}
                          {item.details.sweetness ? ` • ${item.details.sweetness}` : ''}
                          {item.details.ice ? ` • ${item.details.ice}` : ''}
                          {item.details.warmed ? ` • ${item.details.warmed}` : ''}
                          {item.details.addons && item.details.addons.length > 0 && (
                            <span style={{ display: 'block', marginTop: '2px' }}>
                              Tambahan: {item.details.addons.join(', ')}
                            </span>
                          )}
                        </p>
                      )}

                      {/* Barista special instruction notes */}
                      {item.specialNotes && (
                        <p className="cart-item-notes-text">
                          Catatan: "{item.specialNotes}"
                        </p>
                      )}

                      <div className="cart-item-price-row">
                        {formatRupiah(item.finalPrice * item.quantity)}
                        {item.quantity > 1 && (
                          <span className="cart-item-ea-price">
                            ({formatRupiah(item.finalPrice)} masing-masing)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions and quantity controls */}
                    <div className="cart-item-actions-group">
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="cart-item-del-btn"
                        title="Hapus produk"
                      >
                        <Trash2 />
                      </button>

                      <div className="quantity-badge-btn-group">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          aria-label="Kurangi jumlah"
                        >
                          <Minus />
                        </button>
                        <span className="quantity-badge-lbl">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          aria-label="Tambah jumlah"
                        >
                          <Plus />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Loyalty Reward Voucher Applicator */}
              {availableVouchers > 0 && cartItems.some((item) => item.category !== 'pastries') && (
                <div className="voucher-rewards-alert-box">
                  <Award />
                  <div className="voucher-details">
                    <h4>
                      Voucher Loyalitas Tersedia
                      <Sparkles />
                    </h4>
                    <p>
                      Anda memiliki stamp yang cukup untuk ditukarkan dengan minuman gratis! Diskon otomatis memotong harga minuman termurah.
                    </p>
                    <label className="voucher-checkbox-lbl">
                      <input
                        type="checkbox"
                        checked={redeemReward}
                        onChange={(e) => setRedeemReward(e.target.checked)}
                      />
                      Gunakan Reward Kopi Gratis
                    </label>
                  </div>
                </div>
              )}

              {/* Checkout Forms Section */}
              <div className="checkout-forms-section">
                <span className="checkout-section-title">Informasi Pengantaran</span>
                
                {/* Name */}
                <div className="checkout-field-group">
                  <label htmlFor="checkout-name">Nama Pelanggan</label>
                  <input
                    id="checkout-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Masukkan nama..."
                    className="checkout-input"
                  />
                </div>

                {/* Dine-in vs Takeaway Toggle */}
                <div className="checkout-field-group">
                  <label>Metode Penyajian</label>
                  <div className="order-type-btn-row">
                    <button
                      type="button"
                      onClick={() => setOrderType('Dine In')}
                      className={`order-type-btn ${orderType === 'Dine In' ? 'active' : ''}`}
                    >
                      Makan di Tempat
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('Take Away')}
                      className={`order-type-btn ${orderType === 'Take Away' ? 'active' : ''}`}
                    >
                      Bawa Pulang (Take Away)
                    </button>
                  </div>
                </div>

                {/* Table Number (If Dine in) */}
                {orderType === 'Dine In' && (
                  <div className="checkout-field-group">
                    <label htmlFor="checkout-table">Nomor Meja</label>
                    <input
                      id="checkout-table"
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="Contoh: 5, 12..."
                      className="checkout-input"
                    />
                  </div>
                )}

                {/* Payment Method dropdown */}
                <div className="checkout-field-group">
                  <label htmlFor="checkout-payment">Metode Pembayaran</label>
                  <select
                    id="checkout-payment"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="custom-select"
                  >
                    <option value="Cashless / QRIS">Cashless / QRIS</option>
                    <option value="Kartu Kredit / Debit">Kartu Kredit / Debit</option>
                    <option value="Tunai di Kasir">Tunai di Kasir</option>
                  </select>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-bag-card">
              <Trash2 />
              <p>Keranjang belanja Anda kosong. Jelajahi menu kami untuk memesan minuman pilihan Anda!</p>
            </div>
          )}
        </div>

        {/* Footer Billing Total Section */}
        {cartItems.length > 0 && (
          <div className="cart-footer-totals">
            <div className="total-summary-lines">
              <div className="total-summary-line">
                <span>Subtotal</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="total-summary-line highlight">
                  <span>Diskon Loyalitas</span>
                  <span>-{formatRupiah(discountAmount)}</span>
                </div>
              )}

              <div className="total-summary-line">
                <span>Pajak Restoran (11% PB1)</span>
                <span>{formatRupiah(tax)}</span>
              </div>

              <div className="total-summary-line-final">
                <span className="final-tot-lbl">Total Pembayaran</span>
                <span className="final-tot-val">{formatRupiah(totalPrice)}</span>
              </div>
            </div>

            {/* Error alerts */}
            {checkoutError && (
              <div className="checkout-error-alert">
                {checkoutError}
              </div>
            )}

            {/* Checkout Action Button */}
            <button
              onClick={handleCheckoutClick}
              className="btn-gold cart-checkout-btn"
            >
              <CreditCard className="w-4 h-4" />
              Kirim Pesanan &amp; Mulai Seduh
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
