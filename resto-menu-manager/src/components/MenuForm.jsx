import { useState } from 'react';

function MenuForm({ onSave, onClose, currentMenu }) {
  const [name, setName] = useState(currentMenu ? currentMenu.name : '');
  const [category, setCategory] = useState(currentMenu ? currentMenu.category : '');
  const [price, setPrice] = useState(currentMenu ? currentMenu.price : '');
  const [status, setStatus] = useState(currentMenu ? currentMenu.status : 'Tersedia');
  const [image, setImage] = useState(currentMenu ? (currentMenu.image || '') : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi Dasar (Wajib sesuai aturan)
    if (!name.trim()) {
      alert("Nama menu wajib diisi!");
      return;
    }
    if (!category) {
      alert("Pilih kategori terlebih dahulu!");
      return;
    }
    if (!price || Number(price) <= 0) {
      alert("Harga harus diisi dengan angka positif!");
      return;
    }

    onSave({
      name: name.trim(),
      category,
      price: Number(price),
      status,
      image: image.trim()
    });
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h3>{currentMenu ? '📝 Edit Menu' : '✨ Tambah Menu'}</h3>
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
            required
          />
        </div>
        <div className="form-group">
          <label>Kategori</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Pilih kategori</option>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
          </select>
        </div>
        <div className="form-group">
          <label>Harga (Rupiah)</label>
          <input 
            type="number" 
            placeholder="Contoh: 25000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>URL Gambar (Opsional)</label>
          <input 
            type="text" 
            placeholder="Contoh: https://images.unsplash.com/..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Status Ketersediaan</label>
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