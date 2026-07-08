# 🐾 Pet Adopt

## 👥 Kelompok 2

| Nama             | NIM     |
| ---------------- | ------- |
| Dadika Yudiana   | 240160221006 |
| Imam Abdillah    | 240160221016 |
| Resa Khoerunnisa | 240160221038 |

---

## 📌 Tema Aplikasi

Pet Adopt merupakan aplikasi manajemen adopsi hewan berbasis React JS yang dirancang untuk membantu proses pendataan dan pengelolaan hewan yang tersedia untuk diadopsi. Aplikasi ini memudahkan pengguna dalam menyimpan informasi hewan seperti nama, jenis, umur, jenis kelamin, serta status adopsinya.

Pet Adopt dilengkapi dengan dashboard dan statistik yang menampilkan jumlah total hewan, jumlah hewan yang sudah diadopsi, serta jumlah hewan yang masih menunggu adopsi. Seluruh data disimpan menggunakan LocalStorage sehingga data tetap tersimpan meskipun halaman browser direfresh atau ditutup.

Aplikasi ini dibuat sebagai proyek Ujian Akhir Semester (UAS) mata kuliah Pemrograman Berbasis Web Front-End dengan menerapkan konsep CRUD (Create, Read, Update, Delete), pengelolaan state pada React, serta penerapan antarmuka pengguna (UI/UX) yang sederhana, responsif, dan mudah digunakan.

---

## ✨ Fitur Aplikasi

### ➕ Create

Menambahkan data hewan baru.

### 📖 Read

Menampilkan seluruh data hewan yang tersimpan.

### ✏️ Update

Mengubah data hewan yang sudah ada.

### 🗑️ Delete

Menghapus data hewan dengan konfirmasi menggunakan `window.confirm()`.

### 🔍 Search

Mencari data hewan berdasarkan nama atau jenis secara real-time.

### 📊 Dashboard & Statistik

Menampilkan:

* Total Hewan
* Sudah Diadopsi
* Menunggu Adopsi
* Persentase Adopsi

### 👤 Profil

Menampilkan informasi aplikasi dan anggota kelompok.

### 💾 Local Storage

Data tersimpan secara otomatis menggunakan LocalStorage sehingga tidak hilang saat browser direfresh.

---

## 🗂️ Struktur Data

Setiap data hewan disimpan dalam bentuk objek sebagai berikut:

```javascript
{
  id: Date.now(),
  nama: "Milo",
  jenis: "Kucing",
  umur: "2 Tahun",
  gender: "Jantan",
  adopted: false
}
```

### Keterangan Struktur Data

| Properti | Tipe Data | Keterangan           |
| -------- | --------- | -------------------- |
| id       | Number    | ID unik setiap hewan |
| nama     | String    | Nama hewan           |
| jenis    | String    | Jenis hewan          |
| umur     | String    | Umur hewan           |
| gender   | String    | Jenis kelamin hewan  |
| adopted  | Boolean   | Status adopsi hewan  |

---

## 🛠️ Teknologi yang Digunakan

* React JS
* Vite
* JavaScript
* CSS
* LocalStorage

---

## 🌐 Live Demo

Link Vercel / Netlify:


https://uas-si-iv-a-eight.vercel.app 

---


