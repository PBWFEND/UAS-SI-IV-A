import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { formatRupiah } from './MenuGrid';

const BASES = [
  { id: 'espresso', name: 'Espresso Khas', price: 25000, color: '#3b2314', desc: 'Shot espresso ganda yang kuat dan mantap' },
  { id: 'coldbrew', name: 'Cold Brew Artisan', price: 30000, color: '#1a0f0a', desc: 'Diseduh dingin perlahan, halus alami' },
  { id: 'matcha', name: 'Matcha Upacara (Uji)', price: 35000, color: '#4d7c0f', desc: 'Matcha Uji gilingan batu dengan rasa khas' }
];

const MILKS = [
  { id: 'whole', name: 'Susu Murni (Whole)', price: 0, color: '#fbfaf7', desc: 'Susu hewani klasik yang gurih & berlemak' },
  { id: 'oat', name: 'Susu Oat', price: 8000, color: '#ece5d3', desc: 'Susu nabati manis dengan rasa oat gurih' },
  { id: 'almond', name: 'Susu Almond', price: 7000, color: '#f3ede2', desc: 'Rasa kacang panggang yang ringan' },
  { id: 'none', name: 'Tanpa Susu (Hitam)', price: 0, color: 'transparent', desc: 'Menjaga rasa kopi tetap murni' }
];

const SYRUPS = [
  { id: 'vanilla', name: 'Vanilla Bean', price: 5000, color: '#fef3c7' },
  { id: 'caramel', name: 'Karamel Asin', price: 5000, color: '#b45309' },
  { id: 'hazelnut', name: 'Hazelnut Panggang', price: 5000, color: '#d97706' },
  { id: 'none', name: 'Tanpa Sirup', price: 0, color: 'transparent' }
];

const TOPPINGS = [
  { id: 'whipped', name: 'Whipped Cream', price: 6000, color: '#ffffff', desc: 'Lapisan busa krim manis di atas' },
  { id: 'drizzle', name: 'Siraman Karamel', price: 4000, color: '#b45309', desc: 'Pola silang saus karamel lezat' },
  { id: 'ice', name: 'Es Batu Dingin', price: 0, color: '#e0f2fe', desc: 'Menjaga kopi tetap dingin & segar' },
  { id: 'none', name: 'Tanpa Topping', price: 0, color: 'transparent', desc: 'Biarkan seduhan tetap polos' }
];

