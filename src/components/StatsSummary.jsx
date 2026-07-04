import React from 'react';

function StatsSummary({ menus }) {
  const totalMenu = menus.length;
  const totalMakanan = menus.filter(m => m.category === 'Makanan').length;
  const totalMinuman = menus.filter(m => m.category === 'Minuman').length;
  const totalHabis = menus.filter(m => m.status === 'Habis').length;

  return (
    <div className="stats-card">
      <h3>Ringkasan</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <span>Total Menu</span>
          <strong>{totalMenu}</strong>
        </div>
        <div className="stat-item">
          <span>Makanan</span>
          <strong>{totalMakanan}</strong>
        </div>
        <div className="stat-item">
          <span>Minuman</span>
          <strong>{totalMinuman}</strong>
        </div>
        <div className="stat-item">
          <span>Habis</span>
          <strong className="text-danger">{totalHabis}</strong>
        </div>
      </div>
    </div>
  );
}

export default StatsSummary;