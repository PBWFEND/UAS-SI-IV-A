# ☕ Caffeine & Co.

Aplikasi ini dikembangkan untuk memenuhi tugas UAS Mata Kuliah Pemrograman Berbasis Web.  
**Caffeine & Co.** merupakan aplikasi manajemen pemesanan kopi dan minuman artisan (Barista Dashboard) berbasis **React + Vite** dengan tampilan modern aesthetic glassmorphism bernuansa gelap-emas (dark & gold theme) yang mewah.

---

# 👨💻 Developer

1. Della Kartika — 240160221008  
2. Fauzan Zainul Arifin — 240160221014  
3. Nur Octaviani Tri Wulandari — 240160221032  

---

# ✨ Fitur Aplikasi (CRUD)

## 📋 Order Management
- ➕ Tambah Pesanan Baru (Create): Membuat transaksi pesanan secara manual oleh barista dengan detail pelanggan, cara penyajian, nomor meja, metode pembayaran, serta pilihan menu.
- 👀 Lihat Daftar Pesanan (Read): Menampilkan antrean pesanan aktif dan riwayat transaksi selesai secara visual.
- ✏️ Edit Pesanan (Update): Mengubah rincian nama pelanggan, cara penyajian, meja, metode pembayaran, item minuman, dan memperbarui status tahapan pembuatan kopi.
- 🗑️ Hapus Pesanan (Delete): Membatalkan atau menghapus transaksi pesanan dari daftar antrean secara permanen.

---

# 🎨 UI Features

- 🌈 Animated Glassmorphism Layout
- ✨ Dark & Gold Luxury Theme (Midnight Theme)
- 🌓 Light / Dark Mode Theme Toggle
- ⏳ Loading Screen / Splash Screen Animation dengan logo Coffee berdenyut
- 📱 Responsive Design (Desktop & Mobile)
- ☕ Visual Cup & Steaming Milk Animation untuk melacak kemajuan pembuatan pesanan
- 🎨 DIY Interactive Drink Builder Cup Layering Visualizer

---

# 🔍 Additional Features

- 🔎 Search Menu (Mencari minuman atau kue segar di Menu Grid)
- 🗂️ Filter Category (Menyaring menu berdasarkan Klasik Espresso, Cold Brew, Khas/Signatures, Teh Artisan, dan Kue Segar)
- ☕ DIY Coffee Lab (Membangun minuman kustom sendiri dengan memilih base, susu, sirup, topping, dan mengatur rasio cairan secara dinamis)
- 🎟️ Loyalty Program (Kartu stamp digital berbasis LocalStorage; dapat 1 stamp per minuman, dapat 1 voucher gratis setelah mengumpulkan 9 stamp)
- 💾 LocalStorage Database (Menyimpan riwayat keranjang, status loyalitas, total pesanan, profil user, dan daftar pesanan secara otomatis)
- ⚡ Auto Save Data
- ✨ Animated Hover Effects & Smooth Transitions

---

# 🧠 Struktur Data

## 📦 Order

```js
{
  id: string,          // e.g., 'ord_1717500000000'
  customerName: string,
  orderType: string,   // 'Makan di Tempat' | 'Bawa Pulang'
  tableNumber: string, // Nomor meja (jika makan di tempat)
  paymentMethod: string,
  items: Array<OrderItem>,
  subtotal: number,
  tax: number,         // Pajak PB1 11%
  totalPrice: number,
  status: string,      // 'Queued' | 'Grinding' | 'Extracting' | 'Steaming' | 'Ready' | 'Completed'
  timestamp: string,   // ISO String
  stepIndex: number,   // 0 - 4
  progressPercent: number
}
```

## 📦 OrderItem

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

## ☕ MenuItem (Menu Details)

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
