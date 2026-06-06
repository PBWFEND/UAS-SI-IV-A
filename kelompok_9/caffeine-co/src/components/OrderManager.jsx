import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, Filter, ShoppingBag, PlusCircle, MinusCircle } from 'lucide-react';
import { MENU_ITEMS, formatRupiah } from './MenuGrid';

const STATUS_STEPS = {
  'Queued': { label: 'Mengantre', index: 0, percent: 10 },
  'Grinding': { label: 'Menggiling Kopi', index: 1, percent: 35 },
  'Extracting': { label: 'Ekstraksi Espresso', index: 2, percent: 60 },
  'Steaming': { label: 'Steaming Susu', index: 3, percent: 85 },
  'Ready': { label: 'Siap Diambil', index: 4, percent: 100 },
  'Completed': { label: 'Selesai', index: 4, percent: 100 }
};

export default function OrderManager({ orders, onCreateOrder, onUpdateOrder, onDeleteOrder }) {
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'completed'
  
  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  // Form states for Create / Edit
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('dine-in');
  const [tableNumber, setTableNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [selectedItems, setSelectedItems] = useState([]); // Array of { menuItemId, quantity, details }

  // Filtered orders list
  const filteredOrders = orders.filter(order => {
    if (filterStatus === 'active') return order.status !== 'Completed';
    if (filterStatus === 'completed') return order.status === 'Completed';
    return true; // 'all'
  });

  // Open creation modal
  const openCreateModal = () => {
    setCustomerName('');
    setOrderType('dine-in');
    setTableNumber('');
    setPaymentMethod('cash');
    setSelectedItems([]);
    setIsCreateOpen(true);
  };

  // Open edit modal
  const openEditModal = (order) => {
    setEditingOrder(order);
    setCustomerName(order.customerName);
    setOrderType(order.orderType);
    setTableNumber(order.tableNumber || '');
    setPaymentMethod(order.paymentMethod);
    // Map items
    setSelectedItems(order.items.map(it => ({
      id: it.id,
      menuItemId: it.itemId || it.id,
      name: it.name,
      price: it.finalPrice || it.basePrice,
      quantity: it.quantity || 1,
      details: it.details || {}
    })));
    setIsEditOpen(true);
  };

  // Add item in create/edit form
  const handleAddItemToForm = (menuItem) => {
    setSelectedItems(prev => {
      const idx = prev.findIndex(i => i.menuItemId === menuItem.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += 1;
        return updated;
      }
      return [...prev, {
        id: `form_item_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        menuItemId: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: 1,
        details: { size: 'Grande', milk: 'Susu Murni (Whole)', sweetness: 'Manis Standar (100%)' }
      }];
    });
  };

  // Update quantity in create/edit form
  const handleUpdateFormItemQty = (menuItemId, change) => {
    setSelectedItems(prev => 
      prev.map(item => {
        if (item.menuItemId === menuItemId) {
          const newQty = item.quantity + change;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };

  // Submit new order (CREATE)
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || selectedItems.length === 0) return;

    // Calculate prices
    const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.1);
    const totalPrice = subtotal + tax;

    const newOrderItems = selectedItems.map(item => ({
      id: item.id,
      itemId: item.menuItemId,
      name: item.name,
      basePrice: item.price,
      finalPrice: item.price,
      quantity: item.quantity,
      details: item.details
    }));

    const newOrder = {
      id: `ord_${Date.now()}`,
      customerName: customerName.trim(),
      orderType,
      tableNumber: orderType === 'dine-in' ? tableNumber : '',
      paymentMethod,
      items: newOrderItems,
      subtotal,
      tax,
      totalPrice,
      status: 'Queued',
      timestamp: new Date().toISOString(),
      stepIndex: 0,
      progressPercent: 10
    };

    onCreateOrder(newOrder);
    setIsCreateOpen(false);
  };

  // Submit edited order (UPDATE)
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || selectedItems.length === 0 || !editingOrder) return;

    const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.1);
    const totalPrice = subtotal + tax;

    const updatedOrderItems = selectedItems.map(item => ({
      id: item.id || `ord_it_${Date.now()}`,
      itemId: item.menuItemId,
      name: item.name,
      basePrice: item.price,
      finalPrice: item.price,
      quantity: item.quantity,
      details: item.details
    }));

    const updatedOrder = {
      ...editingOrder,
      customerName: customerName.trim(),
      orderType,
      tableNumber: orderType === 'dine-in' ? tableNumber : '',
      paymentMethod,
      items: updatedOrderItems,
      subtotal,
      tax,
      totalPrice
    };

    onUpdateOrder(updatedOrder);
    setIsEditOpen(false);
    setEditingOrder(null);
  };

  // Change brewing status (UPDATE status)
  const handleStatusChange = (orderId, newStatus) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const stepData = STATUS_STEPS[newStatus];
    const updatedOrder = {
      ...order,
      status: newStatus,
      stepIndex: stepData.index,
      progressPercent: stepData.percent
    };

    onUpdateOrder(updatedOrder);
  };

  return (
    <div className="orders-history-page max-w-layout" style={{ padding: '2rem 0' }}>
      
      {/* Upper Manager Banner */}
      <div className="history-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="history-title font-serif">Coffee Order Manager</h2>
          <p className="history-desc" style={{ marginTop: '0.25rem' }}>
            Panel kendali barista untuk mengelola antrean pesanan kopi (CRUD).
          </p>
        </div>

        <button 
          onClick={openCreateModal}
          className="btn-gold" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus className="w-4 h-4" />
          Buat Pesanan Baru
        </button>
      </div>

      {/* Filter tabs bar */}
      <div className="filters-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="categories-list">
          <button 
            onClick={() => setFilterStatus('all')}
            className={`category-tab ${filterStatus === 'all' ? 'active' : ''}`}
          >
            Semua Pesanan ({orders.length})
          </button>
          <button 
            onClick={() => setFilterStatus('active')}
            className={`category-tab ${filterStatus === 'active' ? 'active' : ''}`}
          >
            Antrean Aktif ({orders.filter(o => o.status !== 'Completed').length})
          </button>
          <button 
            onClick={() => setFilterStatus('completed')}
            className={`category-tab ${filterStatus === 'completed' ? 'active' : ''}`}
          >
            Selesai ({orders.filter(o => o.status === 'Completed').length})
          </button>
        </div>
      </div>

      {/* Orders Grid/Table CRUD */}
      {filteredOrders.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredOrders.map((order) => (
            <div key={order.id} className="glass-card" style={{ padding: '1.25rem', border: '1px solid var(--glass-border)' }}>
              
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', borderBottom: '1px solid rgba(200, 162, 124, 0.08)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="order-id" style={{ color: 'var(--gold)', fontWeight: '700' }}>#{order.id.replace('ord_', '')}</span>
                    <span className="order-type-badge" style={{ fontSize: '10px', background: 'rgba(200, 162, 124, 0.1)', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', color: 'var(--gold-bright)' }}>
                      {order.orderType === 'dine-in' ? `Makan di Tempat (Meja ${order.tableNumber})` : 'Bawa Pulang (Takeaway)'}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginTop: '0.25rem', color: 'var(--text-white)' }}>
                    Pelanggan: <span className="font-serif italic text-gold-gradient">{order.customerName}</span>
                  </h4>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {/* Status Dropdown selector */}
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="custom-select"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', minWidth: '140px', margin: 0 }}
                  >
                    {Object.entries(STATUS_STEPS).map(([key, data]) => (
                      <option key={key} value={key}>{data.label}</option>
                    ))}
                  </select>

                  {/* Edit action */}
                  <button 
                    onClick={() => openEditModal(order)}
                    className="cart-btn"
                    title="Ubah Rincian"
                    style={{ width: '30px', height: '30px', borderRadius: '0.5rem' }}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete action */}
                  <button 
                    onClick={() => {
                      if (window.confirm('Hapus transaksi pesanan ini secara permanen?')) {
                        onDeleteOrder(order.id);
                      }
                    }}
                    className="cart-btn"
                    title="Hapus Pesanan"
                    style={{ width: '30px', height: '30px', borderRadius: '0.5rem', color: 'var(--accent-red)' }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div style={{ margin: '0.5rem 0 1rem 0' }}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {order.items.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-cream)' }}>
                      <div>
                        <span style={{ color: 'var(--gold)', fontWeight: '600' }}>{item.quantity}x</span> {item.name}
                        {item.details && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                            ({item.details.size || 'Grande'}{item.details.milk ? `, ${item.details.milk}` : ''})
                          </span>
                        )}
                      </div>
                      <span>{formatRupiah((item.finalPrice || item.basePrice) * item.quantity)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price calculations footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px dotted rgba(200, 162, 124, 0.08)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Metode: {order.paymentMethod === 'cash' ? 'Tunai' : order.paymentMethod === 'e-wallet' ? 'E-Wallet' : 'Debit/Kredit'} • {new Date(order.timestamp).toLocaleTimeString('id-ID')}
                </span>
                <span style={{ fontWeight: '700', color: 'var(--gold-bright)' }}>
                  Total: {formatRupiah(order.totalPrice)}
                </span>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state-container">
          <p>Tidak ada transaksi pesanan yang sesuai dengan filter saat ini.</p>
        </div>
      )}

      {/* CRUD MODAL: CREATE ORDER */}
      {isCreateOpen && (
        <div className="modal-overlay">
          <div className="modal-box glass-panel" style={{ maxWidth: '650px', width: '90%' }}>
            
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Buat Pesanan Baru (Staf)</h3>
                <p className="modal-subtitle">Tambah transaksi pemesanan secara manual ke antrean</p>
              </div>
              <button onClick={() => setIsCreateOpen(false)} className="modal-close-btn"><X /></button>
            </div>

            <form onSubmit={handleCreateSubmit}>
              <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                {/* Customer name */}
                <div>
                  <label className="selector-label">Nama Pelanggan</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Masukkan nama pembeli..."
                    className="custom-select"
                    style={{ width: '100%', background: 'var(--bg-cream)' }}
                  />
                </div>

                {/* Service type and table */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '150px' }}>
                    <label className="selector-label">Metode Penyajian</label>
                    <select
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="custom-select"
                    >
                      <option value="dine-in">Makan di Tempat</option>
                      <option value="takeaway">Bawa Pulang</option>
                    </select>
                  </div>

                  {orderType === 'dine-in' && (
                    <div style={{ flex: 1, minWidth: '150px' }}>
                      <label className="selector-label">Nomor Meja</label>
                      <input
                        type="number"
                        required
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder="Contoh: 5"
                        className="custom-select"
                        style={{ width: '100%', background: 'var(--bg-cream)' }}
                      />
                    </div>
                  )}
                </div>

                {/* Payment method */}
                <div>
                  <label className="selector-label">Metode Pembayaran</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="custom-select"
                  >
                    <option value="cash">Tunai (Cash)</option>
                    <option value="e-wallet">E-Wallet (QRIS)</option>
                    <option value="card">Debit / Kredit</option>
                  </select>
                </div>

                {/* Products Picker */}
                <div>
                  <label className="selector-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Pilih Produk Menu</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gold-bright)' }}>Ketik tombol "+" untuk menambah</span>
                  </label>
                  
                  {/* Quick menu product picker grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.5rem', maxHeight: '150px', overflowY: 'auto', border: '1px solid rgba(200, 162, 124, 0.08)', borderRadius: '0.5rem', padding: '0.5rem', background: 'rgba(0,0,0,0.2)' }}>
                    {MENU_ITEMS.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => handleAddItemToForm(item)}
                        style={{ padding: '0.4rem', background: 'var(--bg-cream)', borderRadius: '0.25rem', border: '1px solid rgba(200, 162, 124, 0.05)', fontSize: '0.75rem', cursor: 'pointer', textAlign: 'center', transition: 'var(--transition-smooth)' }}
                        className="item-picker-btn"
                      >
                        <div style={{ fontWeight: '600', color: 'var(--text-white)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                        <div style={{ color: 'var(--gold)', marginTop: '0.15rem' }}>{formatRupiah(item.price)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected items list in form */}
                <div>
                  <label className="selector-label">Daftar Belanjaan</label>
                  {selectedItems.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', border: '1px solid rgba(200, 162, 124, 0.1)', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(0,0,0,0.1)' }}>
                      {selectedItems.map((item) => (
                        <div key={item.menuItemId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                          <span style={{ color: 'var(--text-cream)' }}>{item.name}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <button type="button" onClick={() => handleUpdateFormItemQty(item.menuItemId, -1)} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                <MinusCircle className="w-4 h-4" />
                              </button>
                              <span style={{ fontWeight: '700', width: '20px', textAlign: 'center', color: 'var(--text-white)' }}>{item.quantity}</span>
                              <button type="button" onClick={() => handleUpdateFormItemQty(item.menuItemId, 1)} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                <PlusCircle className="w-4 h-4" />
                              </button>
                            </div>
                            <span style={{ fontWeight: '600', color: 'var(--gold-bright)', minWidth: '70px', textAlign: 'right' }}>
                              {formatRupiah(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem', border: '1px dashed rgba(200, 162, 124, 0.15)', borderRadius: '0.5rem' }}>
                      Belum ada item terpilih. Silakan pilih menu di atas.
                    </p>
                  )}
                </div>

              </div>

              {/* Footer pricing */}
              <div className="modal-footer">
                <div>
                  <span className="modal-price-label">Subtotal</span>
                  <div className="modal-price-val" style={{ fontSize: '1.25rem' }}>
                    {formatRupiah(selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={selectedItems.length === 0}
                  className="btn-gold modal-add-btn"
                >
                  Buat Antrean Pesanan
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* CRUD MODAL: EDIT ORDER */}
      {isEditOpen && editingOrder && (
        <div className="modal-overlay">
          <div className="modal-box glass-panel" style={{ maxWidth: '650px', width: '90%' }}>
            
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Ubah Rincian Pesanan</h3>
                <p className="modal-subtitle">Mengubah rincian transaksi #{editingOrder.id.replace('ord_', '')}</p>
              </div>
              <button onClick={() => { setIsEditOpen(false); setEditingOrder(null); }} className="modal-close-btn"><X /></button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                {/* Customer name */}
                <div>
                  <label className="selector-label">Nama Pelanggan</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Masukkan nama pembeli..."
                    className="custom-select"
                    style={{ width: '100%', background: 'var(--bg-cream)' }}
                  />
                </div>

                {/* Service type and table */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '150px' }}>
                    <label className="selector-label">Metode Penyajian</label>
                    <select
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="custom-select"
                    >
                      <option value="dine-in">Makan di Tempat</option>
                      <option value="takeaway">Bawa Pulang</option>
                    </select>
                  </div>

                  {orderType === 'dine-in' && (
                    <div style={{ flex: 1, minWidth: '150px' }}>
                      <label className="selector-label">Nomor Meja</label>
                      <input
                        type="number"
                        required
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder="Contoh: 5"
                        className="custom-select"
                        style={{ width: '100%', background: 'var(--bg-cream)' }}
                      />
                    </div>
                  )}
                </div>

                {/* Payment method */}
                <div>
                  <label className="selector-label">Metode Pembayaran</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="custom-select"
                  >
                    <option value="cash">Tunai (Cash)</option>
                    <option value="e-wallet">E-Wallet (QRIS)</option>
                    <option value="card">Debit / Kredit</option>
                  </select>
                </div>

                {/* Products Picker */}
                <div>
                  <label className="selector-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Tambah Produk Lain</span>
                  </label>
                  
                  {/* Quick menu product picker grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.5rem', maxHeight: '120px', overflowY: 'auto', border: '1px solid rgba(200, 162, 124, 0.08)', borderRadius: '0.5rem', padding: '0.5rem', background: 'rgba(0,0,0,0.2)' }}>
                    {MENU_ITEMS.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => handleAddItemToForm(item)}
                        style={{ padding: '0.4rem', background: 'var(--bg-cream)', borderRadius: '0.25rem', border: '1px solid rgba(200, 162, 124, 0.05)', fontSize: '0.75rem', cursor: 'pointer', textAlign: 'center' }}
                      >
                        <div style={{ fontWeight: '600', color: 'var(--text-white)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                        <div style={{ color: 'var(--gold)', marginTop: '0.15rem' }}>{formatRupiah(item.price)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected items list in form */}
                <div>
                  <label className="selector-label">Daftar Belanjaan Terpilih</label>
                  {selectedItems.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', border: '1px solid rgba(200, 162, 124, 0.1)', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(0,0,0,0.1)' }}>
                      {selectedItems.map((item) => (
                        <div key={item.menuItemId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                          <span style={{ color: 'var(--text-cream)' }}>{item.name}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <button type="button" onClick={() => handleUpdateFormItemQty(item.menuItemId, -1)} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                <MinusCircle className="w-4 h-4" />
                              </button>
                              <span style={{ fontWeight: '700', width: '20px', textAlign: 'center', color: 'var(--text-white)' }}>{item.quantity}</span>
                              <button type="button" onClick={() => handleUpdateFormItemQty(item.menuItemId, 1)} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                <PlusCircle className="w-4 h-4" />
                              </button>
                            </div>
                            <span style={{ fontWeight: '600', color: 'var(--gold-bright)', minWidth: '70px', textAlign: 'right' }}>
                              {formatRupiah(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem', border: '1px dashed rgba(200, 162, 124, 0.15)', borderRadius: '0.5rem' }}>
                      Tidak ada item tersisa. Order ini butuh minimal 1 item.
                    </p>
                  )}
                </div>

              </div>

              {/* Footer pricing */}
              <div className="modal-footer">
                <div>
                  <span className="modal-price-label">Subtotal Baru</span>
                  <div className="modal-price-val" style={{ fontSize: '1.25rem' }}>
                    {formatRupiah(selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={selectedItems.length === 0}
                  className="btn-gold modal-add-btn"
                >
                  Simpan Perubahan
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
