import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsSummary from './components/StatsSummary';
import FilterBar from './components/FilterBar';
import MenuList from './components/MenuList';
import MenuForm from './components/MenuForm';
import './App.css';

const initialData = [
  { id: "1", name: "Nasi Goreng Spesial", category: "Makanan", price: 25000, status: "Tersedia", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60" }, 
  { id: "2", name: "Chicken Steak Panggang", category: "Makanan", price: 35000, status: "Tersedia", image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&auto=format&fit=crop&q=60" }, 
  { id: "3", name: "Es Teh Manis", category: "Minuman", price: 5000, status: "Tersedia", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&auto=format&fit=crop&q=60" }, 
  { id: "4", name: "Pizza", category: "Makanan", price: 40000, status: "Habis", image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500&auto=format&fit=crop&q=60" },
  { id: "5", name: "Jus Jeruk", category: "Minuman", price: 15000, status: "Habis", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&auto=format&fit=crop&q=60" },
  { id: "6", name: "Kopi", category: "Minuman", price: 20000, status: "Tersedia", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=60" }
];


function App() {
  // Persistensi Data dengan localStorage
  const [menus, setMenus] = useState(() => {
    const savedMenus = localStorage.getItem('resto_menus');
    return savedMenus ? JSON.parse(savedMenus) : initialData;
  });

  // State untuk Filter & Pencarian Real-time
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua Kategori');
  const [filterStatus, setFilterStatus] = useState('Semua Status');

  // State untuk Kontrol Form (Tambah / Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null); // Jika berisi object, berarti sedang MODE EDIT

  // Sinkronisasi dengan localStorage menggunakan useEffect
  useEffect(() => {
    localStorage.setItem('resto_menus', JSON.stringify(menus));
  }, [menus]);

  // Handler CRUD: CREATE & UPDATE
  const handleSaveMenu = (menuData) => {
    if (currentMenu) {
      // Logic UPDATE (Edit)
      setMenus(menus.map(item => item.id === currentMenu.id ? { ...item, ...menuData } : item));
    } else {
      // Logic CREATE (Tambah Baru)
      const newMenu = {
        id: String(+new Date()),
        ...menuData,
        image: menuData.category === 'Makanan' 
          ? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500" 
          : "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=500"
      };
      setMenus([newMenu, ...menus]);
    }
    handleCloseForm();
  };

  // Handler CRUD: DELETE dengan window.confirm()
  const handleDeleteMenu = (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus menu ini secara permanen?");
    if (confirmDelete) {
      setMenus(menus.filter(item => item.id !== id));
    }
  };

  // Handler untuk memicu Mode Edit
  const handleEditClick = (menu) => {
    setCurrentMenu(menu);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setCurrentMenu(null);
  };

  // Logika Filter & Search Real-time (READ)
  const filteredMenus = menus.filter(menu => {
    const matchesSearch = menu.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'Semua Kategori' || menu.category === filterCategory;
    const matchesStatus = filterStatus === 'Semua Status' || menu.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <main className="main-content">
        <Header onAddMenuClick={() => { setCurrentMenu(null); setIsFormOpen(true); }} />
        
        <FilterBar 
          search={search} setSearch={setSearch}
          filterCategory={filterCategory} setFilterCategory={setFilterCategory}
          filterStatus={filterStatus} setFilterStatus={setFilterStatus}
        />

        <div className="content-layout">
          <div className="menu-section">
            <MenuList 
              menus={filteredMenus} 
              onEditClick={handleEditClick} 
              onDeleteClick={handleDeleteMenu} 
            />
          </div>

          <div className="side-section">
            {isFormOpen && (
              <MenuForm 
                onSave={handleSaveMenu} 
                onClose={handleCloseForm} 
                currentMenu={currentMenu} 
              />
            )}
            <StatsSummary menus={menus} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;