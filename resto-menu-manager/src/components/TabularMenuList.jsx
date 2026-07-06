import { useState } from 'react';

function TabularMenuList({ menus, onEditClick, onDeleteClick, onToggleStatus }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');

  // Filter items locally inside the table view
  const filteredMenus = menus.filter(menu => {
    const matchesSearch = menu.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'Semua' || menu.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="tabular-menu-container">
      <div className="table-header-actions">
        <h3>📋 Daftar Tabel Menu</h3>
        
        <div className="table-controls">
          <div className="table-search">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Cari dalam tabel..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            className="table-filter-select"
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="Semua">Semua Kategori</option>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="menu-table">
          <thead>
            <tr>
              <th>Gambar</th>
              <th>Nama Hidangan</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Status Stok</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredMenus.length === 0 ? (
              <tr>
                <td colSpan="6" className="table-empty-state">
                  🔍 Tidak ada menu yang cocok dengan kriteria pencarian.
                </td>
              </tr>
            ) : (
              filteredMenus.map((menu) => (
                <tr key={menu.id}>
                  <td>
                    <img 
                      src={menu.image} 
                      alt={menu.name} 
                      className="table-thumb"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = menu.category === 'Makanan' 
                          ? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop&q=60" 
                          : "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=100&auto=format&fit=crop&q=60";
                      }}
                    />
                  </td>
                  <td className="menu-name-cell">{menu.name}</td>
                  <td>
                    <span className={`table-badge-category ${menu.category.toLowerCase()}`}>
                      {menu.category}
                    </span>
                  </td>
                  <td className="price-cell">Rp {menu.price.toLocaleString('id-ID')}</td>
                  <td>
                    <div className="status-toggle-wrapper">
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={menu.status === 'Tersedia'}
                          onChange={() => onToggleStatus(menu.id)}
                        />
                        <span className="slider round"></span>
                      </label>
                      <span className={`status-label ${menu.status === 'Tersedia' ? 'text-success' : 'text-danger'}`}>
                        {menu.status}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button 
                        className="btn-table-edit" 
                        onClick={() => onEditClick(menu)}
                        title="Edit Item"
                      >
                        📝 Edit
                      </button>
                      <button 
                        className="btn-table-delete" 
                        onClick={() => onDeleteClick(menu.id)}
                        title="Hapus Item"
                      >
                        🗑️ Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TabularMenuList;
