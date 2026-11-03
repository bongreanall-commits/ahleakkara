import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Check } from 'lucide-react';

export default function StorePickerModal() {
  const { 
    isStorePickerOpen, 
    closeStorePicker, 
    setSelectedStore, 
    selectedStore 
  } = useStore();

  const [activeChoice, setActiveChoice] = useState(
    selectedStore !== 'all' ? selectedStore : 'uniqlo_jp'
  );

  if (!isStorePickerOpen) return null;

  const stores = [
    {
      id: 'gu_jp',
      name: 'GU',
      sublabel: 'Japan',
      bgLogo: 'bg-[#002B7F]',
      textColor: 'text-[#FCD206]'
    },
    {
      id: 'uniqlo_jp',
      name: 'UNIQLO',
      sublabel: 'Japan',
      bgLogo: 'bg-[#ED1D24]',
      textColor: 'text-white'
    },
    {
      id: 'uniqlo_vn',
      name: 'UNIQLO',
      sublabel: 'VIETNAM',
      bgLogo: 'bg-[#ED1D24]',
      textColor: 'text-white'
    }
  ];

  const handleSelectStore = (storeId) => {
    setActiveChoice(storeId);
    setSelectedStore(storeId);
  };

  const handleConfirmStore = (storeId = activeChoice) => {
    setSelectedStore(storeId);
    closeStorePicker();
    // Scroll directly to the in-stock items from that store
    setTimeout(() => {
      const el = document.getElementById('catalog-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const activeStoreObj = stores.find(s => s.id === activeChoice) || stores[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeStorePicker}
      />

      {/* Modal Card - Exact Match to Image 2 */}
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={closeStorePicker}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Heading matching Image 2: "Choose your Favorite Store" */}
        <div className="text-center mb-8 pt-3">
          <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight font-sans">
            Choose your Favorite Store
          </h2>
        </div>

        {/* 3 Store Cards matching Image 2: GU Japan | UNIQLO Japan | UNIQLO VIETNAM */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-7">
          {stores.map((store) => {
            const isSelected = activeChoice === store.id;
            return (
              <button
                key={store.id}
                type="button"
                onClick={() => handleSelectStore(store.id)}
                onDoubleClick={() => handleConfirmStore(store.id)}
                className={`relative flex flex-col items-center justify-center py-4 px-2 rounded-xl transition-all duration-200 cursor-pointer ${
                  isSelected 
                    ? 'border-2 border-red-600 bg-red-50/20 shadow-sm' 
                    : 'border border-gray-300 hover:border-gray-400 bg-white'
                }`}
              >
                {/* Store Logo Block */}
                <div className={`w-14 h-10 sm:w-16 sm:h-12 rounded flex items-center justify-center shadow-xs ${store.bgLogo} ${store.textColor}`}>
                  {store.id === 'gu_jp' ? (
                    <span className="font-black text-xl tracking-tight">GU</span>
                  ) : (
                    <div className="text-[10px] font-black leading-none text-center">
                      UNI<br />QLO
                    </div>
                  )}
                </div>

                {/* Country Sublabel matching Image 2 ("Japan" or "VIETNAM") */}
                <span className="mt-2 text-sm sm:text-base font-medium text-gray-900 tracking-tight">
                  {store.sublabel}
                </span>

                {/* Active Checkmark */}
                {isSelected && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-0.5 shadow">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* RED PILL BUTTON AT BOTTOM - Exact match to Image 2:
            "👆 ចុចទីនេះដើម្បីបើក • Tap here to open [Store Name]
             ⚡ Order faster • 🚚 track orders" 
            (Bottom text removed as requested) */}
        <div>
          <button
            type="button"
            onClick={() => handleConfirmStore(activeChoice)}
            className="w-full bg-[#ED1D24] hover:bg-red-700 text-white rounded-2xl py-3.5 px-4 shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col items-center justify-center text-center group cursor-pointer"
          >
            {/* Top Line in Khmer & English */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-tight">
              <span>👆 ចុចទីនេះដើម្បីបើក</span>
              <span>•</span>
              <span>Tap here to open {activeStoreObj.name} {activeStoreObj.sublabel}</span>
            </div>

            {/* Subline with emoji tags */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-white/90 font-medium mt-0.5">
              <span>⚡ Order faster</span>
              <span>•</span>
              <span>🚚 track orders</span>
            </div>
          </button>
        </div>

      </div>
    </div>
  );
}
