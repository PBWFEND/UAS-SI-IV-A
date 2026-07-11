# 📑 UAS Pemrograman Berbasis Web (Frontend) - Kelompok 8

## ✨ GlowSpace - Aplikasi CRUD Manajemen Antrean Salon

Aplikasi **GlowSpace** dibangun menggunakan ekosistem modern **React (Vite)** untuk memenuhi kriteria penilaian Ujian Akhir Semester (UAS) pada Program Studi Sistem Informasi (Kelas SI-IV-A). Seluruh pengelolaan data dioperasikan secara dinamis di sisi klien (*client-side data persistence*).

---

## 👥 Profil Anggota Kelompok 8

Berikut adalah daftar anggota sekaligus penanggung jawab proyek aplikasi **GlowSpace**:

1. **Muhammad Mulky Khoiruddin Farrij** - 240160221026
2. **Faatin Ashri Widiatin** - 240160221011
3. **Nadya Zahra Aulia** - 240160221030

---

## 📝 Tema & Deskripsi Aplikasi

**GlowSpace Management App** adalah platform berbasis web yang dirancang khusus untuk membantu kasir atau admin salon kecantikan dalam mendata, melacak, dan memperbarui antrean *treatment* pelanggan secara praktis.

### 🚀 Fitur Utama & Logika Teknis

1. **Create (Tambah Data)**  
   Menyediakan formulir untuk mendaftarkan nama pelanggan dan memilih jenis layanan salon. Kolom harga akan terisi secara otomatis dan bersifat *read-only* berdasarkan data layanan yang dipilih sehingga meminimalkan kesalahan input.

2. **Read (Tampilkan Data)**  
   Menampilkan seluruh daftar antrean pelanggan dalam bentuk **card** yang rapi, lengkap dengan informasi waktu saat data dibuat.

3. **Update (Pembaruan Data)**
   - **Status Toggle** : Mengubah status pengerjaan hanya dengan satu klik (*Tandai Selesai* / *Batalkan Selesai*). Tampilan kartu dan badge akan berubah secara dinamis.
   - **Full Edit** : Memuat kembali data ke dalam form sehingga admin dapat mengubah nama pelanggan maupun jenis layanan.

4. **Delete (Hapus Data)**  
   Menghapus data antrean secara permanen dengan konfirmasi menggunakan `window.confirm()` sebelum data benar-benar dihapus.

5. **Real-time Search & Filter**  
   Memfilter antrean berdasarkan status (*Semua*, *Menunggu*, *Selesai*) serta pencarian nama pelanggan secara langsung tanpa perlu me-*reload* halaman.

6. **Data Persistence**  
   Menggunakan React Hooks (`useState` dan `useEffect`) untuk menyimpan data ke dalam `localStorage`, sehingga data tetap tersedia meskipun browser di-*refresh* atau ditutup.

---

## 🗃️ Struktur Objek Data (Data Structure)

Setiap data antrean disimpan dalam format objek seperti berikut:

```json
{
  "id": "1719463200000",
  "customerName": "Fatin",
  "serviceName": "Coloring / Hair Dye",
  "price": 250000,
  "isCompleted": false,
  "bookingDate": "27/06/2026, 11.16.28 WIB"
}
```

---

## 🚀 Cara Menjalankan

```bash
npm install
npm run dev
```

---

## 🌐 Deploy

**Vercel**

https://glamour-fnhba7yb1-kelompok-8salon.vercel.app/

---

## 🔗 Link Demo

https://glamour-fnhba7yb1-kelompok-8salon.vercel.app/