# 🍳 Resto Menu - Manager App

Aplikasi manajemen operasional restoran modern yang dirancang khusus untuk membantu **Admin dan Manajer Restoran** dalam mengelola daftar menu, memantau ketersediaan stok, serta melihat ringkasan data makanan dan minuman secara real-time.

---

## 👥 Nama Kelompok & NIM Anggota

Aplikasi ini dikembangkan oleh **Kelompok 1** dengan anggota sebagai berikut:
* **Faishal Rizky Fadilah** - NIM: 240160221013
* **Rissa Srihandita** - NIM: 240160221041
* **Ibrani** - NIM: 2401602210

---

## 📝 Tema & Deskripsi Aplikasi

### Latar Belakang
Dalam operasional restoran, perubahan menu, harga, dan ketersediaan stok makanan sering terjadi dengan cepat. Proses pencatatan manual atau menggunakan sistem yang kaku sering kali memperlambat pelayanan dan menyulitkan koki di dapur dalam menyajikan menu yang up-to-date. Oleh karena itu, **Resto Menu - Manager App** hadir sebagai solusi *back-office* (dashboard admin) yang bersih, rapi, dan responsif. Aplikasi ini dirancang agar manajer restoran dapat memantau dan mengelola ketersediaan menu secara aktif langsung dari perangkat desktop maupun mobile saat memantau dapur.

### Fitur-Fitur Utama Aplikasi
* **Dashboard Multi-View (Sidebar Dinamis):** Navigasi sidebar interaktif untuk berpindah tab secara *real-time* tanpa memuat ulang halaman:
  * **📊 Dashboard:** Grid menu interaktif lengkap dengan filter, pencarian real-time, ringkasan statistik cepat, dan form input.
  * **📋 Daftar Menu (Tampilan Tabel):** Penyajian menu dalam format baris tabel dengan pencarian internal, filter kategori, aksi Edit/Hapus, serta **Quick Status Toggle Switch** untuk mengubah ketersediaan stok langsung dari baris tabel.
  * **📁 Kategori:** Analisis performa menu makanan vs minuman, perhitungan harga rata-rata kategori, grafik persentase distribusi menu, dan pencarian hidangan termahal.
  * **📈 Laporan:** Dasbor laporan kinerja yang memuat rata-rata harga menu, hidangan termahal/termurah, serta visualisasi grafik status stok (Tersedia vs Habis) berbasis CSS murni.
* **Persistensi Data (LocalStorage):** Setiap perubahan data (tambah, edit, ubah status, hapus) otomatis disimpan ke `localStorage` browser sehingga data aman dari *page refresh*.
* **Pencarian Real-Time & Filter Fleksibel:** Memudahkan pencarian menu secara instan dan memfilter data berdasarkan Kategori atau Status Stok.
* **Form Input & Validasi Kuat:** Formulir tambah/edit menu memvalidasi semua field utama dan memastikan harga berupa angka positif.
* **Input URL Gambar & Fallback Cerdas:** Mendukung input URL gambar kustom. Jika dikosongkan atau jika link gambar yang dimasukkan pengguna rusak (*error loading*), sistem otomatis memuat gambar ilustrasi berkualitas tinggi dari Unsplash sesuai kategori.
* **Toast Alert Feedback:** Alert pop-up modern di sudut kanan bawah untuk memberikan konfirmasi visual instan saat data berhasil ditambahkan, diperbarui, diubah statusnya, atau dihapus.
* **Desain Premium & Responsif:** Antarmuka dengan visual bernuansa kuliner modern menggunakan Google Fonts **Poppins**, efek *glassmorphism*, gradien warna dinamis, dan penataan grid responsif (mendukung desktop, tablet, dan smartphone).

---

## 📊 Struktur Data

Aplikasi ini menggunakan struktur data berbasis *Array of Objects* yang disimpan di dalam `localStorage` browser dengan nama kunci `resto_menus`. Setiap objek menu memiliki properti wajib sebagai berikut:

| Properti | Tipe Data | Deskripsi | Contoh Nilai |
| :--- | :--- | :--- | :--- |
| `id` | `String` | Unique Identifier (ID unik bertipe string) yang digenerate otomatis berdasarkan timestamp saat pembuatan menu | `"171994356789"` |
| `name` | `String` | Nama hidangan hidangan makanan atau minuman | `"Nasi Goreng Spesial"` |
| `category` | `String` | Kategori hidangan, terbatas pada nilai `"Makanan"` atau `"Minuman"` | `"Makanan"` |
| `price` | `Number` | Harga hidangan dalam mata uang Rupiah (berupa tipe angka murni tanpa tanda baca) | `25000` |
| `status` | `String` | Status ketersediaan menu, bernilai `"Tersedia"` atau `"Habis"` | `"Tersedia"` |
| `image` | `String` | URL langsung (Direct Link) ke gambar hidangan representatif (.jpg/.png) | `"https://images.unsplash.com/photo-1546069901-ba9599a7e63c"` |

---

## 🛠️ Stack Teknologi

* **Library Utama:** React 19
* **Build Tool:** Vite
* **Styling:** Vanilla CSS (Dengan Google Fonts Poppins & responsive flexbox/grid layout)
* **Kualitas Kode:** ESLint (Bebas dari unused imports/variables)

## 🚀 Panduan Deploy ke Vercel

Aplikasi ini siap di-deploy ke **Vercel** dengan konfigurasi SPA rewrite yang sudah disediakan pada berkas `vercel.json` agar routing berjalan mulus saat halaman dimuat ulang.

### Pilihan 1: Deploy Melalui Vercel Dashboard (Rekomendasi)
1. Unggah kode project Anda ke repository Git (GitHub, GitLab, atau Bitbucket).
2. Buka dan masuk ke [Vercel Dashboard](https://vercel.com/dashboard).
3. Klik tombol **Add New** lalu pilih **Project**.
4. Impor repository Git dari project `resto-menu-manager` ini.
5. Vercel akan otomatis mendeteksi konfigurasi Vite. Pastikan pengaturannya sesuai:
   * **Framework Preset:** `Vite`
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
   * **Install Command:** `npm install`
6. Klik tombol **Deploy** dan tunggu proses pembuatan selesai.

### Pilihan 2: Deploy Menggunakan Vercel CLI
1. Pasang Vercel CLI secara global di komputer Anda (jika belum):
   ```bash
   npm install -g vercel
   ```
2. Jalankan perintah deploy di direktori utama project:
   ```bash
   vercel
   ```
3. Ikuti instruksi interaktif yang muncul di terminal (Login akun, buat project baru, pilih pengaturan default Vite).
4. Untuk deploy ke produksi, jalankan perintah:
   ```bash
   vercel --prod
   ```