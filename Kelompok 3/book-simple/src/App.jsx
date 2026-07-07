import { useState, useEffect } from "react";
import BookForm from "./components/BookForm";
import BookCard from "./components/BookCard";
import EditBookModal from "./components/EditBookModal";
import "./App.css";

const STORAGE_KEY = "bookShelfData";

function App() {
  const [books, setBooks]         = useState(() => { try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : []; } catch { return []; } });
  const [editingBook, setEditing] = useState(null);
  const [showForm, setShowForm]   = useState(false);
  const [activeTab, setActiveTab] = useState("Semua");

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(books)); }, [books]);

  const handleAdd    = (b) => { setBooks((p) => [b, ...p]); setShowForm(false); };
  const handleDelete = (id) => setBooks((p) => p.filter((b) => b.id !== id));
  const handleSave   = (u) => { setBooks((p) => p.map((b) => b.id === u.id ? u : b)); setEditing(null); };
  const handleToggle = (id) => setBooks((p) => p.map((b) => b.id !== id ? b : { ...b, status: b.status === "Belum Dibaca" ? "Sudah Dibaca" : "Belum Dibaca" }));

  const filtered = activeTab === "Semua" ? books : books.filter((b) => b.status === activeTab);
  const read   = books.filter((b) => b.status === "Sudah Dibaca").length;
  const unread = books.filter((b) => b.status === "Belum Dibaca").length;

  return (
    <div>
      <div className="header">
        <div className="header-title">📚 BookShelf</div>
        <div className="header-sub">Catat koleksi bukumu di sini</div>
        <button className={`header-btn ${showForm ? "off" : ""}`} onClick={() => setShowForm((v) => !v)}>
          {showForm ? "✕ Tutup Form" : "+ Tambah Buku Baru"}
        </button>
      </div>

      <div className="stats-bar">
        <div className="stat-item"><div className="stat-num">{books.length}</div><div className="stat-lbl">Total Buku</div></div>
        <div className="stat-item"><div className="stat-num">{read}</div><div className="stat-lbl">Sudah Dibaca</div></div>
        <div className="stat-item"><div className="stat-num">{unread}</div><div className="stat-lbl">Belum Dibaca</div></div>
      </div>

      <div className="content">
        {showForm && <BookForm onAdd={handleAdd} />}

        <div className="filter-tabs">
          {["Semua", "Belum Dibaca", "Sudah Dibaca"].map((tab) => (
            <button key={tab} className={`tab ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
              {tab} <span className="tab-count">{tab === "Semua" ? books.length : books.filter((b) => b.status === tab).length}</span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-box">
            <div className="empty-icon">📖</div>
            <div className="empty-title">{books.length === 0 ? "Belum ada buku" : "Tidak ada buku di sini"}</div>
            <div className="empty-sub">{books.length === 0 ? "Tambah buku pertamamu!" : "Coba pilih tab lain"}</div>
          </div>
        ) : (
          <div className="book-list">
            {filtered.map((book, i) => (
              <BookCard key={book.id} book={book} index={i + 1} onDelete={handleDelete} onEdit={setEditing} onToggle={handleToggle} />
            ))}
          </div>
        )}
      </div>

      <div className="footer">
        <div className="footer-text">© {new Date().getFullYear()} <span>BookShelf</span> · UAS Pemrograman Berbasis Web Front-End · S1 Sistem Informasi</div>
      </div>

      {editingBook && <EditBookModal book={editingBook} onSave={handleSave} onClose={() => setEditing(null)} />}
    </div>
  );
}

export default App;
