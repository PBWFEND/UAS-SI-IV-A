import React from 'react';

function MenuList({ menus, onEditClick, onDeleteClick }) {
  if (menus.length === 0) {
    return <div className="empty-state">Menu tidak ditemukan. Silakan tambahkan menu baru.</div>;
  }

  return (
    <div className="menu-grid">
      {menus.map((menu) => (
        <div className="menu-card" key={menu.id}>
          <div className="card-image-wrapper">
            <img src={menu.image} alt={menu.name} className="menu-img" />
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