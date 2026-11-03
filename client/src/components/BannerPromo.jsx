import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Clock, Truck, ShoppingBag, Sparkles } from 'lucide-react';

export default function BannerPromo() {
  const { 
    products, 
    setSelectedProduct, 
    cartTotalItems, 
    isFreeDeliveryEligible,
    selectedStore,
    currency,
    exchangeRate
  } = useStore();

  // Strictly filter products by selected store
  const storeFiltered = products.filter(p => p.storeId === selectedStore);

  // Take 4 featured items strictly from this store
  const featured = storeFiltered.slice(0, 4);

  const formatPrice = (priceUsd) => {
    if (currency === 'KHR') {
      return `៛${(priceUsd * exchangeRate).toLocaleString()}`;
    }
    return `$${priceUsd.toFixed(0)}`;
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const getStoreConfig = () => {
    if (selectedStore === 'gu_jp') {
      return {
        brandName: 'GU',
        badgeTitle: 'GU JAPAN',
        badgeSubtitle: 'ហាង GU ជប៉ុន',
        // Khmer replaces only the previous Vietnamese part
        khmerSlogan1: 'ម៉ូតទាន់សម័យពីតូក្យូ សេរីភាពក្នុងការស្លៀកពាក់',
        khmerSlogan2: 'ទំនិញសុទ្ធ ១០០% នាំចូលផ្ទាល់ពីហាង GU ជប៉ុន',
        khmerSlogan3: 'គុណភាពល្អ សាច់ក្រណាត់ទន់ស្រួល ពេញនិយមនៅជប៉ុន',
        // Keep English slogans
        englishSlogan1: 'ITEMS AT REASONABLE PRICES TO MAKE YOUR EVERYDAY COMFORTABLE.',
        englishSlogan2: 'YOUR FREEDOM • GU TOKYO EXCLUSIVE SPECIAL DEALS.',
        dealsTitle: 'SPECIAL DEALS',
        dealsSubtitle: 'Refresh Your Everyday Wardrobe • ម៉ូតទាន់សម័យតូក្យូ',
        dealsDate: '23.10 ▶ 29.10',
        ribbonBrand: 'GU'
      };
    }
    if (selectedStore === 'uniqlo_vn') {
      return {
        brandName: 'UNIQLO',
        badgeTitle: 'UNIQLO VIETNAM',
        badgeSubtitle: 'ហាងធំ យូនីឃ្ល័រ វៀតណាម',
        // Khmer replaces only the previous Vietnamese text
        khmerSlogan1: 'ផលិតផលតម្លៃសមរម្យ ផ្តល់ផាសុកភាពជូនអ្នករាល់ថ្ងៃ',
        khmerSlogan2: 'ទំនិញសុទ្ធ ១០០% នាំចូលផ្ទាល់ពីរោងចក្រ និងហាងផ្លូវការ',
        khmerSlogan3: 'ម៉ូត LifeWear គុណភាពខ្ពស់ ផ្តល់ផាសុកភាពគ្រប់ពេលវេលា',
        // Keep English slogans
        englishSlogan1: 'ITEMS AT REASONABLE PRICES TO MAKE YOUR EVERYDAY COMFORTABLE.',
        englishSlogan2: 'ITEMS AT REASONABLE PRICES TO MAKE YOUR EVERYDAY COMFORTABLE.',
        dealsTitle: 'SPECIAL DEALS',
        dealsSubtitle: 'Refresh Your Everyday Wardrobe • ម៉ូតសំលៀកបំពាក់ទាន់សម័យ',
        dealsDate: '23.10 ▶ 29.10',
        ribbonBrand: 'UNIQLO'
      };
    }
    return {
      brandName: 'UNIQLO',
      badgeTitle: 'UNIQLO JAPAN',
      badgeSubtitle: 'ហាងធំ យូនីឃ្ល័រ ជប៉ុន',
      // Khmer replaces only the previous Vietnamese text
      khmerSlogan1: 'ផលិតផលតម្លៃសមរម្យ ផ្តល់ផាសុកភាពជូនអ្នករាល់ថ្ងៃ',
      khmerSlogan2: 'ទំនិញសុទ្ធ ១០០% នាំចូលផ្ទាល់ពីហាងធំនៅជប៉ុន',
      khmerSlogan3: 'ម៉ូត LifeWear គុណភាពខ្ពស់ សាមញ្ញ ស្រស់ស្អាត និងជាប់បានយូរ',
      // Keep English slogans
      englishSlogan1: 'ITEMS AT REASONABLE PRICES TO MAKE YOUR EVERYDAY COMFORTABLE.',
      englishSlogan2: 'ITEMS AT REASONABLE PRICES TO MAKE YOUR EVERYDAY COMFORTABLE.',
      dealsTitle: 'SPECIAL DEALS',
      dealsSubtitle: 'Refresh Your Everyday Wardrobe • ម៉ូតសំលៀកបំពាក់ទាន់សម័យ',
      dealsDate: '23.10 ▶ 29.10',
      ribbonBrand: 'UNIQLO'
    };
  };

  const config = getStoreConfig();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* 2-Column Grid: items-stretch guarantees left and right columns have the exact same height */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
        
        {/* LEFT COLUMN: ENLARGED SQUARE SALE BANNER + SPECIAL DEALS + FREE DELIVERY FLUSH TO BOTTOM */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-4">
          
          {/* 1. Typographic SALE Banner - ENLARGED TO SQUARE SHAPE MATCHING IMAGE 1 */}
          <div 
            onClick={scrollToCatalog}
            className="cursor-pointer group relative overflow-hidden bg-white rounded-xl border-2 border-red-100 p-4 sm:p-6 shadow-xs hover:shadow-md transition-all flex-1 flex flex-col justify-between select-none"
            style={{ minHeight: '340px' }}
          >
            {/* Top Centered Header: SALE in red */}
            <div className="text-center pb-2 border-b border-red-50 flex items-center justify-between">
              <span className="bg-red-50 text-[#ED1D24] text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <span>{config.badgeTitle}</span>
                <span className="font-khmer text-gray-500 font-normal">({config.badgeSubtitle})</span>
              </span>
              <span className="text-[#ED1D24] text-3xl sm:text-4xl font-black tracking-widest uppercase">
                SALE
              </span>
              <span className="text-xs font-semibold text-gray-500 group-hover:text-red-600 transition-colors flex items-center gap-1">
                <span>Explore Deals</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>

            {/* Poster Typographic Pattern: Keeping English & replacing Vietnamese with Khmer */}
            <div className="py-3 flex-1 flex flex-col justify-around space-y-3">
              
              {/* Row 1: Khmer slogan (replacing VN) + Big Red SALE + English slogan (kept) + Big Red SALE */}
              <div className="flex items-center justify-between gap-2">
                <div className="w-[38%] text-red-600 font-khmer text-xs sm:text-[13px] font-bold leading-tight">
                  {config.khmerSlogan1}
                </div>
                <div className="text-2xl sm:text-4xl font-black text-[#ED1D24] tracking-tighter shrink-0">
                  SALE
                </div>
                <div className="w-[36%] text-gray-900 text-[10px] sm:text-[11px] font-black leading-tight uppercase">
                  {config.englishSlogan1}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#ED1D24] tracking-tighter shrink-0 hidden sm:block">
                  SALE
                </div>
              </div>

              {/* Row 2: Brand Logo Ribbon Strip [LOGO] SALE [LOGO] SALE */}
              <div className="flex items-center justify-between py-1 px-1 border-t border-b border-red-100 bg-red-50/40 text-red-600 text-xs font-black overflow-hidden whitespace-nowrap">
                <span className="bg-[#ED1D24] text-white px-2 py-0.5 text-[10px] rounded-xs font-bold">{config.ribbonBrand}</span>
                <span className="tracking-widest">SALE</span>
                <span className="bg-[#ED1D24] text-white px-2 py-0.5 text-[10px] rounded-xs font-bold">{config.ribbonBrand}</span>
                <span className="tracking-widest">SALE</span>
                <span className="bg-[#ED1D24] text-white px-2 py-0.5 text-[10px] rounded-xs font-bold">{config.ribbonBrand}</span>
                <span className="tracking-widest">SALE</span>
                <span className="bg-[#ED1D24] text-white px-2 py-0.5 text-[10px] rounded-xs font-bold">{config.ribbonBrand}</span>
                <span className="tracking-widest hidden sm:inline">SALE</span>
                <span className="bg-[#ED1D24] text-white px-2 py-0.5 text-[10px] rounded-xs font-bold hidden sm:inline">{config.ribbonBrand}</span>
              </div>

              {/* Row 3: Big Red SALE + Khmer slogan (replacing VN) + Big Red SALE + English slogan (kept) */}
              <div className="flex items-center justify-between gap-2">
                <div className="text-2xl sm:text-3xl font-black text-[#ED1D24] tracking-tighter shrink-0">
                  SALE
                </div>
                <div className="w-[40%] text-red-700 font-khmer text-xs sm:text-[13px] font-semibold leading-tight">
                  {config.khmerSlogan2}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#ED1D24] tracking-tighter shrink-0">
                  SALE
                </div>
                <div className="w-[34%] text-gray-900 text-[10px] sm:text-[11px] font-black leading-tight uppercase hidden sm:block">
                  {config.englishSlogan2}
                </div>
              </div>

              {/* Row 4: Second Brand Logo Ribbon Strip */}
              <div className="flex items-center justify-between py-1 px-1 border-t border-b border-red-100 bg-red-50/40 text-red-600 text-xs font-black overflow-hidden whitespace-nowrap">
                <span className="bg-[#ED1D24] text-white px-2 py-0.5 text-[10px] rounded-xs font-bold">{config.ribbonBrand}</span>
                <span className="tracking-widest">SALE</span>
                <span className="bg-[#ED1D24] text-white px-2 py-0.5 text-[10px] rounded-xs font-bold">{config.ribbonBrand}</span>
                <span className="tracking-widest">SALE</span>
                <span className="bg-[#ED1D24] text-white px-2 py-0.5 text-[10px] rounded-xs font-bold">{config.ribbonBrand}</span>
                <span className="tracking-widest">SALE</span>
                <span className="bg-[#ED1D24] text-white px-2 py-0.5 text-[10px] rounded-xs font-bold">{config.ribbonBrand}</span>
                <span className="tracking-widest hidden sm:inline">SALE</span>
                <span className="bg-[#ED1D24] text-white px-2 py-0.5 text-[10px] rounded-xs font-bold hidden sm:inline">{config.ribbonBrand}</span>
              </div>

              {/* Row 5: Quality Guarantee in Dual Language (EN + KH) */}
              <div className="flex items-center justify-between text-xs text-gray-600 pt-1">
                <span className="font-medium text-red-800 font-khmer">✓ {config.khmerSlogan3}</span>
                <span className="text-red-600 font-black whitespace-nowrap ml-2">
                  SPECIAL PROMO • <span className="font-khmer">បញ្ចុះតម្លៃពិសេស</span>
                </span>
              </div>

            </div>

            {/* Bottom Footer Tagline: EN + KH */}
            <div className="pt-2 border-t border-red-100 flex items-center justify-between text-[11px]">
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-red-600">
                AH LEAK x KARA OFFICIAL PROMOTION • {config.badgeTitle}
              </span>
              <span className="text-gray-600 font-medium font-khmer">ធានាទំនិញសុទ្ធ ១០០%</span>
            </div>
          </div>

          {/* LOWER SECTION: SPECIAL DEALS + YELLOW FREE DELIVERY BAR (FLUSH TO BOTTOM EDGE) */}
          <div className="space-y-3 shrink-0">
            
            {/* 2. Red SPECIAL DEALS Box - MATCHING IMAGE 1 */}
            <div 
              onClick={scrollToCatalog}
              className="cursor-pointer group relative overflow-hidden bg-[#ED1D24] text-white rounded-xl p-4 sm:p-5 shadow-xs hover:bg-[#D6181F] transition-all"
            >
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
                  SPECIAL DEALS
                </h2>
                <p className="text-xs sm:text-sm font-medium text-white/95 mt-0.5">
                  <span>Refresh Your Everyday Wardrobe</span>
                  <span className="font-khmer text-white/80 block sm:inline sm:ml-1.5">
                    • ម៉ូតសំលៀកបំពាក់ទាន់សម័យ
                  </span>
                </p>
              </div>

              {/* Date Box: 23.10 ▶ 29.10 */}
              <div className="mt-3.5 bg-white text-[#ED1D24] py-2.5 px-4 rounded-lg flex items-center justify-center gap-4 shadow-sm">
                <span className="text-2xl sm:text-3xl font-black tracking-tight">23.10</span>
                <span className="text-lg sm:text-xl font-bold text-gray-400">▶</span>
                <span className="text-2xl sm:text-3xl font-black tracking-tight">29.10</span>
              </div>
            </div>

            {/* 3. Yellow Notice Bar: Add 2 Items to Your Cart for Free Delivery (Dual EN + KH) */}
            <div 
              onClick={scrollToCatalog}
              className="cursor-pointer bg-[#FFE500] hover:bg-[#FCD206] text-black font-extrabold text-center py-3 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4 text-black shrink-0" />
              <span className="text-xs sm:text-[13px] tracking-tight font-extrabold">
                Add 2 Items to Your Cart for Free Delivery
              </span>
              <span className="text-xs font-khmer font-bold text-gray-900 hidden sm:inline">
                • ទិញ ២ មុខ ដឹកជញ្ជូនឥតគិតថ្លៃ
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ml-1 font-khmer ${
                isFreeDeliveryEligible 
                  ? 'bg-green-700 text-white animate-pulse' 
                  : 'bg-black/15 text-black'
              }`}>
                {isFreeDeliveryEligible 
                  ? '✓ Free Delivery' 
                  : `(${cartTotalItems}/2)`}
              </span>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: 2x2 PRODUCT CARDS (DUAL EN + KH, PERFECTLY ALIGNED) */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4 h-full">
          {featured.map((product) => {
            return (
              <div
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                }}
                className="group cursor-pointer bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md hover:border-red-400 transition-all duration-200 flex flex-col justify-between"
              >
                {/* Product Image & Badges */}
                <div className="relative aspect-[4/4.8] bg-gray-100 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Top-Right Badge: SALE or LIMITED */}
                  <div className="absolute top-2 right-2">
                    {product.badge === 'SALE' && (
                      <span className="bg-[#ED1D24] text-white text-[9px] font-black px-1.5 py-0.5 rounded-xs uppercase tracking-wider shadow-xs">
                        SALE
                      </span>
                    )}
                    {product.badge === 'LIMITED' && (
                      <span className="bg-[#ED1D24] text-white text-[9px] font-black px-1.5 py-0.5 rounded-xs uppercase tracking-wider shadow-xs">
                        LIMITED
                      </span>
                    )}
                    {product.badge === 'BESTSELLER' && (
                      <span className="bg-amber-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-xs uppercase tracking-wider shadow-xs">
                        HOT
                      </span>
                    )}
                    {product.badge === 'NEW' && (
                      <span className="bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-xs uppercase tracking-wider shadow-xs">
                        NEW
                      </span>
                    )}
                  </div>

                  {/* Store Watermark Tag */}
                  <div className="absolute bottom-2 left-2">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-xs shadow-xs ${
                      product.storeId === 'gu_jp' ? 'bg-[#002B7F] text-[#FCD206]' : 'bg-[#ED1D24] text-white'
                    }`}>
                      {product.storeName}
                    </span>
                  </div>
                </div>

                {/* Product Info in Both EN and KH */}
                <div className="p-2.5 sm:p-3 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    {/* English Title as Primary */}
                    <h3 className="text-xs sm:text-[13px] font-bold text-gray-900 line-clamp-1 group-hover:text-red-600 transition-colors leading-snug">
                      {product.name}
                    </h3>

                    {/* Khmer Subtitle */}
                    {product.nameKhmer && (
                      <div className="text-[11px] text-gray-500 font-khmer line-clamp-1 mt-0.5">
                        {product.nameKhmer}
                      </div>
                    )}
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-gray-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm sm:text-base font-black text-[#ED1D24]">
                        {formatPrice(product.priceUsd)}
                      </span>
                      {product.originalPriceUsd && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(product.originalPriceUsd)}
                        </span>
                      )}
                      <span className="text-[10px] text-gray-400 font-medium ml-auto">
                        {product.colorCount} colors
                      </span>
                    </div>

                    {product.endsDate && (
                      <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-red-600">
                        <Clock className="w-3 h-3" />
                        <span>Ends 29 Oct <span className="font-khmer text-[9px] font-normal">(ផុតកំណត់ 29 តុលា)</span></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}