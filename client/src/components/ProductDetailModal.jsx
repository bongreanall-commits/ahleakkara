import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  ShoppingBag, 
  Check, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Plus, 
  Minus, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function ProductDetailModal() {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    setIsCheckoutOpen,
    currency, 
    exchangeRate 
  } = useStore();

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!selectedProduct) return null;

  const product = selectedProduct;
  const chosenColor = selectedColor || product.colors?.[0] || null;

  // Selected size stock
  const currentSizeObj = product.sizes?.find(s => s.size === selectedSize) || product.sizes?.[0];
  const sizeStock = currentSizeObj?.stock ?? product.totalStock;

  const formatPrice = (priceUsd) => {
    if (currency === 'KHR') {
      return `៛${Math.round(priceUsd * exchangeRate).toLocaleString()}`;
    }
    return `$${priceUsd.toFixed(2)}`;
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, chosenColor, quantity);
    setSelectedProduct(null);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, chosenColor, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setSelectedProduct(null)}
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 my-auto max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full z-20 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-4 sm:p-6 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            
            {/* Left: Product Images */}
            <div className="space-y-3">
              <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top"
                />

                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-2 right-2 bg-[#ED1D24] text-white text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider shadow">
                    {product.badge}
                  </span>
                )}

                {/* Store indicator */}
                <span className={`absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded shadow ${
                  product.storeId === 'gu_jp' ? 'bg-[#002B7F] text-[#FCD206]' : 'bg-[#ED1D24] text-white'
                }`}>
                  {product.storeName}
                </span>
              </div>

              {/* Thumbnail strip */}
              {product.images?.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-14 h-18 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? 'border-red-600' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Purchase Controls */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-mono text-gray-400 uppercase block">
                  SKU: {product.sku}
                </span>

                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mt-1">
                  {product.name}
                </h2>

                {product.nameKhmer && (
                  <p className="text-sm text-gray-600 font-khmer mt-0.5 font-medium">
                    {product.nameKhmer}
                  </p>
                )}

                {product.storeId !== 'uniqlo_vn' && product.nameOriginal && (
                  <span className="text-xs text-gray-400 font-mono block mt-0.5">
                    {product.nameOriginal}
                  </span>
                )}

                {/* Price Display */}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#ED1D24]">
                    {formatPrice(product.priceUsd)}
                  </span>
                  {product.originalPriceUsd && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(product.originalPriceUsd)}
                    </span>
                  )}
                  {product.priceOriginalCurrency && (
                    <span className="text-xs text-gray-400 font-medium">
                      ({product.priceOriginalCurrency})
                    </span>
                  )}
                </div>

                {/* Real-time stock status badge */}
                <div className="mt-2 flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                    sizeStock > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sizeStock > 0 ? 'bg-green-600 animate-pulse' : 'bg-red-600'}`} />
                    <span>{sizeStock > 0 ? `In Stock: ${sizeStock} units available` : 'Out of Stock'}</span>
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    (Auto-synced every 1m)
                  </span>
                </div>

                {/* Color Selector */}
                {product.colors?.length > 0 && (
                  <div className="mt-4">
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Color: <span className="text-black font-semibold">{chosenColor?.name}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c)}
                          className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                            chosenColor?.name === c.name 
                              ? 'border-red-600 scale-110 shadow-sm' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        >
                          {chosenColor?.name === c.name && (
                            <Check className={`w-3.5 h-3.5 ${
                              c.hex === '#FFFFFF' || c.hex === '#FAF0E6' || c.hex === '#F8F8F8' ? 'text-black' : 'text-white'
                            }`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {product.sizes?.length > 0 && (
                  <div className="mt-4">
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Size: <span className="text-black font-semibold">{selectedSize}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s.size}
                          type="button"
                          disabled={!s.inStock}
                          onClick={() => setSelectedSize(s.size)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            selectedSize === s.size
                              ? 'bg-black text-white shadow-xs'
                              : s.inStock
                              ? 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300'
                              : 'bg-gray-50 text-gray-300 line-through cursor-not-allowed border border-gray-100'
                          }`}
                        >
                          {s.size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mt-4">
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">
                    Quantity
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg w-max bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-gray-600 hover:text-black transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-bold text-gray-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(sizeStock || 99, quantity + 1))}
                      className="p-2 text-gray-600 hover:text-black transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Description */}
                {product.description && (
                  <p className="mt-4 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Purchase Buttons */}
              <div className="space-y-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={sizeStock <= 0}
                  className="w-full bg-gray-900 hover:bg-black disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl shadow transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart • {formatPrice(product.priceUsd * quantity)}</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={sizeStock <= 0}
                  className="w-full bg-[#ED1D24] hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
                >
                  <span>Buy Now (ទិញភ្លាមៗ)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 pt-1 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                  <span>100% Genuine • Direct from {product.storeName}</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
