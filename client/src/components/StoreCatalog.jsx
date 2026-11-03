import React from 'react';
import { useStore } from '../context/StoreContext';
import { Plus, ArrowLeftRight } from 'lucide-react';

export default function StoreCatalog() {
  const { 
    products, 
    selectedStore, 
    setSelectedStore, 
    setSelectedProduct, 
    openStorePicker,
    currency,
    exchangeRate
  } = useStore();

  const storeTabs = [
    { id: 'uniqlo_vn', name: 'UNIQLO Vietnam', khmer: 'វៀតណាម' },
    { id: 'uniqlo_jp', name: 'UNIQLO Japan', khmer: 'ជប៉ុន' },
    { id: 'gu_jp', name: 'GU Japan', khmer: 'ហ្គីយូ ជប៉ុន' }
  ];

  // Strictly filter items to selected store only and ensure stock > 0
  const filteredProducts = products.filter(p => p.storeId === selectedStore && p.totalStock > 0);

  const formatPrice = (priceUsd) => {
    if (currency === 'KHR') {
      return `៛${(priceUsd * exchangeRate).toLocaleString()}`;
    }
    return `$${priceUsd.toFixed(0)}`;
  };

  const getStoreTitle = () => {
    if (selectedStore === 'uniqlo_vn') return 'UNIQLO Vietnam (ស្តុកផ្លូវការវៀតណាម)';
    if (selectedStore === 'gu_jp') return 'GU Japan (ស្តុកផ្លូវការតូក្យូ ជប៉ុន)';
    return 'UNIQLO Japan (ស្តុកហាងធំជប៉ុន)';
  };

  return (
    <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-20">
      
      {/* Header and Store Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#ED1D24] font-khmer">
              ទំនិញសុទ្ធ ១០០% ពីហាងផ្លូវការ
            </span>
            <span className="text-[11px] bg-green-100 text-green-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 font-khmer">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
              <span>មានស្តុកជាក់ស្តែង ({filteredProducts.length} មុខទំនិញ)</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mt-1 font-khmer">
            {getStoreTitle()}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5 font-khmer">
            បង្ហាញតែទំនិញសុទ្ធដែលមានក្នុងស្តុកសម្រាប់ដឹកជញ្ជូនរហ័សទូទាំងប្រទេសកម្ពុជា
          </p>
        </div>

        {/* Store Tabs to Switch Stores */}
        <div className="flex flex-wrap items-center gap-2">
          {storeTabs.map((tab) => {
            const isActive = selectedStore === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedStore(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                <span>{tab.name}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
              </button>
            );
          })}

          <button
            onClick={() => openStorePicker()}
            className="bg-red-50 hover:bg-red-100 text-[#ED1D24] border border-red-300 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs font-khmer"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>ប្តូរហាង (Change Store)</span>
          </button>
        </div>
      </div>

      {/* Grid of In-Stock Products strictly from selected store */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
        {filteredProducts.map((product) => {
          return (
            <div
              key={product.id}
              onClick={() => {
                setSelectedProduct(product);
              }}
              className="group cursor-pointer bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/4.5] bg-gray-100 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Top Badge */}
                {product.badge && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-[#ED1D24] text-white text-[9px] font-black px-1.5 py-0.5 rounded-xs uppercase tracking-wider shadow-xs">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Store origin badge */}
                <div className="absolute bottom-2 left-2">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-xs shadow-xs ${
                    product.storeId === 'gu_jp' ? 'bg-[#002B7F] text-[#FCD206]' : 'bg-[#ED1D24] text-white'
                  }`}>
                    {product.storeName}
                  </span>
                </div>
              </div>

              {/* Info with Khmer title */}
              <div className="p-3 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 line-clamp-1 group-hover:text-red-600 transition-colors">
                    {product.name}
                  </h4>
                  {product.nameKhmer && (
                    <div className="text-[11px] text-gray-500 font-khmer line-clamp-1 mt-0.5">
                      {product.nameKhmer}
                    </div>
                  )}
                  <span className="text-[9px] font-mono text-gray-400 block mt-1">
                    SKU: {product.sku}
                  </span>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-base font-black text-[#ED1D24]">
                        {formatPrice(product.priceUsd)}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {product.priceOriginalCurrency}
                      </div>
                    </div>

                    {/* Live stock count in Khmer */}
                    <div className="text-right">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-50 text-green-700 border border-green-200 font-khmer">
                        នៅសល់ {product.totalStock}
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    className="mt-3 w-full py-2 bg-gray-900 group-hover:bg-[#ED1D24] text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs font-khmer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ជ្រើសរើសទំហំ & កុម្ម៉ង់</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
