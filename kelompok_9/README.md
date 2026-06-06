# ☕ Caffeine & Co.

Aplikasi ini dikembangkan untuk memenuhi tugas UAS Mata Kuliah Pemrograman Berbasis Web.  
**Caffeine & Co.** merupakan aplikasi manajemen pemesanan kopi dan minuman artisan (Barista Dashboard) berbasis **React + Vite** dengan tampilan modern aesthetic glassmorphism bernuansa gelap-emas (dark & gold theme) yang mewah.

---

# 👨💻 Developer

1. Della Kartika — 240160221008  
2. Fauzan Zainul Arifin — 240160221014  
3. Nur Octaviani Tri Wulandari — 240160221032  

---

# ✨ Fitur Aplikasi (Full CRUD di Setiap Halaman Navigasi)

Aplikasi ini telah diperbarui untuk mendukung fungsionalitas CRUD (Create, Read, Update, Delete) yang lengkap di setiap tab navigasi, tersinkron secara persisten melalui **LocalStorage**:

## 📋 1. Kelola & Status Pesanan (CRUD Antrean & Transaksi)
- **Create**: Barista dapat menambahkan pesanan baru secara manual di tab "Kelola Pesanan" (Order Manager) atau pelanggan dapat melakukan checkout keranjang belanja.
- **Read**: Pelanggan memantau status pembuatan pesanan secara visual (Queued ➔ Grinding ➔ Extracting ➔ Steaming ➔ Ready) secara real-time.
- **Update**: Mengubah detail pesanan, mengedit item belanja di modal barista, atau mempercepat progres penyeduhan secara manual.
- **Delete**: Membatalkan pesanan yang sedang aktif di antrean atau menghapus riwayat transaksi pesanan selesai.

## ☕ 2. Menu Artisan (CRUD Menu Produk)
- **Create**: Ditambahkan tombol **Kelola Menu** untuk admin. Ketika aktif, admin dapat mengklik tombol **Tambah Menu** dan mengisi form modal nama, harga, deskripsi, kalori, badge, dan gambar produk.
- **Read**: Pelanggan mencari produk lewat kolom pencarian atau menyaring berdasarkan kategori menu.
- **Update**: Mengedit item produk secara langsung lewat tombol edit pada kartu menu ketika dalam mode admin.
- **Delete**: Menghapus item produk menu dari database lokal.

## 🧪 3. Lab Kopi DIY / Drink Builder (CRUD Resep Kustom)
- **Create**: Menyimpan kombinasi racikan kopi kustom (dasar, susu, sirup, topping, dan ratio) dengan nama unik lewat tombol **Simpan Resep**.
- **Read**: Menampilkan seluruh resep tersimpan di panel bawah, lengkap dengan tombol **Gunakan** untuk langsung memuat racikan tersebut ke visualizer gelas.
- **Update**: Mengubah nama resep tersimpan via prompt popup.
- **Delete**: Menghapus resep tersimpan dari daftar favorit.

## 🎟️ 4. Loyalty Program & Anggota (CRUD Member Club)
- **Create**: Mendaftarkan anggota baru program loyalitas (stamps digital) dengan nama lengkap, jumlah stamps awal, dan total pesanan.
- **Read**: Memilih salah satu anggota sebagai profil aktif agar stamp hasil pembelian checkout otomatis terakumulasi ke profil tersebut.
- **Update**: Mengubah profil nama anggota atau mengedit jumlah stamp/pesanan secara manual.
- **Delete**: Menghapus profil keanggotaan dari daftar.

---

# 🎨 UI Features

- 🌈 Animated Glassmorphism Layout
- ✨ Dark & Gold Luxury Theme (Midnight Theme)
- 🌓 Light / Dark Mode Theme Toggle
- ⏳ Loading Screen / Splash Screen Animation dengan logo Coffee berdenyut
- 📱 Responsive Design (Desktop & Mobile)
- ☕ Visual Cup & Steaming Milk Animation untuk melacak kemajuan pembuatan pesanan dengan countdown timer
- 🎨 DIY Interactive Drink Builder Cup Layering Visualizer

