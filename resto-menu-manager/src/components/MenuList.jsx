function MenuList({ menus, onEditClick, onDeleteClick }) {
  if (menus.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🍽️</div>
        <h3>Menu tidak ditemukan</h3>
        <p>Silakan sesuaikan filter pencarian atau tambahkan menu hidangan baru.</p>
      </div>
    );
  }

  return (
    <div className="menu-grid">
      {menus.map((menu) => (
        <div className="menu-card" key={menu.id}>
          <div className="card-image-wrapper">
            <img 
              src={menu.image} 
              alt={menu.name} 
              className="menu-img" 
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = menu.category === 'Makanan' 
                  ? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" 
                  : "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=500&auto=format&fit=crop&q=60";
              }}
            />
            <span className="badge-category">{menu.category}</span>
            <span className={`badge-status ${menu.status === 'Tersedia' ? 'ready' : 'empty'}`}>
              {menu.status}
            </span>
          </div>
          <div className="card-info">
            <h4>{menu.name}</h4>
            <p className="price">Rp {menu.price.toLocaleString('id-ID')}</p>
            <div className="card-actions">
              <button className="btn-edit" onClick={() => onEditClick(menu)}>📝 Edit</button>
              <button className="btn-delete" onClick={() => onDeleteClick(menu.id)}>🗑️ Hapus</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MenuList;