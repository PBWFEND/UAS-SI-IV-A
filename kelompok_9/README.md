# 💄 Blush & Bloom

Aplikasi ini dikembangkan untuk memenuhi tugas UAS Mata Kuliah Pemrograman Berbasis Web.  
**Blush & Bloom** merupakan aplikasi manajemen produk kecantikan berbasis **React + Vite** dengan tampilan modern aesthetic glassmorphism bernuansa pink dan ungu gradient.

---

# 👨‍💻 Developer

1. Della Kartika — 240160221008  
2. Fauzan Zainul Arifin — 240160221014  
3. Nur Octaviani Tri Wulandari — 240160221032  

---

# ✨ Fitur Aplikasi (CRUD)

## 📦 Product Management
- ➕ Tambah Product
- 👀 Lihat daftar Product
- ✏️ Edit Product
- 🗑️ Hapus Product

## 📁 Category Management
- ➕ Tambah Category
- 👀 Lihat daftar Category
- ✏️ Edit Category
- 🗑️ Hapus Category

## 💖 Brand Management
- ➕ Tambah Brand
- 👀 Lihat daftar Brand
- ✏️ Edit Brand
- 🗑️ Hapus Brand

---

# 🎨 UI Features

- 🌈 Animated Gradient Background
- ✨ Glassmorphism UI
- 💎 Pink & Purple Modern Theme
- 📊 Dashboard Statistics
- 📈 Mini Growth Chart
- 🔔 Toast Notification
- ⏳ Loading Screen Animation
- 📱 Responsive Design

---

# 🔍 Additional Features

- 🔎 Search Product
- 🗂️ Filter Category
- 💖 Filter Brand
- 💾 LocalStorage Database
- ⚡ Auto Save Data
- ✨ Animated Hover Effects

---

# 🧠 Struktur Data

## 📦 Product

```js
{
  id: number,
  name: string,
  price: number,
  image: string,
  category: string,
  brand: string
}

## 📁 Category

```js
{
  id: number,
  name: string
}
```

---

## 💖 Brand

```js
{
  id: number,
  name: string
}
```

---

# 📂 Struktur Folder

```txt
src/
│
├── assets/
│   └── blooshBlomm.jpeg
│
├── components/
│
│   ├── brand/
│   │   ├── BrandForm.jsx
│   │   └── BrandList.jsx
│
│   ├── categories/
│   │   ├── CategoryForm.jsx
│   │   └── CategoryList.jsx
│
│   ├── layout/
│   │   └── Sidebar.jsx
│
│   ├── loading/
│   │   └── LoadingScreen.jsx
│
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── ProductPage.jsx
│   │   ├── CategoryPage.jsx
│   │   └── BrandPage.jsx
│
│   ├── product/
│   │   ├── ProductCard.jsx
│   │   ├── ProductForm.jsx
│   │   └── ProductList.jsx
│
│   ├── stats/
│   │   ├── StatsCard.jsx
│   │   └── StatsSection.jsx
│
│   ├── Navbar.jsx
│   └── SearchBar.jsx
│
├── App.css
├── App.jsx
├── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

# 🌐 Deploy

🔗 Vercel  
https://blushandbloom-pi.vercel.app/

---

# 🛠️ Built With

- React JS
- Vite
- CSS3
- LocalStorage API

---



