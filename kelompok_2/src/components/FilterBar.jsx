function FilterBar({ filterStatus, setFilterStatus }) {
  return (
    <select
      className="form-select"
      value={filterStatus}
      onChange={(e) => setFilterStatus(e.target.value)}
    >
      <option value="all">Semua</option>
      <option value="adopted">Sudah Diadopsi</option>
      <option value="not-adopted">Belum Diadopsi</option>
    </select>
  );
}

export default FilterBar;