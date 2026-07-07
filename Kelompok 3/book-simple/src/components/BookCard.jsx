function BookCard({ book, index, onDelete, onEdit, onToggle }) {
  const handleDelete = () => { if (window.confirm(`Hapus "${book.title}"?`)) onDelete(book.id); };
  return (
    <div className="book-item">
      <div className="book-num">{index}</div>
      <div className="book-info">
        <div className="book-title">{book.title}</div>
        <div className="book-meta">{book.author}{book.year ? ` · ${book.year}` : ""}</div>
        {book.genre && <div className="book-genre">{book.genre}</div>}
        {book.notes && <div className="book-note">{book.notes}</div>}
      </div>
      <span className={`book-badge ${book.status === "Sudah Dibaca" ? "badge-read" : "badge-unread"}`}>
        {book.status === "Sudah Dibaca" ? "✅ Selesai" : "📖 Belum"}
      </span>
      <button className="toggle-btn" onClick={() => onToggle(book.id)}>
        {book.status === "Belum Dibaca" ? "Tandai Selesai" : "Baca Lagi"}
      </button>
      <div className="book-actions">
        <button className="action-btn" onClick={() => onEdit(book)}>✏️</button>
        <button className="action-btn del" onClick={handleDelete}>🗑️</button>
      </div>
    </div>
  );
}
export default BookCard;
