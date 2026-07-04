import React from 'react';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <h2>🍳 Resto Menu</h2>
        <span className="sub-brand">Manager App</span>
      </div>
      <nav className="nav-menu">
        <a href="#" className="active">Dashboard</a>
        <a href="#">Daftar Menu</a>
        <a href="#">Kategori</a>
        <a href="#">Laporan</a>
      </nav>
    </aside>
  );
}
export default Sidebar;