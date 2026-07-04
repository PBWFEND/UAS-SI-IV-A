function Sidebar({ activeTab, onTabChange }) {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'menu-list', name: 'Daftar Menu', icon: '📋' },
    { id: 'categories', name: 'Kategori', icon: '📁' },
    { id: 'reports', name: 'Laporan & Alat', icon: '📈' }
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <h2>🍳 Resto Menu</h2>
        <span className="sub-brand">Manager App</span>
      </div>
      <nav className="nav-menu">
        {menuItems.map(item => (
          <a 
            key={item.id} 
            href={`#${item.id}`} 
            className={activeTab === item.id ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              onTabChange(item.id);
            }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;