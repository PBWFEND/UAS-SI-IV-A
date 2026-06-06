import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { formatRupiah } from './MenuGrid';

export default function CustomizationModal({ item, onClose, onAddToCart }) {
  const isPastry = item.category === 'pastries';

  // Customizable state defaults
  const [selectedSize, setSelectedSize] = useState('grande');
  const [selectedMilk, setSelectedMilk] = useState('whole');
  const [sweetness, setSweetness] = useState('100');
  const [iceLevel, setIceLevel] = useState('normal');
  const [extraShot, setExtraShot] = useState(false);
  const [whippedCream, setWhippedCream] = useState(false);
  const [caramelDrizzle, setCaramelDrizzle] = useState(false);
  const [specialNotes, setSpecialNotes] = useState('');
  
  // Pastry specific options
  const [heatUp, setHeatUp] = useState(false);

  // Configuration options details (Rupiah prices)
  const sizeOptions = [
    { id: 'tall', name: 'Tall', volume: '12 oz', priceDelta: -5000 },
    { id: 'grande', name: 'Grande', volume: '16 oz', priceDelta: 0 },
    { id: 'venti', name: 'Venti', volume: '20 oz', priceDelta: 7000 }
  ];

  const milkOptions = [
    { id: 'whole', name: 'Susu Murni (Whole)', priceDelta: 0 },
    { id: 'oat', name: 'Susu Oat', priceDelta: 8000 },
    { id: 'almond', name: 'Susu Almond', priceDelta: 7000 },
    { id: 'soy', name: 'Susu Kedelai', priceDelta: 5000 }
  ];

  // Pricing formula
  const getSizeDelta = () => {
    if (isPastry) return 0;
    const option = sizeOptions.find(o => o.id === selectedSize);
    return option ? option.priceDelta : 0;
  };

  const getMilkDelta = () => {
    if (isPastry || selectedMilk === 'whole') return 0;
    const option = milkOptions.find(o => o.id === selectedMilk);
    return option ? option.priceDelta : 0;
  };

  const getExtrasDelta = () => {
    let delta = 0;
    if (extraShot) delta += 10000;
    if (whippedCream) delta += 5000;
    if (caramelDrizzle) delta += 4000;
    return delta;
  };

  const calculateTotalPrice = () => {
    return item.price + getSizeDelta() + getMilkDelta() + getExtrasDelta();
  };

  const handleAddClick = () => {
    const formattedDetails = isPastry ? {
      warmed: heatUp ? 'Dihangatkan' : 'Suhu Ruangan'
    } : {
      size: sizeOptions.find(o => o.id === selectedSize)?.name || 'Grande',
      milk: milkOptions.find(o => o.id === selectedMilk)?.name || 'Susu Murni (Whole)',
      sweetness: `${sweetness}% Kemanisan`,
      ice: `${iceLevel === 'normal' ? 'Es Standar' : iceLevel === 'extra' ? 'Ekstra Es' : iceLevel === 'less' ? 'Kurang Es' : 'Tanpa Es'}`,
      addons: [
        extraShot && `Tambahan Espresso Shot (+${formatRupiah(10000)})`,
        whippedCream && `Whipped Cream (+${formatRupiah(5000)})`,
        caramelDrizzle && `Siraman Karamel Asap (+${formatRupiah(4000)})`
      ].filter(Boolean)
    };

    onAddToCart({
      id: `${item.id}_${Date.now()}`,
      itemId: item.id,
      name: item.name,
      basePrice: item.price,
      finalPrice: calculateTotalPrice(),
      category: item.category,
      details: formattedDetails,
      specialNotes: specialNotes.trim()
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box glass-panel">
        
        {/* Header section */}
        <div className="modal-header">
          <div>
            <h3 className="modal-title">{item.name}</h3>
            <p className="modal-subtitle">Sesuaikan preferensi minuman artisan Anda</p>
          </div>
          <button 
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Tutup"
          >
            <X />
          </button>
        </div>

        {/* Customization Options Body */}
        <div className="modal-body">
          
          {isPastry ? (
            /* Pastry Options */
            <div>
              <h4 className="selector-label">Opsi Toko Roti (Bakery)</h4>
              <div className="addons-stack">
                <button
                  type="button"
                  onClick={() => setHeatUp(!heatUp)}
                  className={`addon-row-btn ${heatUp ? 'active' : ''}`}
                >
                  <div className="addon-label-group">
                    <div className="custom-checkbox">
                      {heatUp && <Check />}
                    </div>
                    <span>Hangatkan kue / pastry</span>
                  </div>
                  <span className="addon-row-price">Gratis</span>
                </button>
              </div>
            </div>
          ) : (
            /* Drink Options */
            <>
              {/* Size Selectors */}
              <div>
                <h4 className="selector-label">Pilih Ukuran Gelas</h4>
                <div className="size-selector-grid">
                  {sizeOptions.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedSize(opt.id)}
                      className={`size-option-card ${selectedSize === opt.id ? 'active' : ''}`}
                    >
                      <div className="size-name">{opt.name}</div>
                      <div className="size-vol">{opt.volume}</div>
                      <div className="size-price">
                        {opt.priceDelta > 0 ? '+' : opt.priceDelta < 0 ? '-' : ''}
                        {formatRupiah(Math.abs(opt.priceDelta))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milk Options */}
              {item.category !== 'tea' && (
                <div>
                  <h4 className="selector-label">Pilihan Susu</h4>
                  <div className="milk-selector-grid">
                    {milkOptions.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setSelectedMilk(opt.id)}
                        className={`milk-option-card ${selectedMilk === opt.id ? 'active' : ''}`}
                      >
                        <span className="milk-name">{opt.name}</span>
                        {opt.priceDelta > 0 && (
                          <span className="milk-price">+{formatRupiah(opt.priceDelta)}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sliders / Dropdowns row */}
              <div className="sliders-row">
                <div>
                  <h4 className="selector-label">Tingkat Kemanisan</h4>
                  <select
                    value={sweetness}
                    onChange={(e) => setSweetness(e.target.value)}
                    className="custom-select"
                  >
                    <option value="120">Sangat Manis (120%)</option>
                    <option value="100">Manis Standar (100%)</option>
                    <option value="70">Kurang Manis (70%)</option>
                    <option value="50">Setengah Manis (50%)</option>
                    <option value="30">Sedikit Manis (30%)</option>
                    <option value="0">Tanpa Gula (0%)</option>
                  </select>
                </div>

                <div>
                  <h4 className="selector-label">Tingkat Es</h4>
                  <select
                    value={iceLevel}
                    onChange={(e) => setIceLevel(e.target.value)}
                    className="custom-select"
                  >
                    <option value="extra">Ekstra Es</option>
                    <option value="normal">Es Standar</option>
                    <option value="less">Kurang Es</option>
                    <option value="none">Tanpa Es (Hangat)</option>
                  </select>
                </div>
              </div>

              {/* Addons checkbox stack */}
              <div>
                <h4 className="selector-label">Tambahan Minuman (Add-ons)</h4>
                <div className="addons-stack">
                  
                  {/* Espresso shot */}
                  <button
                    type="button"
                    onClick={() => setExtraShot(!extraShot)}
                    className={`addon-row-btn ${extraShot ? 'active' : ''}`}
                  >
                    <div className="addon-label-group">
                      <div className="custom-checkbox">
                        {extraShot && <Check />}
                      </div>
                      <span>Tambahan Espresso Shot</span>
                    </div>
                    <span className="addon-row-price">+{formatRupiah(10000)}</span>
                  </button>

                  {/* Whipped Cream */}
                  <button
                    type="button"
                    onClick={() => setWhippedCream(!whippedCream)}
                    className={`addon-row-btn ${whippedCream ? 'active' : ''}`}
                  >
                    <div className="addon-label-group">
                      <div className="custom-checkbox">
                        {whippedCream && <Check />}
                      </div>
                      <span>Topping Whipped Cream</span>
                    </div>
                    <span className="addon-row-price">+{formatRupiah(5000)}</span>
                  </button>

                  {/* Caramel Drizzle */}
                  <button
                    type="button"
                    onClick={() => setCaramelDrizzle(!caramelDrizzle)}
                    className={`addon-row-btn ${caramelDrizzle ? 'active' : ''}`}
                  >
                    <div className="addon-label-group">
                      <div className="custom-checkbox">
                        {caramelDrizzle && <Check />}
                      </div>
                      <span>Siraman Karamel Asap</span>
                    </div>
                    <span className="addon-row-price">+{formatRupiah(4000)}</span>
                  </button>

                </div>
              </div>
            </>
          )}

          {/* Notes input */}
          <div>
            <h4 className="selector-label">Catatan khusus untuk barista</h4>
            <textarea
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="Contoh: Sangat panas, tulis 'Semoga hari Anda menyenangkan' di gelas, riwayat alergi..."
              className="custom-textarea"
            />
          </div>

        </div>

        {/* Modal Checkout Footer */}
        <div className="modal-footer">
          <div>
            <span className="modal-price-label">Estimasi Harga</span>
            <div className="modal-price-val">
              {formatRupiah(calculateTotalPrice())}
            </div>
          </div>

          <button
            onClick={handleAddClick}
            className="btn-gold modal-add-btn"
          >
            Tambahkan ke Pesanan
          </button>
        </div>

      </div>
    </div>
  );
}
