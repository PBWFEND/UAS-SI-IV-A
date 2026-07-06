# 📚 BookShelf — Aplikasi Koleksi Buku

> Aplikasi manajemen koleksi buku pribadi berbasis React + Vite

---

## 👥 Nama & NIM

| Nama | NIM |
|------|-----|
| [Sandika Yusuf Permana] | [240160221044] |
| [Marsya Nurdianti] | [240160221022] |
| [Riko Muhamad] | [240160221040] |  
---

## 📌 Tema & Deskripsi

**Tema:** Manajemen Koleksi Buku

Aplikasi untuk mencatat dan mengelola koleksi buku pribadi — mana yang sudah dan belum dibaca.

**Fitur:**
- ➕ Tambah Buku — form dengan validasi
- 📋 Lihat Koleksi — dikelompokkan Belum Dibaca & Sudah Dibaca
- ✏️ Edit Buku — modal edit lengkap
- 🗑️ Hapus Buku — dengan dialog konfirmasi
- 🔄 Toggle Status — tandai sudah/belum dibaca
- 📊 Statistik — total, sudah dibaca, belum dibaca
- 💾 Data tersimpan di localStorage

---

## 🗂️ Struktur Data

```javascript
{
  id: string,        // ID unik (timestamp)
  title: string,     // Judul buku
  author: string,    // Penulis
  genre: string,     // Genre
  year: string,      // Tahun terbit
  status: string,    // "Belum Dibaca" | "Sudah Dibaca"
  notes: string,     // Catatan
  addedDate: string, // Tanggal ditambahkan
}
```

---

## 🚀 Cara Menjalankan

```bash
npm install
npm run dev
```

---

## 🌐 Link Demo

🔗 **[https://books-colecction.netlify.app/]**

---

*© 2025 BookShelf · UAS Genap 2025/2026 · S1 Sistem Informasi*
