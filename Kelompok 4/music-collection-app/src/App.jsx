import { useState, useEffect } from "react";
import AlbumForm from "./components/AlbumForm";
import AlbumCard from "./components/AlbumCard";
import EditAlbumModal from "./components/EditAlbumModal";
import StatsCard from "./components/StatsCard";
import SplashScreen from "./components/SplashScreen";
import "./App.css";

const STORAGE_KEY = "tunifyMusicData";

const GENRES = ["Pop","Rock","Hip-Hop","R&B","Jazz","Classical","Electronic","Indie","Metal","Folk","Soul","K-Pop","Lo-Fi","Ambient"];
const MOODS  = ["Energetic","Chill","Melancholic","Happy","Romantic","Dark","Motivating","Nostalgic","Focus","Party"];

function App() {
  const [albums, setAlbums] = useState(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : []; }
    catch { return []; }
  });
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [search, setSearch]             = useState("");
  const [filterGenre, setFilterGenre]   = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterMood, setFilterMood]     = useState("");
  const [showForm, setShowForm]         = useState(false);
  const [splashDone, setSplashDone]     = useState(false);
  const [darkMode, setDarkMode]         = useState(() => localStorage.getItem("tunifyTheme") === "dark");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(albums));
  }, [albums]);

  useEffect(() => {
    localStorage.setItem("tunifyTheme", darkMode ? "dark" : "light");
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleAdd = (a) => { setAlbums((p) => [a, ...p]); setShowForm(false); };
  const handleDelete = (id) => setAlbums((p) => p.filter((a) => a.id !== id));
  const handleSaveEdit = (u) => { setAlbums((p) => p.map((a) => a.id === u.id ? u : a)); setEditingAlbum(null); };
  const handleToggle = (id) => setAlbums((p) => p.map((a) => {
    if (a.id !== id) return a;
    const next = { "Wishlist":"Sedang Didengar", "Sedang Didengar":"Sudah Didengar", "Sudah Didengar":"Wishlist" };
    return { ...a, status: next[a.status] };
  }));

  const filtered = albums.filter((a) => {
    const q = search.toLowerCase();
    return (a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q))
      && (filterGenre  ? a.genre  === filterGenre  : true)
      && (filterStatus ? a.status === filterStatus : true)
      && (filterMood   ? a.mood   === filterMood   : true);
  });

  const grouped = {
    "Sedang Didengar": filtered.filter((a) => a.status === "Sedang Didengar"),
    "Wishlist":        filtered.filter((a) => a.status === "Wishlist"),
    "Sudah Didengar":  filtered.filter((a) => a.status === "Sudah Didengar"),
  };
  const groupDot = { "Sedang Didengar":"gd-cyan", "Wishlist":"gd-amber", "Sudah Didengar":"gd-green" };

  const genreCounts = GENRES.map((g) => ({ label: g, count: albums.filter((a) => a.genre === g).length })).filter((x) => x.count > 0).slice(0, 5);
  const moodCounts  = MOODS.map((m) => ({ label: m, count: albums.filter((a) => a.mood === m).length })).filter((x) => x.count > 0).slice(0, 4);

  const total    = albums.length;
  const listened = albums.filter((a) => a.status === "Sudah Didengar").length;
  const listening= albums.filter((a) => a.status === "Sedang Didengar").length;
  const wishlist = albums.filter((a) => a.status === "Wishlist").length;

  return (
    <>
      {!splashDone && <SplashScreen onFinish={() => setSplashDone(true)} />}
      <div className="app" style={{ opacity: splashDone ? 1 : 0, transition: "opacity 0.5s ease" }}>
      {/* NAV */}
      <nav className="app-nav">
        <div className="nav-brand">
          <div className="nav-icon">🎵</div>
          <div>
            <div className="nav-title">Tunify</div>
            <div className="nav-sub">Koleksi musik personalmu</div>
          </div>
        </div>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={() => setDarkMode((v) => !v)} title="Toggle tema">
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button className={`nav-btn ${showForm ? "off" : ""}`} onClick={() => setShowForm((v) => !v)}>
            {showForm ? "✕ Tutup" : "+ Tambah Album"}
          </button>
        </div>
      </nav>

      {/* HERO STATS */}
      <div className="hero">
        <div className="hero-main">
          <div className="hero-tag">Total Koleksi</div>
          <div className="hero-num">{total}</div>
          <div className="hero-desc">album tersimpan di library kamu</div>
        </div>
        <div className="stat-mini">
          <div className="sm-top">
            <div className="sm-label">Sudah Didengar</div>
            <div className="sm-val v-cyan">{listened}</div>
          </div>
          <div className="sm-bar"><div className="sm-fill f-cyan" style={{ width: total ? `${(listened/total)*100}%` : "0%" }}></div></div>
        </div>
        <div className="stat-mini">
          <div className="sm-top">
            <div className="sm-label">Sedang Didengar</div>
            <div className="sm-val v-amber">{listening}</div>
          </div>
          <div className="sm-bar"><div className="sm-fill f-amber" style={{ width: total ? `${(listening/total)*100}%` : "0%" }}></div></div>
        </div>
        <div className="stat-mini">
          <div className="sm-top">
            <div className="sm-label">Wishlist</div>
            <div className="sm-val v-green">{wishlist}</div>
          </div>
          <div className="sm-bar"><div className="sm-fill f-green" style={{ width: total ? `${(wishlist/total)*100}%` : "0%" }}></div></div>
        </div>
      </div>

      {/* BODY */}
      <div className="app-body">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="search-box">
            🔍
            <input
              placeholder="Cari album atau artis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="sb-card">
            <div className="sb-title">Status</div>
            {[["", "Semua"], ["Sedang Didengar","Sedang Didengar"], ["Wishlist","Wishlist"], ["Sudah Didengar","Sudah Didengar"]].map(([val, label]) => (
              <div key={val} className={`sb-item ${filterStatus === val ? "active" : ""}`} onClick={() => setFilterStatus(val)}>
                <span>{label}</span>
                <span className="sb-count">{val === "" ? albums.length : albums.filter((a) => a.status === val).length}</span>
              </div>
            ))}
          </div>

          {genreCounts.length > 0 && (
            <div className="sb-card">
              <div className="sb-title">Genre</div>
              <div className={`sb-item ${filterGenre === "" ? "active" : ""}`} onClick={() => setFilterGenre("")}>
                <span>Semua</span><span className="sb-count">{albums.length}</span>
              </div>
              {genreCounts.map(({ label, count }) => (
                <div key={label} className={`sb-item ${filterGenre === label ? "active" : ""}`} onClick={() => setFilterGenre(label)}>
                  <span>{label}</span><span className="sb-count">{count}</span>
                </div>
              ))}
            </div>
          )}

          {moodCounts.length > 0 && (
            <div className="sb-card">
              <div className="sb-title">Mood</div>
              <div className={`sb-item ${filterMood === "" ? "active" : ""}`} onClick={() => setFilterMood("")}>
                <span>Semua</span><span className="sb-count">{albums.length}</span>
              </div>
              {moodCounts.map(({ label, count }) => (
                <div key={label} className={`sb-item ${filterMood === label ? "active" : ""}`} onClick={() => setFilterMood(label)}>
                  <span>{label}</span><span className="sb-count">{count}</span>
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* MAIN */}
        <main className="main-content">
          {showForm && <AlbumForm onAdd={handleAdd} />}

          {filtered.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">🎵</div>
              <p>{albums.length === 0 ? "Library kamu masih kosong" : "Tidak ada album yang ditemukan."}</p>
              {albums.length === 0 && <span>Mulai tambah album pertamamu!</span>}
            </div>
          ) : (
            Object.entries(grouped).map(([status, group]) =>
              group.length > 0 ? (
                <section key={status} className="group-section">
                  <div className="group-hd">
                    <span className={`g-dot ${groupDot[status]}`}></span>
                    <span className="group-name">{status}</span>
                    <span className="group-ct">{group.length}</span>
                  </div>
                  <div className="albums-grid">
                    {group.map((album) => (
                      <AlbumCard key={album.id} album={album} onDelete={handleDelete} onEdit={setEditingAlbum} onToggleStatus={handleToggle} />
                    ))}
                  </div>
                </section>
              ) : null
            )
          )}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="app-footer">
        <div className="footer-copy">© {new Date().getFullYear()} <span>Tunify</span> · Music Collection App · </div>
        <div className="footer-tags">
          <span className="footer-tag">React 18</span>
          <span className="footer-tag">Vite 5</span>
          <span className="footer-tag">localStorage</span>
        </div>
      </footer>

      {editingAlbum && <EditAlbumModal album={editingAlbum} onSave={handleSaveEdit} onClose={() => setEditingAlbum(null)} />}
    </div>
    </>
  );
}

export default App;
