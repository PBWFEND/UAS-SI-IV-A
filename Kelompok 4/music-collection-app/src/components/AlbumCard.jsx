function AlbumCard({ album, onDelete, onEdit, onToggleStatus }) {
  const cfgs = {
    "Sudah Didengar":  { cls:"sb-green", label:"✅ Selesai" },
    "Sedang Didengar": { cls:"sb-cyan",  label:"🎧 Didengar" },
    "Wishlist":        { cls:"sb-amber", label:"🔖 Wishlist" },
  };
  const cfg = cfgs[album.status] || cfgs["Wishlist"];

  const handleDelete = () => {
    if (window.confirm(`Hapus "${album.title}" dari koleksi?`)) onDelete(album.id);
  };

  return (
    <div className={`album-card ${album.status === "Sudah Didengar" ? "card-done" : ""}`}>
      {album.imageUrl
        ? <img className="card-cover" src={album.imageUrl} alt={album.title}
            onError={(e) => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }} />
        : null}
      <div className="card-cover-placeholder" style={{ display: album.imageUrl ? "none" : "flex" }}>
        🎵
        <span>No Cover</span>
      </div>

      <div className="card-body">
        <div className="card-row1">
          <div className="card-info">
            <div className="card-title">{album.title}</div>
            <div className="card-artist">{album.artist}{album.year ? ` · ${album.year}` : ""}</div>
          </div>
          <div className="card-btns">
            <button className="c-btn" onClick={() => onEdit(album)} title="Edit">✏️</button>
            <button className="c-btn del" onClick={handleDelete} title="Hapus">🗑️</button>
          </div>
        </div>

        <span className={`s-badge ${cfg.cls}`}>
          {cfg.label}
        </span>

        <div className="card-chips">
          {album.genre && <span className="chip">{album.genre}</span>}
          {album.mood  && <span className="chip">{album.mood}</span>}
          {album.totalTracks && <span className="chip">{album.totalTracks} lagu</span>}
        </div>

        <div className="card-stars">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`star ${i < album.rating ? "on" : ""}`}>★</span>
          ))}
          <span style={{ fontSize:"0.65rem", color:"var(--t4)", marginLeft:"4px" }}>{album.rating}/5</span>
        </div>

        {album.favTrack && (
          <div className="fav-row">
            ♥
            <span>{album.favTrack}</span>
          </div>
        )}

        {album.notes && <p className="card-note">{album.notes}</p>}

        {album.spotifyUrl && (
          <a
            href={album.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="spotify-btn"
          >
            🎧 Buka di Spotify
          </a>
        )}
        <button className="card-toggle" onClick={() => onToggleStatus(album.id)}>
          {album.status === "Wishlist" ? "▶ Mulai Dengar"
           : album.status === "Sedang Didengar" ? "✓ Tandai Selesai"
           : "↺ Dengar Lagi"}
        </button>
      </div>
    </div>
  );
}

export default AlbumCard;
