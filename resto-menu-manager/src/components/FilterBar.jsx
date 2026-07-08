function FilterBar({ search, setSearch, filterCategory, setFilterCategory, filterStatus, setFilterStatus }) {
  return (
    <div className="filter-bar">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Cari nama menu hidangan..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="dropdown-filters">
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="Semua Kategori">📁 Semua Kategori</option>
          <option value="Makanan">Makanan</option>
          <option value="Minuman">Minuman</option>
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="Semua Status">⚡ Semua Status</option>
          <option value="Tersedia">Tersedia</option>
          <option value="Habis">Habis</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;