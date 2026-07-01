function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Cari nama hewan..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchBar;