import React, { useState, useEffect } from 'react';

function MenuForm({ onSave, onClose, currentMenu }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('Tersedia');

  // Mengisi form otomatis jika dalam mode EDIT (Umpan Balik UX Baik)
  useEffect(() => {
    if (currentMenu) {
      setName(currentMenu.name);
      setCategory(currentMenu.category);
      setPrice(currentMenu.price);
      setStatus(currentMenu.status);
    } else {
      setName('');
      setCategory('');
      setPrice('');
      setStatus('Tersedia');
    }
  }, [currentMenu]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi Dasar (Wajib sesuai aturan)
    if (!name.trim() || !category || !price) {
      alert("Semua kolom inputan wajib diisi!");
      return;
    }

    onSave({
      name,
      category,
      price: Number(price),
      status
    });
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h3>{currentMenu ? 'Edit Menu' : 'Tambah Menu'}</h3>
        <button className="close-btn" onClick={onClose}>&times;</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nama Menu</label>
          <input 
            type="text" 
            placeholder="Contoh: Nasi Goreng Spesial"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Kategori</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Pilih kategori</option>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
          </select>
        </div>
        <div className="form-group">
          <label>Harga</label>
          <input 
            type="number" 
            placeholder="Contoh: 25000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Tersedia">Tersedia</option>
            <option value="Habis">Habis</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>Batal</button>
          <button type="submit" className="btn-submit">
            {currentMenu ? 'Update Menu' : 'Simpan Menu'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MenuForm;