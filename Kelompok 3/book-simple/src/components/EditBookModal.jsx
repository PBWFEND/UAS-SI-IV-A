import { useState, useEffect } from "react";
const GENRES = ["Fiksi","Non-Fiksi","Romance","Thriller","Horror","Fantasi","Sains","Sejarah","Biografi","Self-Help","Komik","Lainnya"];

function EditBookModal({ book, onSave, onClose }) {
  const [form, setForm] = useState({ ...book });
  const [errs, setErrs] = useState({});
  useEffect(() => { setForm({ ...book }); }, [book]);

  const validate = () => { const e = {}; if (!form.title.trim()) e.title = "Wajib diisi"; if (!form.author.trim()) e.author = "Wajib diisi"; return e; };
  const set = (e) => { const { name, value } = e.target; setForm((p) => ({ ...p, [name]: value })); if (errs[name]) setErrs((p) => ({ ...p, [name]: "" })); };
  const save = () => { const e = validate(); if (Object.keys(e).length) { setErrs(e); return; } onSave({ ...form }); };

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <h2>Edit Buku</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="form-row">
          <div className={`fg ${errs.title ? "err" : ""}`}>
            <label>Judul Buku *</label>
            <input name="title" value={form.title} onChange={set} />
            {errs.title && <span className="emsg">{errs.title}</span>}
          </div>
          <div className={`fg ${errs.author ? "err" : ""}`}>
            <label>Penulis *</label>
            <input name="author" value={form.author || ""} onChange={set} />
            {errs.author && <span className="emsg">{errs.author}</span>}
          </div>
        </div>
        <div className="form-row">
          <div className="fg">
            <label>Genre</label>
            <select name="genre" value={form.genre || ""} onChange={set}>
              <option value="">— Pilih Genre —</option>
              {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div className="fg">
            <label>Tahun Terbit</label>
            <input name="year" value={form.year || ""} onChange={set} type="number" />
          </div>
        </div>
        <div className="form-row single">
          <div className="fg">
            <label>Status</label>
            <select name="status" value={form.status} onChange={set}>
              <option value="Belum Dibaca">Belum Dibaca</option>
              <option value="Sudah Dibaca">Sudah Dibaca</option>
            </select>
          </div>
        </div>
        <div className="form-row single">
          <div className="fg">
            <label>Catatan</label>
            <textarea name="notes" value={form.notes || ""} onChange={set} rows={2} />
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn-batal" onClick={onClose}>Batal</button>
          <button className="btn-tambah" style={{marginTop:0, width:"auto", padding:"0.55rem 1.2rem"}} onClick={save}>💾 Simpan</button>
        </div>
      </div>
    </div>
  );
}
export default EditBookModal;
