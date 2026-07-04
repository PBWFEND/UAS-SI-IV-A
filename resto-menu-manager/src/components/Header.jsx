function Header({ onAddMenuClick, showAddButton }) {
  return (
    <header className="main-header">
      <div className="welcome-text">
        <h2>Selamat datang, Admin! 👋</h2>
        <p>Kelola daftar menu restoran Anda dengan mudah.</p>
      </div>
      {showAddButton && (
        <button className="btn-add-menu" onClick={onAddMenuClick}>+ Tambah Menu</button>
      )}
    </header>
  );
}
export default Header;