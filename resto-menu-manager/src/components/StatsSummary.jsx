function StatsSummary({ menus }) {
  const totalMenu = menus.length;
  const totalMakanan = menus.filter(m => m.category === 'Makanan').length;
  const totalMinuman = menus.filter(m => m.category === 'Minuman').length;
  const totalHabis = menus.filter(m => m.status === 'Habis').length;

  return (
    <div className="stats-card">
      <h3 className="stats-title">📊 Ringkasan Statistik</h3>
      <div className="stats-grid">
        <div className="stat-item total">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <span>Total Menu</span>
            <strong>{totalMenu}</strong>
          </div>
        </div>
        <div className="stat-item food">
          <div className="stat-icon">🍔</div>
          <div className="stat-info">
            <span>Makanan</span>
            <strong>{totalMakanan}</strong>
          </div>
        </div>
        <div className="stat-item drink">
          <div className="stat-icon">🥤</div>
          <div className="stat-info">
            <span>Minuman</span>
            <strong>{totalMinuman}</strong>
          </div>
        </div>
        <div className="stat-item out-of-stock">
          <div className="stat-icon">⚠️</div>
          <div className="stat-info">
            <span>Stok Habis</span>
            <strong className="text-danger">{totalHabis}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsSummary;