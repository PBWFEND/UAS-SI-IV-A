import { useState } from "react";

const GENRES = ["Pop","Rock","Hip-Hop","R&B","Jazz","Classical","Electronic","Indie","Metal","Folk","Soul","K-Pop","Lo-Fi","Ambient"];
const MOODS  = ["Energetic","Chill","Melancholic","Happy","Romantic","Dark","Motivating","Nostalgic","Focus","Party"];

const blank = { title:"", artist:"", genre:"", mood:"", year:"", totalTracks:"", rating:3, status:"Wishlist", favTrack:"", notes:"", imageUrl:"", spotifyUrl:"" };

function AlbumForm({ onAdd }) {
  const [form, setForm]   = useState(blank);
  const [errs, setErrs]   = useState({});
  const [ok, setOk]       = useState(false);
  const [imgErr, setImgErr] = useState(false);

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

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrs(e); return; }
    onAdd({ ...form, id: String(+new Date()), rating: Number(form.rating),
      totalTracks: form.totalTracks ? Number(form.totalTracks) : "",
      addedDate: new Date().toLocaleDateString("id-ID", { day:"numeric", month:"short", year:"numeric" }),
    });
    setForm(blank); setErrs({}); setImgErr(false);
    setOk(true); setTimeout(() => setOk(false), 2500);
  };

  const showPrev = form.imageUrl && !imgErr;

  return (
    <div className="form-panel">
      <div className="form-head">Tambah Album Baru</div>
      {ok && <div className="toast-ok">🎉 Album berhasil ditambahkan!</div>}
      <div className="form-grid">
        <div className={`fg ${errs.title ? "err" : ""}`}>
          <label>Judul Album *</label>
          <input name="title" value={form.title} onChange={set} placeholder="Contoh: Thriller" />
          {errs.title && <span className="emsg">{errs.title}</span>}
        </div>
        <div className={`fg ${errs.artist ? "err" : ""}`}>
          <label>Artis / Band *</label>
          <input name="artist" value={form.artist} onChange={set} placeholder="Contoh: Michael Jackson" />
          {errs.artist && <span className="emsg">{errs.artist}</span>}
        </div>
        <div className={`fg ${errs.genre ? "err" : ""}`}>
          <label>Genre *</label>
          <select name="genre" value={form.genre} onChange={set}>
            <option value="">— Pilih Genre —</option>
            {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          {errs.genre && <span className="emsg">{errs.genre}</span>}
        </div>
        <div className="fg">
          <label>Mood</label>
          <select name="mood" value={form.mood} onChange={set}>
            <option value="">— Pilih Mood —</option>
            {MOODS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div className="fg">
          <label>Tahun Rilis</label>
          <input name="year" value={form.year} onChange={set} placeholder="1982" type="number" min="1900" max="2099" />
        </div>
        <div className="fg">
          <label>Jumlah Lagu</label>
          <input name="totalTracks" value={form.totalTracks} onChange={set} placeholder="12" type="number" min="1" />
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
          <input name="favTrack" value={form.favTrack} onChange={set} placeholder="Lagu terbaik di album ini..." />
        </div>
        <div className="fg full">
          <label>🎧 Link Spotify Album</label>
          <input name="spotifyUrl" value={form.spotifyUrl} onChange={set} placeholder="https://open.spotify.com/album/..." />
        </div>
        <div className="fg full">
          <label>URL Cover Album</label>
          <input name="imageUrl" value={form.imageUrl} onChange={set} placeholder="https://..." />
          <div className="img-prev">
            {showPrev ? <img src={form.imageUrl} alt="preview" onError={() => setImgErr(true)} />
              : <span>{form.imageUrl ? "URL tidak valid" : "Preview cover muncul di sini"}</span>}
          </div>
        </div>
        <div className="fg full">
          <label>Catatan / Review</label>
          <textarea name="notes" value={form.notes} onChange={set} placeholder="Kesan atau review singkat..." rows={3} />
        </div>
      </div>
      <button className="form-submit" onClick={submit}>+ Tambah ke Koleksi</button>
    </div>
  );
}

export default AlbumForm;
