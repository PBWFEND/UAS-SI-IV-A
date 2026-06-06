import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, ShoppingBag, Loader2, Sparkles, Coffee, Trash2, XCircle, CheckCircle } from 'lucide-react';
import { formatRupiah } from './MenuGrid';

const TRACKING_STEPS = [
  { status: 'Queued', percentage: 10, label: 'Pesanan Mengantre', desc: 'Barista sedang memverifikasi rincian antrean pesanan Anda.' },
  { status: 'Grinding', percentage: 35, label: 'Menggiling Biji Kopi', desc: 'Memilih biji kopi sangrai segar dan menggilingnya dengan tingkat kehalusan presisi.' },
  { status: 'Extracting', percentage: 65, label: 'Ekstraksi Espresso', desc: 'Mengalirkan air pegunungan panas bertekanan tinggi untuk mengekstrak konsentrat kopi yang kaya.' },
  { status: 'Steaming', percentage: 85, label: 'Memanaskan Susu (Steaming)', desc: 'Mengocok susu segar pada suhu premium untuk menghasilkan tekstur busa mikro beludru.' },
  { status: 'Ready', percentage: 100, label: 'Siap Diambil', desc: 'Minuman artisan Anda telah selesai dibuat dan siap diambil di meja bar!' }
];

export default function OrderHistory({ orders, onCompleteOrder, setOrders }) {
  const [activeSubTab, setActiveSubTab] = useState('active');

  const activeOrders = orders.filter((o) => o.status !== 'Completed');
  const completedOrders = orders.filter((o) => o.status === 'Completed');

  const [secondsLeft, setSecondsLeft] = useState(10);

  // Simulated Timer ticker loop to advance orders in real-time
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        const nextVal = prev <= 1 ? 10 : prev - 1;

        if (nextVal === 10) {
          let changed = false;
          const updatedOrders = orders.map((order) => {
            if (order.status === 'Completed') return order;

            const currentIdx = TRACKING_STEPS.findIndex((s) => s.status === order.status);
            
            if (currentIdx > -1 && currentIdx < TRACKING_STEPS.length - 1) {
              const nextStep = TRACKING_STEPS[currentIdx + 1];
              changed = true;
              return {
                ...order,
                status: nextStep.status,
                stepIndex: currentIdx + 1,
                progressPercent: nextStep.percentage
              };
            } else if (order.status === 'Ready') {
              onCompleteOrder(order.id);
            }
            return order;
          });

          if (changed) {
            setOrders(updatedOrders);
          }
        }

        return nextVal;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [orders, onCompleteOrder, setOrders]);

  const getStepDetails = (status) => {
    return TRACKING_STEPS.find((s) => s.status === status) || TRACKING_STEPS[0];
  };

  const getFormatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };

  const handleCancelActiveOrder = (orderId) => {
    if (window.confirm('Batalkan dan hapus antrean pesanan ini?')) {
      setOrders(prev => prev.filter(o => o.id !== orderId));
    }
  };

  const handleInstantComplete = (orderId) => {
    onCompleteOrder(orderId);
  };

  const handleDeletePastOrder = (orderId) => {
    if (window.confirm('Hapus transaksi ini dari riwayat?')) {
      setOrders(prev => prev.filter(o => o.id !== orderId));
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Bersihkan semua riwayat transaksi yang selesai?')) {
      setOrders(prev => prev.filter(o => o.status !== 'Completed'));
    }
  };

  return (
    <div className="history-page max-w-layout">
      
      {/* Sub tabs nav bar */}
      <div className="tabs-bar">
        <button
          onClick={() => setActiveSubTab('active')}
          className={`history-tab-btn ${activeSubTab === 'active' ? 'active' : ''}`}
        >
          Status Penyeduhan ({activeOrders.length})
        </button>
        <button
          onClick={() => setActiveSubTab('past')}
          className={`history-tab-btn ${activeSubTab === 'past' ? 'active' : ''}`}
        >
          Riwayat Transaksi ({completedOrders.length})
        </button>
      </div>

      {/* Tab Panels */}
      {activeSubTab === 'active' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {activeOrders.length > 0 ? (
            activeOrders.map((order) => {
              const currentStep = getStepDetails(order.status);
              const isReady = order.status === 'Ready';

              const currentStepIdx = TRACKING_STEPS.findIndex((s) => s.status === order.status);
              const remainingSteps = TRACKING_STEPS.length - 1 - currentStepIdx;
              const totalSecondsRemaining = remainingSteps > 0 
                ? (remainingSteps - 1) * 10 + secondsLeft 
                : 0;

              return (
                <div 
                  key={order.id} 
                  className={`active-order-card glass-card ${isReady ? 'ready' : ''}`}
                >
                  
                  {/* Header Row */}
                  <div className="active-order-card-header">
                    <div className="active-order-header-left">
                      <div className="active-order-meta-info">
                        <span>ID: {order.id.replace('ord_', '#')}</span>
                        <span className="meta-divider-dot"></span>
                        <span className="meta-accent-lbl">{order.orderType}</span>
                        {order.tableNumber && (
                          <>
                            <span className="meta-divider-dot"></span>
                            <span>Meja {order.tableNumber}</span>
                          </>
                        )}
                      </div>
                      <h4>Atas Nama {order.customerName}</h4>
                    </div>

                    <div className="active-order-header-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button
                          onClick={() => handleInstantComplete(order.id)}
                          className="btn-gold"
                          title="Selesaikan Instan"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', height: '28px' }}
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Selesaikan
                        </button>
                        <button
                          onClick={() => handleCancelActiveOrder(order.id)}
                          className="cart-btn"
                          title="Batalkan Pesanan"
                          style={{ width: '28px', height: '28px', padding: 0, color: 'var(--accent-red)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="order-header-price" style={{ marginTop: '0.25rem' }}>
                        {formatRupiah(order.totalPrice)}
                      </span>
                      <span className="order-header-time">
                        Dipesan pukul {getFormatTime(order.timestamp)}
                      </span>
                    </div>
                  </div>

                  {/* Split Layout: Tracker progress vs Graphic */}
                  <div className="tracker-layout-row">
                    
                    {/* Left Column: Progress status */}
                    <div className="tracker-progress-column">
                      <div className="tracker-status-row">
                        <span className={`tracker-status-lbl ${isReady ? 'ready' : ''}`}>
                          {isReady ? <Sparkles /> : <Loader2 className="animate-spin" />}
                          {currentStep.label}
                        </span>
                        <span className="tracker-status-pct">
                          {currentStep.percentage}%
                        </span>
                      </div>

                      {/* Bar Track */}
                      <div className="progress-bar-track">
                        <div 
                          className="progress-bar-fill"
                          style={{ width: `${currentStep.percentage}%` }}
                        ></div>
                      </div>

                      {/* Timer details */}
                      {!isReady && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--gold-bright)', marginTop: '0.5rem', fontWeight: '500' }}>
                          <span>Estimasi Selesai: ~{totalSecondsRemaining} detik</span>
                          <span>Tahap ini: {secondsLeft}s</span>
                        </div>
                      )}

                      {/* Description */}
                      <p className="tracker-step-desc" style={{ marginTop: '0.5rem' }}>
                        {currentStep.desc}
                      </p>
                    </div>

                    {/* Right Column: Visual Cup Box */}
                    <div className="tracker-graphic-wrapper">
                      <div className={`tracker-graphic-box ${isReady ? 'ready' : ''}`}>
                        <div style={{ position: 'relative' }}>
                          {/* Animated steam lines if ready or brewing */}
                          {order.status !== 'Queued' && (
                            <div className="tracker-steaming-lines">
                              <span style={{ animationDelay: '0.1s' }}></span>
                              <span style={{ animationDelay: '0.4s' }}></span>
                              <span style={{ animationDelay: '0.2s' }}></span>
                            </div>
                          )}
                          <Coffee className="w-12 h-12" />
                        </div>
                        <span className="tracker-cup-state-lbl">
                          {isReady ? 'Siap disajikan' : 'Sedang diseduh...'}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Order Breakdown Checklist */}
                  <div className="order-breakdown-box">
                    <span className="order-breakdown-title">Daftar Minuman</span>
                    <ul className="order-breakdown-items">
                      {order.items.map((item, index) => (
                        <li key={index} className="order-breakdown-item">
                          <div className="order-breakdown-item-main">
                            <span className="order-breakdown-item-qty">{item.quantity}x</span>
                            {item.name}
                            {item.details && (
                              <span className="order-breakdown-item-opts">
                                {item.details.size || 'Grande'} 
                                {item.details.milk ? ` • ${item.details.milk}` : ''}
                                {item.details.sweetness ? ` • ${item.details.sweetness}` : ''}
                              </span>
                            )}
                          </div>
                          <span className="order-breakdown-item-price">
                            {formatRupiah(item.finalPrice * item.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              );
            })
          ) : (
            <div className="empty-state-container">
              <ShoppingBag className="w-8 h-8" style={{ color: 'rgba(200, 162, 124, 0.2)', margin: '0 auto 0.5rem auto' }} />
              <p>Tidak ada pesanan aktif yang sedang diseduh.</p>
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'past' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {completedOrders.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="btn-outline"
              style={{ alignSelf: 'flex-end', padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderColor: 'var(--accent-red)', color: 'var(--accent-red)' }}
            >
              Bersihkan Semua Riwayat
            </button>
          )}
          {completedOrders.length > 0 ? (
            completedOrders.map((order) => (
              <div key={order.id} className="past-order-row-card glass-card">
                
                {/* Details text */}
                <div className="past-order-details-col">
                  <div className="past-order-meta-header">
                    <CheckCircle2 />
                    <span>ID: {order.id.replace('ord_', '#')}</span>
                  </div>
                  
                  {order.tableNumber && (
                    <span className="past-order-table-lbl">
                      Makan di Tempat • Meja {order.tableNumber}
                    </span>
                  )}

                  <p className="past-order-items-summary">
                    {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                  </p>

                  <span className="past-order-date">
                    Selesai pukul {getFormatTime(order.timestamp)}
                  </span>
                </div>

                {/* Price and status badge */}
                <div className="past-order-price-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <button
                    onClick={() => handleDeletePastOrder(order.id)}
                    className="cart-btn"
                    title="Hapus Transaksi"
                    style={{ width: '28px', height: '28px', padding: 0, color: 'var(--accent-red)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <span className="past-order-price-lbl">Total Pembayaran</span>
                  <span className="past-order-price-val">
                    {formatRupiah(order.totalPrice)}
                  </span>
                  <span className="past-order-status-badge">
                    Sudah Diambil
                  </span>
                </div>

              </div>
            ))
          ) : (
            <div className="empty-state-container">
              <Clock className="w-8 h-8" style={{ color: 'rgba(200, 162, 124, 0.2)', margin: '0 auto 0.5rem auto' }} />
              <p>Belum ada riwayat pesanan yang diselesaikan.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
