import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Tag, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function CartDrawer() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    cartSubtotal, 
    cartTotalItems,
    isFreeDeliveryEligible, 
    shippingFee, 
    cartGrandTotal,
    setIsCheckoutOpen,
    openStorePicker,
    currency,
    exchangeRate
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'AHLEAK10' || code === 'KARA10') {
      const discount = cartSubtotal * 0.10;
      setPromoDiscount(discount);
      setPromoMessage({ type: 'success', text: '10% Discount applied!' });
    } else if (code === 'FREESHIP') {
      setPromoDiscount(shippingFee);
      setPromoMessage({ type: 'success', text: 'Free delivery applied!' });
    } else {
      setPromoMessage({ type: 'error', text: 'Invalid coupon code. Try AHLEAK10' });
    }
  };

  const finalTotalUsd = Math.max(0, cartGrandTotal - promoDiscount);
  const finalTotalKhr = Math.round(finalTotalUsd * exchangeRate);

  const formatPrice = (usd) => {
    if (currency === 'KHR') {
      return `៛${Math.round(usd * exchangeRate).toLocaleString()}`;
    }
    return `$${usd.toFixed(2)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#ED1D24]" />
            <h2 className="font-bold text-lg text-gray-900">
              Shopping Cart ({cartTotalItems})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Meter */}
        <div className="bg-[#FFF8D6] border-b border-[#FFE500]/50 p-3 text-xs">
          <div className="flex items-center justify-between font-bold text-gray-900 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-700" />
              {isFreeDeliveryEligible 
                ? '🎉 Congratulations! You have unlocked FREE Delivery.' 
                : `Add ${Math.max(0, 2 - cartTotalItems)} more item for FREE Delivery!`}
            </span>
            <span className="text-amber-800 font-extrabold">
              {cartTotalItems}/2 items
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-amber-200/80 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-[#ED1D24] h-full transition-all duration-300 rounded-full"
              style={{ width: `${Math.min(100, (cartTotalItems / 2) * 100)}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-gray-400">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <p className="text-base font-bold text-gray-800">Your cart is empty</p>
                <p className="text-xs text-gray-500 mt-1 max-w-xs">
                  Explore original items from GU Japan, UNIQLO Japan, and UNIQLO Vietnam!
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  openStorePicker();
                }}
                className="bg-[#ED1D24] text-white text-xs font-bold py-2.5 px-6 rounded-lg hover:bg-red-700 transition-colors"
              >
                Choose Store & Shop Now
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.cartItemId}
                className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200/80 relative"
              >
                {/* Thumbnail */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-18 h-22 sm:w-20 sm:h-24 object-cover rounded-lg bg-gray-200 shrink-0"
                />

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    {/* Store badge */}
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      item.storeId === 'gu_jp' ? 'bg-[#002B7F] text-[#FCD206]' : 'bg-[#ED1D24] text-white'
                    }`}>
                      {item.storeName}
                    </span>

                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate mt-1">
                      {item.name}
                    </h4>

                    {/* Variant specs: Size & Color */}
                    <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                      <span className="font-medium bg-white px-1.5 py-0.5 rounded border border-gray-200">
                        Size: {item.selectedSize}
                      </span>
                      {item.selectedColor && (
                        <span className="flex items-center gap-1 font-medium bg-white px-1.5 py-0.5 rounded border border-gray-200">
                          <span 
                            className="w-2.5 h-2.5 rounded-full border border-gray-300" 
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-2 pt-1">
                    <div className="flex items-center border border-gray-300 bg-white rounded-md">
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1 text-gray-600 hover:text-black hover:bg-gray-100 rounded-l transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1 text-gray-600 hover:text-black hover:bg-gray-100 rounded-r transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black text-gray-900">
                        {formatPrice(item.priceUsd * item.quantity)}
                      </span>
                      <span className="text-[10px] text-gray-400 block">
                        ({formatPrice(item.priceUsd)} each)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1"
                  title="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer: Totals, Coupon & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-white space-y-3">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Discount code (e.g. AHLEAK10)"
                className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-2 uppercase font-medium focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <button
                type="submit"
                className="bg-gray-900 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-black transition-colors"
              >
                Apply
              </button>
            </form>

            {promoMessage && (
              <p className={`text-[11px] font-medium ${
                promoMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
              }`}>
                {promoMessage.text}
              </p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-gray-600 border-t border-gray-100 pt-2">
              <div className="flex justify-between">
                <span>Subtotal ({cartTotalItems} items)</span>
                <span className="font-semibold text-gray-900">{formatPrice(cartSubtotal)}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Coupon Discount</span>
                  <span>-{formatPrice(promoDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <span>Delivery Fee</span>
                  {isFreeDeliveryEligible && (
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-1 rounded">FREE</span>
                  )}
                </span>
                <span className="font-semibold text-gray-900">
                  {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                </span>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-gray-200 text-sm sm:text-base font-black text-gray-900">
                <span>Total Amount:</span>
                <div className="text-right">
                  <span className="text-red-600 font-black text-lg">
                    ${finalTotalUsd.toFixed(2)}
                  </span>
                  <span className="text-[11px] text-gray-500 font-medium block">
                    ≈ ៛{finalTotalKhr.toLocaleString()} KHR
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full bg-[#ED1D24] hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
              <span>Safe Khmer Payments • KHQR • Cash on Delivery</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
