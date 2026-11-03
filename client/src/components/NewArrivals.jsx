import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Eye, ShoppingBag, Check, RefreshCw } from 'lucide-react';

export default function NewArrivals() {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    setSelectedProduct,
    selectedStore,
    currency,
    exchangeRate
  } = useStore();

  const categories = [
    { id: 'women', label: 'WOMEN', labelKhmer: 'ស្ត្រី' },
    { id: 'men', label: 'MEN', labelKhmer: 'បុរស' },
    { id: 'kids', label: 'KIDS', labelKhmer: 'កុមារ' },
    { id: 'baby', label: 'Baby', labelKhmer: 'ទារក' }
  ];

  // Dynamic collection showcase cards in Khmer & English based on selected store
  const getShowcaseCollections = () => {
    if (selectedStore === 'uniqlo_vn') {
      return [
        {
          id: 'showcase-vn-women',
          category: 'women',
          title: 'អាវសូត្រ RAYON & អាវការពារ UV',
          sub: 'ការពារកម្ដៅថ្ងៃ UPF 50+ និងសាច់សូត្រ Rayon ទន់រលោង',
          image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=700&q=80',
          tag: 'UNIQLO VN WOMEN'
        },
        {
          id: 'showcase-vn-men',
          category: 'men',
          title: 'អាវយឺត AIRism COTTON OVERSIZED',
          sub: 'បច្ចេកវិទ្យាខ្យល់ត្រជាក់ AIRism ផាសុកភាពក្នុងអាកាសធាតុក្ដៅ',
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80',
          tag: 'UNIQLO VN MEN'
        },
        {
          id: 'showcase-vn-kids',
          category: 'kids',
          title: 'អាវកូនក្មេង AIRism GRAPHIC TEES',
          sub: 'សាច់ក្រណាត់ទន់រលោង ផ្តល់ភាពងាយស្រួលដល់កូនៗក្នុងការរត់លេង',
          image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=700&q=80',
          tag: 'UNIQLO VN KIDS'
        },
        {
          id: 'showcase-vn-baby',
          category: 'baby',
          title: 'ឈុតទារក BABY COTTON BODYSUIT',
          sub: 'សាច់កប្បាស ១០០% ទន់ថ្នម មិនរលាកដល់ស្បែកទារក',
          image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=700&q=80',
          tag: 'UNIQLO VN BABY'
        }
      ];
    }

    if (selectedStore === 'gu_jp') {
      return [
        {
          id: 'showcase-gu-women',
          category: 'women',
          title: 'ខោខូវប៊យ GU BARREL LEG & SWEATS',
          sub: 'ម៉ូតកោងពេញនិយមនៅជប៉ុន និងអាវយឺត Smooth Sweat',
          image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80',
          tag: 'GU JAPAN WOMEN'
        },
        {
          id: 'showcase-gu-men',
          category: 'men',
          title: 'ខោហោប៉ៅច្រើន GU PARACHUTE CARGO',
          sub: 'ស្ទីល Streetwear ពេញនិយមនៅតំបន់ Shibuya ទីក្រុងតូក្យូ',
          image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=80',
          tag: 'GU JAPAN MEN'
        },
        {
          id: 'showcase-gu-kids',
          category: 'kids',
          title: 'អាវកូនក្មេង GU HEAVYWEIGHT SWEAT',
          sub: 'សាច់ក្រណាត់ក្រាស់ជាប់ធន់ល្អ ស័ក្តិសមសម្រាប់កូនៗ',
          image: 'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?auto=format&fit=crop&w=700&q=80',
          tag: 'GU JAPAN KIDS'
        },
        {
          id: 'showcase-gu-baby',
          category: 'baby',
          title: 'ខោទារក GU BABY SOFT WARM PANTS',
          sub: 'ចង្កេះកៅស៊ូយឺតទន់ ងាយស្រួលស្លៀក និងផ្លាស់ប្តូរ',
          image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=700&q=80',
          tag: 'GU JAPAN BABY'
        }
      ];
    }

    // Default: UNIQLO Japan
    return [
      {
        id: 'showcase-liberty',
        category: 'women',
        title: 'អាវកខ្ពស់ LIBERTY LONDON x UNIQLO',
        sub: 'ផ្កាស្រស់ស្អាត Sophisticated Floral និងអាវ Soft Sheer',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
        tag: 'UNIQLO JP WOMEN'
      },
      {
        id: 'showcase-fleece',
        category: 'men',
        title: 'អាវរងារ FLEECE JACKETS (フリースジャケット)',
        sub: 'ស្រាល ស្រួលពាក់ និងរក្សាកម្ដៅបានកក់ក្តៅបំផុត',
        image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=700&q=80',
        tag: 'UNIQLO JP MEN'
      },
      {
        id: 'showcase-kids',
        category: 'kids',
        title: 'អាវយឺតក្មេង ARGYLE JACQUARD KNIT',
        sub: 'ម៉ូតលំនាំពេជ្របែបបុរាណ មិនរមាស់ និងងាយស្រួលបោកគក់',
        image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=700&q=80',
        tag: 'UNIQLO JP KIDS'
      },
      {
        id: 'showcase-baby',
        category: 'baby',
        title: 'ខោទារករោមចៀម BABY FLEECE LEGGINGS',
        sub: 'សាច់រោមចៀមកក់ក្តៅ យឺតទន់ មិនគាបចង្កេះទារក',
        image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=700&q=80',
        tag: 'UNIQLO JP BABY'
      }
    ];
  };

  const showcaseCollections = getShowcaseCollections();

  // Filter products by selected store and selected category
  const storeFiltered = products.filter(p => p.storeId === selectedStore);
  const categoryProducts = storeFiltered.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const formatPrice = (priceUsd) => {
    if (currency === 'KHR') {
      return `៛${(priceUsd * exchangeRate).toLocaleString()}`;
    }
    return `$${priceUsd.toFixed(0)}`;
  };

  const getStoreTitle = () => {
    if (selectedStore === 'uniqlo_vn') return 'UNIQLO Vietnam';
    if (selectedStore === 'gu_jp') return 'GU Japan';
    return 'UNIQLO Japan';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-t border-gray-200 mt-6">
      
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-[11px] font-black uppercase tracking-widest text-[#ED1D24]">
          {getStoreTitle()} EXCLUSIVE
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-black uppercase mt-1">
          NEW ARRIVALS
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-khmer">
          ម៉ូតថ្មីៗទាន់សម័យនាំចូលផ្ទាល់ពីហាងធំផ្លូវការ {getStoreTitle()}
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center border-b border-gray-200 mb-8 sm:mb-10">
        <div className="flex space-x-6 sm:space-x-12 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`pb-3 text-sm sm:text-base font-bold uppercase tracking-wider relative transition-all whitespace-nowrap cursor-pointer ${
                  isActive ? 'text-black' : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-[11px] font-khmer text-gray-400 font-normal ml-1">({cat.labelKhmer})</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Showcase Cards strictly from selected store in Khmer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
        {showcaseCollections.map((col) => (
          <div
            key={col.id}
            onClick={() => {
              setSelectedCategory(col.category);
              const el = document.getElementById('catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group cursor-pointer relative rounded-xl overflow-hidden border border-gray-200 aspect-[3/4] shadow-xs hover:shadow-md transition-all"
          >
            <img
              src={col.image}
              alt={col.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-3 sm:p-4 text-white">
              <span className="text-[9px] font-bold tracking-widest uppercase bg-red-600/90 w-max px-1.5 py-0.5 rounded-xs mb-1">
                {col.tag}
              </span>
              <h4 className="text-xs sm:text-sm font-bold font-khmer leading-snug">
                {col.title}
              </h4>
              <p className="text-[10px] sm:text-[11px] text-gray-200 line-clamp-1 mt-0.5 font-khmer">
                {col.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Catalog Grid for selected category */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 font-khmer">
              {getStoreTitle()} • ម៉ូតសម្រាប់ {categories.find(c => c.id === selectedCategory)?.labelKhmer || selectedCategory.toUpperCase()}
            </h3>
            <span className="text-xs text-gray-400 font-semibold">
              ({categoryProducts.length} មុខទំនិញ)
            </span>
          </div>

          <span className="text-xs text-green-700 bg-green-50 px-2.5 py-1 rounded-full font-medium flex items-center gap-1 border border-green-200 font-khmer">
            <RefreshCw className="w-3 h-3 animate-spin text-green-600" style={{ animationDuration: '4s' }} />
            <span>ស្តុក Sync ស្វ័យប្រវត្តិ</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categoryProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                setSelectedProduct(product);
              }}
              className="group cursor-pointer bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[4/4.5] bg-gray-100 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-[#ED1D24] text-white text-[9px] font-black px-1.5 py-0.5 rounded-xs uppercase tracking-wider shadow-xs">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Store indicator badge */}
                <div className="absolute bottom-2 left-2">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-xs shadow-xs ${
                    product.storeId === 'gu_jp' ? 'bg-[#002B7F] text-[#FCD206]' : 'bg-[#ED1D24] text-white'
                  }`}>
                    {product.storeName}
                  </span>
                </div>
              </div>

              {/* Product Meta with Khmer title prominent */}
              <div className="p-3 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <div className="text-xs sm:text-[13px] font-bold text-gray-900 font-khmer line-clamp-1 leading-snug">
                    {product.nameKhmer || product.name}
                  </div>
                  <h4 className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                    {product.name}
                  </h4>
                </div>

                <div className="mt-2.5 pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-black text-[#ED1D24]">
                        {formatPrice(product.priceUsd)}
                      </span>
                      {product.originalPriceUsd && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(product.originalPriceUsd)}
                        </span>
                      )}
                    </div>

                    {/* Stock pill in Khmer */}
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-khmer ${
                      product.stockStatus === 'IN_STOCK' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      នៅសល់ {product.totalStock}
                    </span>
                  </div>

                  {/* Size options preview */}
                  <div className="mt-2 flex items-center gap-1 overflow-x-hidden">
                    {product.sizes?.slice(0, 4).map((s) => (
                      <span key={s.size} className="text-[10px] bg-gray-100 text-gray-600 px-1 rounded font-medium">
                        {s.size}
                      </span>
                    ))}
                    {(product.sizes?.length || 0) > 4 && (
                      <span className="text-[10px] text-gray-400">+{product.sizes.length - 4}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
