# 🎵 Tunify — Aplikasi Koleksi Musik

> Aplikasi manajemen koleksi album musik pribadi berbasis React + Vite

---

## 👥 Nama Kelompok & NIM

Kelompok 4 SI-IV-A

| Nama | NIM |
|------|-----|
| [Aldi Restu Fauzi] | [240160221001] |
| [Khoirunisa Sholeha Hidayat] | [240160221018] |
| [Muhammad Zaky] | [240160221028] |

---

## 📌 Tema & Deskripsi Aplikasi

**Tema:** Manajemen Koleksi Album Musik

**Latar Belakang:**
Banyak pecinta musik memiliki koleksi album yang besar namun sulit melacak mana yang sudah didengar, sedang didengar, atau masih di wishlist. Tunify hadir sebagai solusi pencatatan koleksi musik yang personal, cepat, dan berjalan sepenuhnya di browser tanpa perlu server.

**Fitur Utama:**
- ➕ **Tambah Album** — Form lengkap dengan validasi (judul, artis, genre, mood, tahun, jumlah lagu, rating, lagu favorit, cover, link Spotify, catatan)
- 📋 **Lihat Koleksi** — Dikelompokkan dalam 3 kategori: *Sedang Didengar*, *Wishlist*, *Sudah Didengar*
- ✏️ **Edit Album** — Modal edit penuh untuk mengubah semua properti
- 🗑️ **Hapus Album** — Dilengkapi dialog konfirmasi sebelum penghapusan
- 🔄 **Toggle Status** — Ubah status listening dengan satu klik
- 🔍 **Cari & Filter** — Real-time search by judul/artis + filter genre, status, mood di sidebar
- 📊 **Statistik** — Hero stats: total album + progress bar sudah/sedang/wishlist
- 🖼️ **Cover Album** — Dukungan gambar dari URL eksternal dengan preview langsung
- 🎧 **Link Spotify** — Simpan link album Spotify, buka langsung dari card
- 🌙 **Dark / Light Mode** — Toggle tema gelap/terang, tersimpan otomatis di localStorage
- 💾 **Persistensi Data** — Semua data tersimpan di `localStorage`
- 🎬 **Splash Screen** — Animasi loading intro saat pertama buka app

---

## 🗂️ Struktur Data

```javascript
{
  id: string,          // ID unik (timestamp string)
  title: string,       // Judul album
  artist: string,      // Nama artis / band
  genre: string,       // Genre musik
  mood: string,        // Mood album (Chill, Energetic, dll)
  year: string,        // Tahun rilis
  totalTracks: number, // Jumlah lagu
  rating: number,      // Rating 1–5
  status: string,      // "Wishlist" | "Sedang Didengar" | "Sudah Didengar"
  favTrack: string,    // Lagu favorit di album ini
  spotifyUrl: string,  // Link album di Spotify
  notes: string,       // Catatan / review singkat
  imageUrl: string,    // URL cover album
  addedDate: string,   // Tanggal ditambahkan (format lokal id-ID)
}
```

---

## 🏗️ Struktur Proyek

```
music-collection-app/
├─ public/
│  └─ favicon.svg
├─ src/
│  ├─ components/
│  │  ├─ AlbumCard.jsx       # Card tampilan per album
│  │  ├─ AlbumForm.jsx       # Form tambah album baru
│  │  ├─ EditAlbumModal.jsx  # Modal edit lengkap
│  │  ├─ SearchFilter.jsx    # Komponen filter
│  │  ├─ SplashScreen.jsx    # Animasi splash screen
│  │  └─ StatsCard.jsx       # Komponen statistik
│  ├─ data/
│  │  ├─ genres.js           # Daftar genre musik
│  │  └─ moods.js            # Daftar mood
│  ├─ App.css                # Styling utama + dark mode
│  ├─ App.jsx                # Root component + state management
│  ├─ index.css              # Global styles
│  └─ main.jsx               # Entry point
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package.json
├─ README.md
└─ vite.config.js
```

---

## 🌐 Link Aplikasi Live

🔗 **[https://music-collection-apps.netlify.app/]**

---

## 🛠️ Teknologi

- **React 18** · **Vite 5** · **localStorage** · **CSS Custom Properties**