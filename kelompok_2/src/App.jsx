import { useEffect, useState } from "react";
import "./App.css";
import petHero from "./assets/pet-hero.jpeg";

export default function App() {
  const [user, setUser] = useState(null);
  const [menu, setMenu] = useState("dashboard");

  const [hewanList, setHewanList] = useState(() => {
    return JSON.parse(localStorage.getItem("hewanData")) || [];
  });

  const [form, setForm] = useState({
    nama: "",
    jenis: "",
    umur: "",
    gender: "",
  });

  const [search, setSearch] = useState("");
  const [notif, setNotif] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  
  useEffect(() => {
    localStorage.setItem("hewanData", JSON.stringify(hewanList));
  }, [hewanList]);

  // 🔔 NOTIF
  const showNotif = (msg) => {
    setNotif(msg);
    setTimeout(() => setNotif(""), 2000);
  };

  const login = () => {
  setUser("admin");
};

  const logout = () => setUser(null);

  // 🧾 INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ➕ TAMBAH
  const tambah = () => {
  if (!form.nama || !form.jenis) {
    showNotif("Nama dan jenis wajib diisi ❗");
    return;
  }

  if (editIndex !== null) {
    const updated = [...hewanList];

    updated[editIndex] = {
      ...updated[editIndex],
      ...form,
    };

    setHewanList(updated);
    setEditIndex(null);

    showNotif("Data berhasil diperbarui ✅");
  } else {
    setHewanList([
      ...hewanList,
      {
        id: Date.now(),
        ...form,
        adopted: false,
      },
    ]);

    showNotif("Data berhasil ditambahkan ✅");
  }

  setForm({
    nama: "",
    jenis: "",
    umur: "",
    gender: "",
  });
  };
  // 🗑️ HAPUS (CONFIRM FIX)
  const hapus = (index) => {
    const yakin = window.confirm("Yakin mau menghapus data ini?");
    if (!yakin) return;

    setHewanList(hewanList.filter((_, i) => i !== index));
    showNotif("Data berhasil dihapus 🗑️");
  };

  // ✏️ EDIT (FIX — TIDAK HAPUS LAGI)
  const edit = (index) => {
  setForm(hewanList[index]);
  setEditIndex(index);

   showNotif("Data siap diedit ✏️");
  };

  // 🐾 ADOPT
  const adopt = (index) => {
  const updated = [...hewanList];

  updated[index].adopted = !updated[index].adopted;

  setHewanList(updated);

  showNotif(
    updated[index].adopted
      ? "🎉 Hewan berhasil diadopsi!"
      : "↩️ Status dikembalikan ke belum diadopsi"
  );
};

// 🔍 SEARCH
const filtered = hewanList.filter((h) => {
  const q = search.toLowerCase();

  return (
    h.nama.toLowerCase().includes(q) ||
    h.jenis.toLowerCase().includes(q)
  );
});

// 📊 STATISTIK
const totalHewan = hewanList.length;

const sudahDiadopsi = hewanList.filter(
  (h) => h.adopted
).length;

const belumDiadopsi = hewanList.filter(
  (h) => !h.adopted
).length;

// 🐾 ICON HEWAN
const getPetIcon = (jenis) => {
  if (!jenis) return "🐾";

  const j = jenis.toLowerCase();

  if (j.includes("kucing")) return "🐱";
  if (j.includes("anjing")) return "🐶";
  if (j.includes("kelinci")) return "🐰";
  if (j.includes("hamster")) return "🐹";
  if (j.includes("burung")) return "🐦";

  return "🐾";
};

  // 🔐 LOGIN PAGE
 if (!user) {
  const getPetIcon = (jenis) => {
  const j = jenis.toLowerCase();
    if (j.includes("kucing")) return "🐱";
    if (j.includes("anjing")) return "🐶";
    if (j.includes("kelinci")) return "🐰";
    return "🐾";
  };

  return (
    <div className="login">

      <div className="login-left">
        <img
          src={petHero}
          alt="Pet Adoption"
          className="hero-image"
        />
      </div>

      <div className="login-right">
        <h1>Pet Adopt</h1>

        <p className="subtitle">
          Adopt • Care • Love
        </p>

        <button onClick={() => login()}>
          Masuk ke Aplikasi
        </button>
      </div>

    </div>
  );
}
  return (
    <div className="app">
      
      {/* 🔔 NOTIF */}
      {notif && <div className="notif">{notif}</div>}

      {/* HEADER */}
      <div className="header">

        <img
          src={petHero}
          alt="Pet"
          className="dashboard-pet"
        />

      <div className="header-content">

          <h1>Pet Adopt</h1>

          <h2>
           Welcome to Pet Adopt 👋
          </h2>

          <p>
            Kelola data hewan adopsi dengan mudah dan cepat
          </p>

          <div className="header-menu">
           <button className={menu === "dashboard" ? "active" : ""}
              onClick={() => setMenu("dashboard")}
            >
              🏠 Dashboard
            </button>

            <button
              className={menu === "hewan" ? "active" : ""}
              onClick={() => setMenu("hewan")}
            >
              🐾 Data Hewan
            </button>

            <button
              className={menu === "statistik" ? "active" : ""}
              onClick={() => setMenu("statistik")}
            >
              📊 Statistik
            </button>

            <button
              className={menu === "profil" ? "active" : ""}
              onClick={() => setMenu("profil")}
            >
              👤 Profil
            </button>
          </div>

        </div>
        <button
          className="logout-btn"
          onClick={logout}
        >
          🚪 Logout
        </button>
      </div>

       {menu === "dashboard" && (
          <div className="stats">
            <div className="stat-card">
              <h3>🐾</h3>
              <p>Total Hewan</p>
              <span>{totalHewan}</span>
            </div>

            <div className="stat-card">
              <h3>🏠</h3>
              <p>Sudah Diadopsi</p>
              <span>{sudahDiadopsi}</span>
            </div>

            <div className="stat-card">
              <h3>❤️</h3>
              <p>Menunggu Adopsi</p>
              <span>{belumDiadopsi}</span>
            </div>
          </div>
        )}

        {menu === "statistik" && (
  <div className="card">
    <h2>📊 Statistik Adopsi</h2>
    <p>🐾 Total Hewan : {totalHewan}</p>
    <p>🏠 Sudah Diadopsi : {sudahDiadopsi}</p>
    <p>❤️ Menunggu Adopsi : {belumDiadopsi}</p>
    <hr />

    <h3>
      📈 Tingkat Adopsi :
      {" "}
      {totalHewan === 0
        ? 0
        : Math.round(
            (sudahDiadopsi / totalHewan) * 100
          )}
      %
    </h3>

    <p>
      Statistik diperbarui secara otomatis
      berdasarkan data hewan yang tersedia.
    </p>
  </div>
  )}

  {menu === "hewan" && (
    <>
    {/* FORM */}
    <div className="form">
      <input
        name="nama"
        placeholder="Nama hewan"
        value={form.nama}
        onChange={handleChange}
      />

      <input
        name="jenis"
        placeholder="Jenis (kucing/anjing)"
        value={form.jenis}
        onChange={handleChange}
      />

      <input
        name="umur"
        placeholder="Umur"
        value={form.umur}
        onChange={handleChange}
      />

      <select
        name="satuanUmur"
        value={form.satuanUmur}
        onChange={handleChange}
      >
        <option value="">Pilih Satuan Umur</option>
        <option value="Minggu">Minggu</option>
        <option value="Bulan">Bulan</option>
        <option value="Tahun">Tahun</option>
        </select>

      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
      >
        <option value="">Pilih Gender</option>
        <option value="Jantan">Jantan</option>
        <option value="Betina">Betina</option>
      </select>

      <button onClick={tambah}>
        {editIndex !== null
          ? "💾 Simpan Perubahan"
          : "+ Tambah Hewan"}
      </button>
    </div>

    {/* SEARCH */}
    <div className="search-box">
      <span className="search-icon">🔍</span>
      <input
        className="search"
        placeholder="Cari nama atau jenis..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    <p className="result-text">
      Menampilkan {filtered.length} hewan
    </p>

    {/* LIST */}
    <div className="grid">
      {filtered.map((h, i) => (
        <div className="card" key={i}>
        <div className="pet-avatar">
        {getPetIcon(h.jenis)}
    </div>

    <h3>{h.nama}</h3>

          <p>Jenis: {h.jenis}</p>
          <p>Umur: {h.umur} {h.satuanUmur}</p>
          <p>Gender: {h.gender}</p>
          <p>

            Status:
            <span
              className={
                h.adopted
                  ? "status-adopted"
                  : "status-available"
              }
              onClick={() => adopt(i)}
            >
              {h.adopted
                ? " 🏠 Sudah Diadopsi"
                : " ❤️ Belum Diadopsi"}
            </span>
          </p>

        
            <div className="btns">
  <button onClick={() => edit(i)}>
    Edit
  </button>

  <button onClick={() => hapus(i)}>
    Hapus
  </button>
</div>     
        </div>
      ))}
    </div>
  </>
)}

  {menu === "profil" && (
  <div className="profile-card">

    <img
      src={petHero}
      alt="Pet"
      className="profile-pet"
    />

    <h2>Pet Adopt</h2>

    <p className="profile-subtitle">
      Adopt • Care • Love
    </p>

    <p className="profile-desc">
      Pet Adopt adalah aplikasi manajemen adopsi hewan
      yang membantu pencatatan data hewan, status adopsi,
      dan pengelolaan informasi adopsi secara mudah.
    </p>

    <div className="profile-grid">

      <div className="profile-box">
        <h3>👤 Role</h3>
        <p>{user}</p>
      </div>

      <div className="profile-box">
        <h3>💻 Teknologi</h3>
        <p>React JS</p>
      </div>

      <div className="profile-box">
        <h3>📅 Tahun</h3>
        <p>2026</p>
      </div>

     <div className="profile-box">
        <h3>👥 Kelompok 2</h3>

        <ul className="member-list">
          <li>Dadika Yudiana</li>
          <li>Imam Abdillah</li>
          <li>Resa Khoerunnisa</li>
        </ul>
      </div>
    </div>

  </div>
)}

       <footer className="footer">
        © 2026 Pet Adopt<br />
        Created by Group 2
      </footer>
    </div>
  );
}

