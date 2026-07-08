import { useState } from "react";
const GENRES = ["Fiksi","Non-Fiksi","Romance","Thriller","Horror","Fantasi","Sains","Sejarah","Biografi","Self-Help","Komik","Lainnya"];
const blank = { title:"", author:"", genre:"", year:"", notes:"", status:"Belum Dibaca" };

function BookForm({ onAdd }) {
  const [form, setForm] = useState(blank);
  const [errs, setErrs] = useState({});
  const [ok, setOk]     = useState(false);

  const validate = () => { const e = {}; if (!form.title.trim()) e.title = "Wajib diisi"; if (!form.author.trim()) e.author = "Wajib diisi"; return e; };
  const set = (e) => { const { name, value } = e.target; setForm((p) => ({ ...p, [name]: value })); if (errs[name]) setErrs((p) => ({ ...p, [name]: "" })); };
  const submit = () => {
    const e = validate(); if (Object.keys(e).length) { setErrs(e); return; }
    onAdd({ ...form, id: String(+new Date()), addedDate: new Date().toLocaleDateString("id-ID", { day:"numeric", month:"short", year:"numeric" }) });
    setForm(blank); setErrs({}); setOk(true); setTimeout(() => setOk(false), 2500);
  };

  return (
    <div className="form-box">
      <div className="form-heading">Tambah Buku Baru</div>
      {ok && <div className="notif">✅ Buku berhasil ditambahkan!</div>}
      <div className="form-row">
        <div className={`fg ${errs.title ? "err" : ""}`}>
          <label>Judul Buku *</label>
          <input name="title" value={form.title} onChange={set} placeholder="Contoh: Laskar Pelangi" />
          {errs.title && <span className="emsg">{errs.title}</span>}
        </div>
        <div className={`fg ${errs.author ? "err" : ""}`}>
          <label>Penulis *</label>
          <input name="author" value={form.author} onChange={set} placeholder="Contoh: Andrea Hirata" />
          {errs.author && <span className="emsg">{errs.author}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="fg">
          <label>Genre</label>
          <select name="genre" value={form.genre} onChange={set}>
            <option value="">— Pilih Genre —</option>
            {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div className="fg">
          <label>Tahun Terbit</label>
          <input name="year" value={form.year} onChange={set} placeholder="2024" type="number" />
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
          <textarea name="notes" value={form.notes} onChange={set} placeholder="Catatan singkat..." rows={2} />
        </div>
      </div>
      <button className="btn-tambah" onClick={submit}>+ Tambah ke Koleksi</button>
    </div>
  );
}
export default BookForm;
