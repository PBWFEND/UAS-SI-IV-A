function CategoriesView({ menus }) {
  const foods = menus.filter(m => m.category === 'Makanan');
  const drinks = menus.filter(m => m.category === 'Minuman');

  const avgFoodPrice = foods.length 
    ? Math.round(foods.reduce((sum, m) => sum + m.price, 0) / foods.length) 
    : 0;
  const avgDrinkPrice = drinks.length 
    ? Math.round(drinks.reduce((sum, m) => sum + m.price, 0) / drinks.length) 
    : 0;

  const mostExpensiveFood = foods.length 
    ? foods.reduce((max, m) => m.price > max.price ? m : max, foods[0]) 
    : null;
  const mostExpensiveDrink = drinks.length 
    ? drinks.reduce((max, m) => m.price > max.price ? m : max, drinks[0]) 
    : null;

  const totalCount = menus.length;
  const foodPercent = totalCount ? Math.round((foods.length / totalCount) * 100) : 0;
  const drinkPercent = totalCount ? Math.round((drinks.length / totalCount) * 100) : 0;

  return (
    <div className="categories-view-container">
      <div className="view-title-block">
        <h3>📁 Analisis Kategori</h3>
        <p>Ringkasan performa dan pembagian menu berdasarkan jenis hidangan.</p>
      </div>

      <div className="distribution-card">
        <h4>Distribusi Kategori Menu</h4>
        <div className="bar-chart-wrapper">
          <div className="bar-chart-labels">
            <span>🍔 Makanan ({foods.length} menu)</span>
            <span>🥤 Minuman ({drinks.length} menu)</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar food-bar" 
              style={{ width: `${foodPercent}%` }}
              title={`Makanan: ${foodPercent}%`}
            >
              {foodPercent > 10 && `${foodPercent}%`}
            </div>
            <div 
              className="progress-bar drink-bar" 
              style={{ width: `${drinkPercent}%` }}
              title={`Minuman: ${drinkPercent}%`}
            >
              {drinkPercent > 10 && `${drinkPercent}%`}
            </div>
          </div>
        </div>
      </div>

      <div className="category-panels">
        {/* Panel Makanan */}
        <div className="category-panel food-panel">
          <div className="panel-header">
            <span className="panel-emoji">🍔</span>
            <div>
              <h4>Kategori Makanan</h4>
              <span className="badge-panel-count">{foods.length} Menu Terdaftar</span>
            </div>
          </div>
          <div className="panel-stats">
            <div className="panel-stat">
              <span>Rata-rata Harga</span>
              <strong>Rp {avgFoodPrice.toLocaleString('id-ID')}</strong>
            </div>
            <div className="panel-stat">
              <span>Menu Termahal</span>
              <strong>
                {mostExpensiveFood ? mostExpensiveFood.name : '-'}
              </strong>
              <small>
                {mostExpensiveFood ? `(Rp ${mostExpensiveFood.price.toLocaleString('id-ID')})` : ''}
              </small>
            </div>
          </div>
          <div className="panel-list">
            <h5>Daftar Hidangan Makanan:</h5>
            <ul>
              {foods.slice(0, 5).map(f => (
                <li key={f.id} className="panel-list-item">
                  <span>{f.name}</span>
                  <span className="item-price">Rp {f.price.toLocaleString('id-ID')}</span>
                </li>
              ))}
              {foods.length > 5 && (
                <li className="more-items-indicator">dan {foods.length - 5} makanan lainnya...</li>
              )}
              {foods.length === 0 && <li className="empty-panel-list">Belum ada makanan.</li>}
            </ul>
          </div>
        </div>

        {/* Panel Minuman */}
        <div className="category-panel drink-panel">
          <div className="panel-header">
            <span className="panel-emoji">🥤</span>
            <div>
              <h4>Kategori Minuman</h4>
              <span className="badge-panel-count">{drinks.length} Menu Terdaftar</span>
            </div>
          </div>
          <div className="panel-stats">
            <div className="panel-stat">
              <span>Rata-rata Harga</span>
              <strong>Rp {avgDrinkPrice.toLocaleString('id-ID')}</strong>
            </div>
            <div className="panel-stat">
              <span>Menu Termahal</span>
              <strong>
                {mostExpensiveDrink ? mostExpensiveDrink.name : '-'}
              </strong>
              <small>
                {mostExpensiveDrink ? `(Rp ${mostExpensiveDrink.price.toLocaleString('id-ID')})` : ''}
              </small>
            </div>
          </div>
          <div className="panel-list">
            <h5>Daftar Hidangan Minuman:</h5>
            <ul>
              {drinks.slice(0, 5).map(d => (
                <li key={d.id} className="panel-list-item">
                  <span>{d.name}</span>
                  <span className="item-price">Rp {d.price.toLocaleString('id-ID')}</span>
                </li>
              ))}
              {drinks.length > 5 && (
                <li className="more-items-indicator">dan {drinks.length - 5} minuman lainnya...</li>
              )}
              {drinks.length === 0 && <li className="empty-panel-list">Belum ada minuman.</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesView;
