# 🍳 Resto Menu - Manager App

Aplikasi manajemen operasional restoran modern yang dirancang khusus untuk membantu **Admin dan Manajer Restoran** dalam mengelola daftar menu, memantau ketersediaan stok, serta melihat ringkasan data makanan dan minuman secara real-time.

---

## Kelompok 1
👥 Anggota Kelompok 
* **Faishal Rizky Fadilah** - 240160221013
* **Rissa Srihandita** - 240160221041
* **Ibrani** - 2401602210

---

## 📝 Tema & Deskripsi Aplikasi

### Latar Belakang
Dalam operasional restoran, perubahan menu, harga, dan ketersediaan stok makanan sering terjadi dengan cepat. Proses pencatatan manual atau menggunakan sistem yang kaku sering kali memperlambat pelayanan. Oleh karena itu, **Resto Menu - Manager App** hadir sebagai solusi *back-office* (dashboard admin) yang bersih, rapi, dan responsif. Aplikasi ini memudahkan manajer restoran memantau menu aktif langsung dari perangkat desktop maupun mobile saat memantau area dapur.

### Fitur-Fitur Utama
* **Manajemen CRUD :** Menambah menu baru, memperbarui informasi (*edit*), dan menghapus menu dari daftar.
* **Persistensi Data (LocalStorage):** Setiap perubahan data otomatis tersimpan di browser, sehingga data tidak hilang saat halaman di-refresh.
* **Pencarian Real-Time & Filter Status:** Mempermudah pencarian nama menu secara instan serta memfilter berdasarkan kategori (Makanan/Minuman) atau status (Tersedia/Habis).
* **Ringkasan Statistik Otomatis:** Menampilkan total menu terdaftar, jumlah kategori makanan, jumlah kategori minuman, serta menu yang stoknya sedang habis secara akurat.

---

## 📊 Struktur Data

Aplikasi ini menggunakan struktur data berbasis *Array of Objects* yang disimpan di dalam `localStorage`. Setiap objek menu memiliki properti wajib sebagai berikut:

| Properti | Tipe Data | Deskripsi | Contoh Nilai |
| :--- | :--- | :--- | :--- |
| `id` | `String` | Unique Identifier untuk setiap menu | `"1"` |
| `name` | `String` | Nama hidangan atau minuman | `"Nasi Goreng Spesial"` |
| `category` | `String` | Kelompok menu (`Makanan` atau `Minuman`) | `"Makanan"` |
| `price` | `Number` | Harga menu dalam satuan Rupiah (tanpa titik/koma) | `25000` |
| `status` | `String` | Status ketersediaan stok (`Tersedia` atau `Habis`) | `"Tersedia"` |
| `image` | `String` | URL langsung ke file gambar representatif (.jpg/.png) | `"https://images.unsplash.com/..."` |

## Link Demo: