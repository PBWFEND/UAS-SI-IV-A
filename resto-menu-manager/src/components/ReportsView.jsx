function ReportsView({ menus }) {
  // Math metrics
  const totalItems = menus.length;
  const availableItems = menus.filter(m => m.status === 'Tersedia').length;
  const outOfStockItems = menus.filter(m => m.status === 'Habis').length;

  const availabilityRate = totalItems 
    ? Math.round((availableItems / totalItems) * 100) 
    : 0;

  const averagePrice = totalItems 
    ? Math.round(menus.reduce((sum, m) => sum + m.price, 0) / totalItems) 
    : 0;

  const highestPriced = totalItems 
    ? menus.reduce((max, m) => m.price > max.price ? m : max, menus[0]) 
    : null;

  const lowestPriced = totalItems 
    ? menus.reduce((min, m) => m.price < min.price ? m : min, menus[0]) 
    : null;

  return (
    <div className="reports-view-container">
      <div className="view-title-block">
        <h3>📈 Laporan Statistik</h3>
        <p>Analisis kinerja harga hidangan dan ketersediaan stok menu secara real-time.</p>
      </div>

      <div className="reports-grid">
        {/* Card Ringkasan Finansial */}
        <div className="report-card metric-card">
          <h4>📊 Statistik Harga Hidangan</h4>
          <div className="metric-row">
            <div className="metric-sub-item">
              <span>Rata-Rata Harga</span>
              <strong>Rp {averagePrice.toLocaleString('id-ID')}</strong>
            </div>
            <div className="metric-sub-item">
              <span>Rasio Ketersediaan</span>
              <strong>{availabilityRate}%</strong>
            </div>
          </div>
          <div className="range-list">
            <div className="range-item max">
              <span>📈 Harga Tertinggi:</span>
              <strong>
                {highestPriced 
                  ? `${highestPriced.name} (Rp ${highestPriced.price.toLocaleString('id-ID')})` 
                  : '-'}
              </strong>
            </div>
            <div className="range-item min">
              <span>📉 Harga Terendah:</span>
              <strong>
                {lowestPriced 
                  ? `${lowestPriced.name} (Rp ${lowestPriced.price.toLocaleString('id-ID')})` 
                  : '-'}
              </strong>
            </div>
          </div>
        </div>

        {/* Card Stok Status */}
        <div className="report-card chart-card">
          <h4>⚡ Status Ketersediaan Stok</h4>
          <div className="stock-ratio-chart">
            <div className="chart-bar-container">
              <div 
                className="chart-bar available" 
                style={{ height: `${totalItems ? (availableItems/totalItems)*150 : 0}px` }}
              >
                <span>{availableItems}</span>
              </div>
              <div 
                className="chart-bar out-of-stock" 
                style={{ height: `${totalItems ? (outOfStockItems/totalItems)*150 : 0}px` }}
              >
                <span>{outOfStockItems}</span>
              </div>
            </div>
            <div className="chart-bar-labels">
              <span>🟢 Tersedia ({availableItems})</span>
              <span>🔴 Habis ({outOfStockItems})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsView;
