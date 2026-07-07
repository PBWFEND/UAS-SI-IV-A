import React, { useState } from 'react';
import { Award, Check, Sparkles, Plus, Edit2, Trash2, UserCheck, X } from 'lucide-react';

export default function LoyaltyTracker({ 
  members = [], 
  activeMemberId, 
  setActiveMemberId, 
  setMembers, 
  loyaltyPoints = 0, 
  totalOrders = 0, 
  userName = '' 
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  // Form states
  const [memberName, setMemberName] = useState('');
  const [memberPoints, setMemberPoints] = useState(0);
  const [memberOrders, setMemberOrders] = useState(0);

  // 1 stamp earned per beverage. Stamps = loyaltyPoints % 10.
  const currentStamps = loyaltyPoints % 10;
  const freeVouchersCount = Math.floor(loyaltyPoints / 10);

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!memberName.trim()) return;

    const newMember = {
      id: `m_${Date.now()}`,
      name: memberName.trim(),
      loyaltyPoints: Number(memberPoints),
      totalOrders: Number(memberOrders)
    };

    setMembers(prev => [...prev, newMember]);
    setActiveMemberId(newMember.id);
    setIsAddModalOpen(false);
    setMemberName('');
    setMemberPoints(0);
    setMemberOrders(0);
  };

  const handleEditMemberSubmit = (e) => {
    e.preventDefault();
    if (!memberName.trim() || !editingMember) return;

    setMembers(prev => 
      prev.map(m => m.id === editingMember.id ? {
        ...m,
        name: memberName.trim(),
        loyaltyPoints: Number(memberPoints),
        totalOrders: Number(memberOrders)
      } : m)
    );
    setIsEditModalOpen(false);
    setEditingMember(null);
  };

  const openEditModal = (member) => {
    setEditingMember(member);
    setMemberName(member.name);
    setMemberPoints(member.loyaltyPoints);
    setMemberOrders(member.totalOrders);
    setIsEditModalOpen(true);
  };

  const handleDeleteMember = (memberId, name) => {
    if (members.length <= 1) {
      alert('Gagal menghapus: Harus ada minimal satu anggota terdaftar!');
      return;
    }
    if (window.confirm(`Hapus anggota "${name}" dari program loyalitas?`)) {
      setMembers(prev => {
        const nextMembers = prev.filter(m => m.id !== memberId);
        if (memberId === activeMemberId) {
          setActiveMemberId(nextMembers[0].id);
        }
        return nextMembers;
      });
    }
  };

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

      {/* Profil Anggota Selector & CRUD */}
      <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-white)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserCheck className="w-5 h-5 text-gold-bright" />
              Kelola Profil Anggota Club
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
              Pilih anggota aktif atau daftarkan profil loyalitas baru (CRUD).
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <select
              value={activeMemberId}
              onChange={(e) => setActiveMemberId(e.target.value)}
              className="custom-select"
              style={{ margin: 0, padding: '0.5rem 1rem', fontSize: '0.85rem', minWidth: '180px' }}
            >
              {members.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-gold"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              <Plus className="w-4 h-4" /> Daftar Anggota
            </button>
          </div>
        </div>

        {/* Members Table/List for Editing/Deleting */}
        <div style={{ marginTop: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem' }}>
          {members.map(m => (
            <div 
              key={m.id} 
              className="glass-card" 
              style={{ 
                padding: '0.75rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                background: m.id === activeMemberId ? 'rgba(200, 162, 124, 0.08)' : 'rgba(0,0,0,0.15)',
                borderColor: m.id === activeMemberId ? 'var(--gold)' : 'rgba(200, 162, 124, 0.1)'
              }}
            >
              <div>
                <div style={{ fontWeight: '600', color: m.id === activeMemberId ? 'var(--gold-bright)' : 'var(--text-white)', fontSize: '0.9rem' }}>
                  {m.name} {m.id === activeMemberId && ' (Aktif)'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  Stamp: {m.loyaltyPoints % 10} • Voucher: {Math.floor(m.loyaltyPoints / 10)} • Orders: {m.totalOrders}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <button
                  onClick={() => openEditModal(m)}
                  className="cart-btn"
                  title="Ubah Anggota"
                  style={{ width: '28px', height: '28px', padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteMember(m.id, m.name)}
                  className="cart-btn"
                  title="Hapus"
                  style={{ width: '28px', height: '28px', padding: 0, color: 'var(--accent-red)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
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

      {/* Modal: Add Member */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box glass-panel" style={{ maxWidth: '450px', width: '90%' }}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Daftar Anggota Baru</h3>
                <p className="modal-subtitle">Tambahkan anggota baru ke program loyalitas</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="modal-close-btn" aria-label="Tutup"><X /></button>
            </div>
            
            <form onSubmit={handleAddMember}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label className="selector-label">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder="Masukkan nama anggota..."
                    className="custom-select"
                    style={{ width: '100%', background: 'var(--bg-cream)' }}
                  />
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label className="selector-label">Stamps Awal</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={memberPoints}
                      onChange={(e) => setMemberPoints(e.target.value)}
                      className="custom-select"
                      style={{ width: '100%', background: 'var(--bg-cream)' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="selector-label">Total Pesanan</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={memberOrders}
                      onChange={(e) => setMemberOrders(e.target.value)}
                      className="custom-select"
                      style={{ width: '100%', background: 'var(--bg-cream)' }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn-outline">Batal</button>
                <button type="submit" className="btn-gold">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Member */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box glass-panel" style={{ maxWidth: '450px', width: '90%' }}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Ubah Profil Anggota</h3>
                <p className="modal-subtitle">Modifikasi nama atau stamps milik {editingMember?.name}</p>
              </div>
              <button onClick={() => { setIsEditModalOpen(false); setEditingMember(null); }} className="modal-close-btn" aria-label="Tutup"><X /></button>
            </div>
            
            <form onSubmit={handleEditMemberSubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label className="selector-label">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder="Masukkan nama anggota..."
                    className="custom-select"
                    style={{ width: '100%', background: 'var(--bg-cream)' }}
                  />
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label className="selector-label">Stamps (Loyalty Points)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={memberPoints}
                      onChange={(e) => setMemberPoints(e.target.value)}
                      className="custom-select"
                      style={{ width: '100%', background: 'var(--bg-cream)' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="selector-label">Total Pesanan</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={memberOrders}
                      onChange={(e) => setMemberOrders(e.target.value)}
                      className="custom-select"
                      style={{ width: '100%', background: 'var(--bg-cream)' }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button type="button" onClick={() => { setIsEditModalOpen(false); setEditingMember(null); }} className="btn-outline">Batal</button>
                <button type="submit" className="btn-gold">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
