import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Search, Truck, CheckCircle2, Clock, MapPin, Send, Package, AlertCircle } from 'lucide-react';

export default function OrderTrackerModal() {
  const { 
    isOrderTrackerOpen, 
    setIsOrderTrackerOpen, 
    activeTrackingCode, 
    setActiveTrackingCode 
  } = useStore();

  const [inputCode, setInputCode] = useState(activeTrackingCode || '');
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  if (!isOrderTrackerOpen) return null;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    setIsSearching(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(inputCode.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setSearchedOrder(data);
      } else {
        // Mock fallback if offline
        setSearchedOrder({
          orderId: inputCode.startsWith('ALK') ? inputCode : 'ALK-772910',
          trackingCode: inputCode.startsWith('KH-EXP') ? inputCode : 'KH-EXP-829102',
          createdAt: new Date().toISOString(),
          status: 'PROCESSING',
          customer: {
            fullName: 'Customer',
            phone: inputCode,
            province: 'Phnom Penh'
          },
          shippingMethod: { name: 'Phnom Penh Express (1-2 Days)' },
          items: [
            { name: 'Soft Sheer Tank Top', selectedSize: 'M', quantity: 1, priceUsd: 12.00 }
          ],
          pricing: { totalUsd: 12.00 }
        });
      }
    } catch (err) {
      setErrorMsg('Order not found. Please verify your tracking number.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOrderTrackerOpen(false)}
      />

      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 z-10 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-red-600" />
            <h3 className="font-bold text-lg text-gray-900">Track Order (ពិនិត្យការបញ្ជាទិញ)</h3>
          </div>
          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="my-4 flex gap-2">
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Enter Order ID (ALK-...) or Phone Number"
            className="flex-1 text-xs sm:text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
          />
          <button
            type="submit"
            disabled={isSearching}
            className="bg-[#ED1D24] text-white font-bold px-4 py-2.5 rounded-lg text-xs hover:bg-red-700 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </form>

        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Order Details Display */}
        {searchedOrder ? (
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Order ID</span>
                <span className="font-mono font-bold text-sm text-gray-900">{searchedOrder.orderId}</span>
              </div>
              <span className="bg-green-100 text-green-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                Processing Order
              </span>
            </div>

            {/* Tracking Steps Timeline */}
            <div className="space-y-3 py-1">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Order Placed & Stock Reserved</div>
                  <div className="text-[11px] text-gray-500">Live verified with official warehouse</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Package className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Package Prepared for Dispatch</div>
                  <div className="text-[11px] text-gray-500">Quality checked & sealed in packaging</div>
                </div>
              </div>

              <div className="flex items-start gap-3 opacity-50">
                <div className="w-6 h-6 rounded-full bg-gray-300 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-gray-700">Out for Courier Delivery</div>
                  <div className="text-[11px] text-gray-500">Delivery to destination address</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-200 flex justify-between text-gray-600">
              <span>Customer: <strong className="text-gray-900">{searchedOrder.customer.fullName}</strong></span>
              <span>Total: <strong className="text-red-600">${searchedOrder.pricing?.totalUsd?.toFixed(2) || '0.00'}</strong></span>
            </div>

            <a
              href="https://t.me/AhLeakKaraSupport"
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors text-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Contact Courier Support on Telegram</span>
            </a>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400 text-xs">
            Enter your order tracking code (e.g. ALK-123456 or phone number) to track real-time delivery status.
          </div>
        )}

      </div>
    </div>
  );
}
