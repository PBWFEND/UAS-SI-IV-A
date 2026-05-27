# 🎬 MovieFlux - Pencatatan List Film (Watch List App).

---

**Kelompok 5 SI-IV-A**

**Anggota**:

- Devaldy Dzikri S | 240160221050
- Alya Ayu Meysha | 240160221003
- Winda Nurhidayah | 240160221047

---

## ✏️ Tema & Deskripsi Aplikasi

- **Tema**: Media & Entertainment (Movie Tracker)
- **Deskripsi**: **MovieFlux** adalah platform personal movie logger yang berfungsi sebagai asisten digital untuk mengorganisir riwayat tontonan film. Dengan visual antarmuka gelap yang modern, aplikasi ini memudahkan pengguna memisahkan film berdasarkan status tontonan serta memberikan visualisasi data statistik yang ringkas dan informatif.

---

## 🎨 Desain dan Styling (Tailwind CSS)

Dalam proses pembuatannya, antarmuka (_user interface_) MovieFlux dibangun sepenuhnya menggunakan **Tailwind CSS**. Pendekatan _utility-first_ dari Tailwind CSS digunakan untuk menciptakan pengalaman visual yang modern dan interaktif.

---

## ⚙️ Menu dan Fitur Utama

### 1. Manajemen Daftar Film (Movie Logging)

Fitur inti untuk mengelola database film pengguna:

- **Spotlight**: Menampilkan film pilihan utama atau yang sedang hangat diperhatikan.
- **Semua Film**: Menampilkan seluruh koleksi katalog film yang tersimpan.
- **Belum Ditonton**: Menyaring daftar film yang masuk antrean rencana tontonan (_watchlist_).
- **Sudah Ditonton**: Menyaring daftar film yang telah selesai ditonton sebagai riwayat (_history_).

### 2. Panel Statistik Real-Time (Sidebar)

Kalkulator data koleksi film otomatis yang mendata secara presisi:

- **Total Film**: Jumlah keseluruhan film yang terdaftar.
- **Belum Ditonton & Sudah Ditonton**: Penghitung rasio progres menonton pengguna.
- **Total Genre**: Menghitung secara otomatis jumlah variasi genre film yang unik tanpa duplikasi.
- **Total Negara**: Menghitung sebaran negara asal produksi film secara dinamis.

---

## 🛠️ Struktur Data

Aplikasi ini menggunakan struktur data objek tunggal film dengan skema sebagai berikut:

```json
{
  "id": "String/Number", // ID unik untuk setiap film
  "title": "String", // Judul film
  "genre": "String/Array", // Genre film (contoh: "Action, Sci-Fi" atau ["Action", "Sci-Fi"])
  "country": "String/Array", // Negara asal (contoh: "USA", "Indonesia")
  "status": "String" // Status tontonan ("sudah ditonton" atau "belum ditonton")
}
```

---

## 📁 Struktur Direktori Project

```json
watchlist-app/
├─ dist/
│ ├─ assets/
│ │ ├─ index-q0fDvlV7.css
│ │ └─ index-vpGA75Zd.js
│ ├─ favicon.svg
│ ├─ icons.svg
│ ├─ index.html
│ ├─ logo-icon..png
│ └─ logo.png
├─ public/
│ ├─ favicon.svg
│ ├─ icons.svg
│ ├─ logo-icon..png
│ └─ logo.png
├─ src/
│ ├─ assets/
│ │ ├─ hero.png
│ │ ├─ react.svg
│ │ └─ vite.svg
│ ├─ components/
│ │ ├─ EditMovieModal.jsx
│ │ ├─ MovieCard.jsx
│ │ ├─ MovieForm.jsx
│ │ ├─ SearchFilter.jsx
│ │ └─ StatsCard.jsx
│ ├─ data/
│ │ ├─ countries.js
│ │ └─ genres.js
│ ├─ App.css
│ ├─ App.jsx
│ ├─ index.css
│ └─ main.jsx
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
└─ vite.config.js
```

---

## 🚀 Link Aplikasi Live

**[https://watchlist-dev-uas.netlify.app](https://watchlist-dev-uas.netlify.app)**