---

# 🔍 Additional Features

- 🔎 Search Menu (Mencari minuman atau kue segar di Menu Grid)
- 🗂️ Filter Category (Menyaring menu berdasarkan Klasik Espresso, Cold Brew, Khas/Signatures, Teh Artisan, dan Kue Segar)
- ☕ DIY Coffee Lab (Membangun minuman kustom sendiri dengan memilih base, susu, sirup, topping, dan mengatur rasio cairan secara dinamis)
- 🎟️ Loyalty Program (Kartu stamp digital berbasis LocalStorage; dapat 1 stamp per minuman, dapat 1 voucher gratis setelah mengumpulkan 9 stamp)
- 💾 LocalStorage Database (Menyimpan riwayat keranjang, status loyalitas, total pesanan, profil user, dan daftar pesanan secara otomatis)
- ⚡ Auto Save Data
- 💡 Animated Hover Effects & Smooth Transitions

---

# 📂 Skema Struktur Data

## 📦 Order (Transaksi Pesanan)

```js
{
  id: string,          // e.g., 'ord_1717500000000'
  customerName: string,
  orderType: string,   // 'dine-in' | 'takeaway'
  tableNumber: string, // Nomor meja (jika dine-in)
  paymentMethod: string, // 'cash' | 'e-wallet' | 'card'
  items: Array<OrderItem>,
  subtotal: number,
  tax: number,         // Pajak PB1 10%
  totalPrice: number,
  status: string,      // 'Queued' | 'Grinding' | 'Extracting' | 'Steaming' | 'Ready' | 'Completed'
  timestamp: string,   // ISO String
  stepIndex: number,   // 0 - 4
  progressPercent: number
}
```

## 📦 OrderItem (Detail Minuman Pesanan)

```js
{
  id: string,
  itemId: string,     // ID Menu (e.g. 'm1') atau 'diy_beverage'
  name: string,
  basePrice: number,
  finalPrice: number,
  quantity: number,
  details: {
    size: string,
    milk?: string,
    sweetness?: string,
    ice?: string,
    warmed?: string,
    addons?: Array<string>
  },
  specialNotes?: string
}
```

## 📦 MenuItem (Katalog Menu Toko)

```js
{
  id: string,
  name: string,
  description: string,
  price: number,
  category: string,   // 'espresso' | 'signatures' | 'cold brew' | 'tea' | 'pastries'
  calories: number,
  badge?: string,
  image: string
}
```

## 📦 Member (Profil Anggota Loyalitas)

```js
{
  id: string,          // e.g., 'm_1717500000000'
  name: string,
  loyaltyPoints: number, // Stamps
  totalOrders: number
}
```

## 📦 CustomRecipe (Resep Kustom DIY)

```js
{
  id: string,          // e.g., 'recipe_1717500000000'
  name: string,
  base: string,        // 'espresso' | 'coldbrew' | 'matcha'
  milk: string,
  syrup: string,
  topping: string,
  baseRatio: number,
  milkRatio: number,
  syrupRatio: number,
  price: number
}
```

---

# 📂 Struktur Folder

```txt
src/
│
├── assets/
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
│
├── components/
│   ├── CartDrawer.jsx
│   ├── CustomizationModal.jsx
│   ├── DrinkBuilder.jsx
│   ├── Header.jsx
│   ├── LoyaltyTracker.jsx
│   ├── MenuGrid.jsx
│   ├── OrderHistory.jsx
│   └── OrderManager.jsx
│
├── App.css
├── App.jsx
├── index.css
├── main.jsx
│
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

# 🌐 Deploy

🔗 Vercel  
https://caffeine-co.vercel.app/

---

# 🛠️ Built With

- React JS
- Vite
- CSS3 (Vanilla CSS with Custom Design Tokens)
- LocalStorage API
- Lucide React (Icons)