export default function DrinkBuilder({ onAddToCart }) {
  const [customName, setCustomName] = useState("Seduhan Spesial Della");
  
  // Selections
  const [selectedBase, setSelectedBase] = useState('espresso');
  const [selectedMilk, setSelectedMilk] = useState('whole');
  const [selectedSyrup, setSelectedSyrup] = useState('none');
  const [selectedTopping, setSelectedTopping] = useState('none');

  // Ratios (Total 100%)
  const [baseRatio, setBaseRatio] = useState(50);
  const [milkRatio, setMilkRatio] = useState(40);
  const [syrupRatio, setSyrupRatio] = useState(10);
  
  // Animation Triggers
  const [isPouring, setIsPouring] = useState(false);

  // Sync ratios if black coffee or no sweetener selected
  useEffect(() => {
    let base = 50;
    let milk = 40;
    let syrup = 10;

    if (selectedMilk === 'none') {
      base = 80;
      milk = 0;
      syrup = 20;
    }
    if (selectedSyrup === 'none') {
      syrup = 0;
      if (selectedMilk === 'none') {
        base = 100;
      } else {
        base = 60;
        milk = 40;
      }
    }

    setBaseRatio(base);
    setMilkRatio(milk);
    setSyrupRatio(syrup);
  }, [selectedMilk, selectedSyrup]);

  // Calculate pricing
  const calculateTotal = () => {
    const basePrice = BASES.find(b => b.id === selectedBase)?.price || 0;
    const milkPrice = MILKS.find(m => m.id === selectedMilk)?.price || 0;
    const syrupPrice = SYRUPS.find(s => s.id === selectedSyrup)?.price || 0;
    const toppingPrice = TOPPINGS.find(t => t.id === selectedTopping)?.price || 0;

    return basePrice + milkPrice + syrupPrice + toppingPrice;
  };

  // Reset custom configuration
  const handleReset = () => {
    setSelectedBase('espresso');
    setSelectedMilk('whole');
    setSelectedSyrup('none');
    setSelectedTopping('none');
    setCustomName("Seduhan Spesial Della");
  };

  // Add custom brew to cart
  const handleAddCustomToCart = () => {
    setIsPouring(true);

    // Turn off pouring stream after 1.5 seconds and trigger actual cart add
    setTimeout(() => {
      setIsPouring(false);

      const baseName = BASES.find(b => b.id === selectedBase)?.name || 'Espresso';
      const milkName = MILKS.find(m => m.id === selectedMilk)?.name || 'Susu Murni';
      const syrupName = SYRUPS.find(s => s.id === selectedSyrup)?.name || 'Tidak Ada';
      const toppingName = TOPPINGS.find(t => t.id === selectedTopping)?.name || 'Tidak Ada';

      const formattedDetails = {
        size: '16 oz (DIY)',
        milk: milkName,
        sweetness: syrupName !== 'Tidak Ada' ? `Sirup ${syrupName}` : 'Tanpa Gula',
        addons: [
          `Dasar: ${baseName} (${baseRatio}%)`,
          selectedTopping !== 'none' && `Topping: ${toppingName}`
        ].filter(Boolean)
      };

      onAddToCart({
        id: `diy_${Date.now()}`,
        itemId: 'diy_beverage',
        name: customName || 'Seduhan Kustom DIY',
        basePrice: calculateTotal(),
        finalPrice: calculateTotal(),
        category: 'DIY Lab',
        details: formattedDetails,
        specialNotes: 'Dibuat di DIY Coffee Lab.'
      });
    }, 1500);
  };

  // Safe color fetching for layering
  const getBaseColor = () => BASES.find(b => b.id === selectedBase)?.color || '#3b2314';
  const getMilkColor = () => MILKS.find(m => m.id === selectedMilk)?.color || 'transparent';
  const getSyrupColor = () => SYRUPS.find(s => s.id === selectedSyrup)?.color || 'transparent';
  const getToppingColor = () => TOPPINGS.find(t => t.id === selectedTopping)?.color || 'transparent';

  return (
    <div className="builder-page max-w-layout">
      <div className="builder-layout">
        
        {/* Visualizer Frame Col */}
        <div className="visualizer-container glass-panel">
          <div className="visualizer-deco-ring"></div>

          {/* Pouring stream liquid animation */}
          {isPouring && (
            <>
              <div 
                className="pouring-stream" 
                style={{ background: `linear-gradient(to bottom, ${getBaseColor()} 0%, ${getMilkColor() || getBaseColor()} 100%)` }}
              ></div>
              <span className="pouring-tag">
                <Sparkles />
                Menuangkan...
              </span>
            </>
          )}

          {/* Golden outline Glass Cup */}
          <div className="glass-cup">
            
            {/* Base liquid layer */}
            {baseRatio > 0 && (
              <div 
                className="liquid-layer liquid-layer-base"
                style={{ 
                  height: `${baseRatio}%`, 
                  background: `linear-gradient(to top, ${getBaseColor()}, rgba(0,0,0,0.25))` 
                }}
              >
                {baseRatio > 15 && `${baseRatio}% Dasar`}
              </div>
            )}

            {/* Milk liquid layer */}
            {milkRatio > 0 && selectedMilk !== 'none' && (
              <div 
                className="liquid-layer liquid-layer-milk"
                style={{ 
                  height: `${milkRatio}%`,
                  background: `linear-gradient(to top, ${getMilkColor()}, #ffffff)`
                }}
              >
                {milkRatio > 15 && `${milkRatio}% Susu`}
              </div>
            )}

            {/* Syrup liquid layer */}
            {syrupRatio > 0 && selectedSyrup !== 'none' && (
              <div 
                className="liquid-layer liquid-layer-syrup"
                style={{ 
                  height: `${syrupRatio}%`,
                  background: `linear-gradient(to top, ${getSyrupColor()}, rgba(255,255,255,0.1))`
                }}
              >
                {syrupRatio > 10 && `${syrupRatio}% Sirup`}
              </div>
            )}

            {/* Extras/Toppings float layer */}
            {selectedTopping !== 'none' && selectedTopping !== 'ice' && (
              <div 
                className="liquid-layer liquid-layer-topping"
                style={{ 
                  height: '25px',
                  background: `linear-gradient(to top, ${getToppingColor()}, #ffffff)`,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0
                }}
              >
                Topping
              </div>
            )}

            {/* Ice cubes visualization overlay */}
            {selectedTopping === 'ice' && (
              <div className="layer-ice"></div>
            )}

          </div>

          <div className="glass-coaster"></div>

          {/* Custom Description Text */}
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="builder-name-input"
              placeholder="Beri nama minuman..."
            />
            <div className="builder-ratio-lbl">
              Rasio: {baseRatio}% Dasar / {milkRatio}% Susu / {syrupRatio}% Sirup
            </div>
            <div className="builder-total-price">
              {formatRupiah(calculateTotal())}
            </div>
          </div>
        </div>

        {/* Options Input Selection Col */}
        <div className="options-panel">
          
          {/* Base Selection */}
          <div className="option-section-card glass-panel">
            <div className="option-section-title-row">
              <h3>1. Dasar Artisan</h3>
              <span className="option-section-subtitle">Pilih konsentrasi minuman utama</span>
            </div>
            <div className="bases-grid">
              {BASES.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setSelectedBase(b.id)}
                  className={`base-option-card ${selectedBase === b.id ? 'active' : ''}`}
                >
                  <div className="base-option-card-header">
                    <span className="base-lbl">{b.name}</span>
                    <span className="base-val">{formatRupiah(b.price)}</span>
                  </div>
                  <p className="base-desc">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Milk Selection */}
          <div className="option-section-card glass-panel">
            <div className="option-section-title-row">
              <h3>2. Opsi Susu</h3>
              <span className="option-section-subtitle">Susu nabati atau hewani</span>
            </div>
            <div className="milks-grid">
              {MILKS.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMilk(m.id)}
                  className={`milk-builder-card ${selectedMilk === m.id ? 'active' : ''}`}
                >
                  <div className="milk-builder-card-header">
                    <span className="milk-b-lbl">{m.name}</span>
                    {m.price > 0 && (
                      <span className="milk-b-val">+{formatRupiah(m.price)}</span>
                    )}
                  </div>
                  <p className="milk-b-desc">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Syrups Selection */}
          <div className="option-section-card glass-panel">
            <div className="option-section-title-row">
              <h3>3. Infusi Sirup</h3>
              <span className="option-section-subtitle">Pemberi rasa manis kustom</span>
            </div>
            <div className="syrups-grid">
              {SYRUPS.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedSyrup(s.id)}
                  className={`syrup-builder-card ${selectedSyrup === s.id ? 'active' : ''}`}
                >
                  <div className="syrup-b-lbl">{s.name}</div>
                  {s.price > 0 && (
                    <span className="syrup-b-val">+{formatRupiah(s.price)}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Toppings Selection */}
          <div className="option-section-card glass-panel">
            <div className="option-section-title-row">
              <h3>4. Topping & Es</h3>
              <span className="option-section-subtitle">Tambahan es batu & krim kocok</span>
            </div>
            <div className="toppings-grid">
              {TOPPINGS.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTopping(t.id)}
                  className={`topping-builder-card ${selectedTopping === t.id ? 'active' : ''}`}
                >
                  <div className="topping-builder-card-header">
                    <span className="topping-b-lbl">{t.name}</span>
                    {t.price > 0 && (
                      <span className="topping-b-val">+{formatRupiah(t.price)}</span>
                    )}
                  </div>
                  <p className="topping-b-desc">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions button group */}
          <div className="builder-actions">
            <button
              onClick={handleReset}
              className="btn-outline"
              disabled={isPouring}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Atur Ulang Lab
            </button>
            <button
              onClick={handleAddCustomToCart}
              className="btn-gold"
              disabled={isPouring}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Masukkan seduhan ke Bag
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
