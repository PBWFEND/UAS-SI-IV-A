import { useState, useEffect } from "react";

const GENRES = ["Pop","Rock","Hip-Hop","R&B","Jazz","Classical","Electronic","Indie","Metal","Folk","Soul","K-Pop","Lo-Fi","Ambient"];
const MOODS  = ["Energetic","Chill","Melancholic","Happy","Romantic","Dark","Motivating","Nostalgic","Focus","Party"];

function EditAlbumModal({ album, onSave, onClose }) {
  const [form, setForm]     = useState({ ...album });
  const [errs, setErrs]     = useState({});
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => { setForm({ ...album }); setImgErr(false); }, [album]);

  const validate = () => {
    const e = {};
    if (!form.title.trim())  e.title  = "Wajib diisi";
    if (!form.artist.trim()) e.artist = "Wajib diisi";
    if (!form.genre)         e.genre  = "Wajib dipilih";
    return e;
  };

  const set = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (name === "imageUrl") setImgErr(false);
    if (errs[name]) setErrs((p) => ({ ...p, [name]: "" }));
  };

  const save = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrs(e); return; }
    onSave({ ...form, rating: Number(form.rating) });
  };

  const showPrev = form.imageUrl && !imgErr;

  return (
    <div className="modal-wrap" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <h2>Edit Album</h2>
          <button className="modal-x" onClick={onClose}>✕</button>
        </div>
        <div className="form-grid">
          <div className={`fg ${errs.title ? "err" : ""}`}>
            <label>Judul Album *</label>
            <input name="title" value={form.title} onChange={set} />
            {errs.title && <span className="emsg">{errs.title}</span>}
          </div>
          <div className={`fg ${errs.artist ? "err" : ""}`}>
            <label>Artis / Band *</label>
            <input name="artist" value={form.artist || ""} onChange={set} />
            {errs.artist && <span className="emsg">{errs.artist}</span>}
          </div>
          <div className={`fg ${errs.genre ? "err" : ""}`}>
            <label>Genre *</label>
            <select name="genre" value={form.genre} onChange={set}>
              {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
            {errs.genre && <span className="emsg">{errs.genre}</span>}
          </div>
          <div className="fg">
            <label>Mood</label>
            <select name="mood" value={form.mood || ""} onChange={set}>
              <option value="">— Pilih Mood —</option>
              {MOODS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="fg">
            <label>Tahun Rilis</label>
            <input name="year" value={form.year || ""} onChange={set} type="number" min="1900" max="2099" />
          </div>
          <div className="fg">
            <label>Jumlah Lagu</label>
            <input name="totalTracks" value={form.totalTracks || ""} onChange={set} type="number" min="1" />
          </div>
          <div className="fg">
            <label>Status</label>
            <select name="status" value={form.status} onChange={set}>
              <option value="Wishlist">Wishlist</option>
              <option value="Sedang Didengar">Sedang Didengar</option>
              <option value="Sudah Didengar">Sudah Didengar</option>
            </select>
          </div>
          <div className="fg">
            <label>Rating: {form.rating}/5</label>
            <div className="rating-row">
              <input type="range" name="rating" min="1" max="5" step="1" value={form.rating} onChange={set} />
              <span className="rating-pill">{"★".repeat(Number(form.rating))}</span>
            </div>
          </div>
          <div className="fg full">
            <label>Lagu Favorit</label>
            <input name="favTrack" value={form.favTrack || ""} onChange={set} />
          </div>
          <div className="fg full">
            <label>🎧 Link Spotify Album</label>
            <input name="spotifyUrl" value={form.spotifyUrl || ""} onChange={set} placeholder="https://open.spotify.com/album/..." />
          </div>
          <div className="fg full">
            <label>URL Cover Album</label>
            <input name="imageUrl" value={form.imageUrl || ""} onChange={set} placeholder="https://..." />
            <div className="img-prev">
              {showPrev ? <img src={form.imageUrl} alt="preview" onError={() => setImgErr(true)} />
                : <span>{form.imageUrl ? "URL tidak valid" : "Preview cover muncul di sini"}</span>}
            </div>
          </div>
          <div className="fg full">
            <label>Catatan / Review</label>
            <textarea name="notes" value={form.notes || ""} onChange={set} rows={3} />
          </div>
        </div>
        <div className="modal-ft">
          <button className="btn-cancel" onClick={onClose}>Batal</button>
          <button className="form-submit" onClick={save}>💾 Simpan</button>
        </div>
      </div>
    </div>
  );
}

export default EditAlbumModal;
