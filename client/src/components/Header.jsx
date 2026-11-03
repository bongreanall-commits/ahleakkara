import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import BrandLogo from './BrandLogo';
import { 
  Menu, 
  Search, 
  User, 
  ShoppingBag, 
  X, 
  RefreshCw, 
  Truck, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  PhoneCall,
  Store,
  ArrowLeftRight
} from 'lucide-react';

export default function Header() {
  const { 
    cartTotalItems, 
    setIsCartOpen, 
    openStorePicker, 
    setSelectedStore, 
    selectedStore, 
    setIsStockMonitorOpen,
    setIsOrderTrackerOpen,
    searchQuery,
    setSearchQuery,
    currency,
    setCurrency,
    user,
    openAuthModal
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const getStoreBadge = () => {
    if (selectedStore === 'gu_jp') {
      return { 
        name: 'GU Japan', 
        logoBg: 'bg-[#002B7F]', 
        text: 'text-[#FCD206]', 
        code: 'GU',
        sub: 'gu-global.com/jp/ja/'
      };
    }
    if (selectedStore === 'uniqlo_vn') {
      return { 
        name: 'UNIQLO Vietnam', 
        logoBg: 'bg-[#ED1D24]', 
        text: 'text-white', 
        code: 'UNIQLO VN',
        sub: 'uniqlo.com/vn/en/'
      };
    }
    return { 
      name: 'UNIQLO Japan', 
      logoBg: 'bg-[#ED1D24]', 
      text: 'text-white', 
      code: 'UNIQLO JP',
      sub: 'uniqlo.com/jp/ja/'
    };
  };

  const currentBadge = getStoreBadge();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Banner Notice */}
      <div className="bg-[#111111] text-white text-[11px] sm:text-xs py-1.5 px-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="bg-[#ED1D24] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
              PROMO
            </span>
            <span className="font-medium text-gray-200 truncate">
              ⚡ Add 2 Items to Your Cart for FREE Delivery across Cambodia!
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Prominent Change Store Button in Top Bar */}
            <button
              onClick={() => openStorePicker()}
              className="flex items-center gap-1.5 bg-[#ED1D24] hover:bg-red-700 text-white font-bold px-2.5 py-0.5 rounded text-[11px] shadow transition-colors cursor-pointer"
              title="Click to select another store"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Change Store</span>
            </button>

            {/* Live Stock Engine Pill */}
            <button
              onClick={() => setIsStockMonitorOpen(true)}
              className="hidden md:flex items-center gap-1.5 bg-black/40 hover:bg-black/60 px-2 py-0.5 rounded border border-gray-700 text-[11px] text-green-400 font-mono transition-colors cursor-pointer"
              title="Click to view automatic 1-minute stock synchronization logs"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>Live Stock Sync (1m)</span>
            </button>

            {/* Currency switcher */}
            <div className="flex items-center gap-1 text-[11px] font-semibold bg-gray-800 px-2 py-0.5 rounded">
              <button 
                onClick={() => setCurrency('USD')}
                className={`${currency === 'USD' ? 'text-red-400 underline font-bold' : 'text-gray-400 hover:text-white'} cursor-pointer`}
              >
                USD ($)
              </button>
              <span className="text-gray-600">|</span>
              <button 
                onClick={() => setCurrency('KHR')}
                className={`${currency === 'KHR' ? 'text-red-400 underline font-bold' : 'text-gray-400 hover:text-white'} cursor-pointer`}
              >
                ៛ KHR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar matching Image 1: [Menu]   AH LEAK x ការ៉ា   [Search] [User] [Cart] */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left: Hamburger Menu & Active Store Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-gray-800 hover:text-black focus:outline-none transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-7 h-7" strokeWidth={2.2} />
            </button>

            {/* Prominent Active Store Pill with "Change Store" Button */}
            <button
              type="button"
              onClick={() => openStorePicker()}
              className="hidden lg:flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-300 hover:border-red-400 rounded-full py-1.5 px-3 text-xs font-bold text-gray-900 transition-all shadow-xs cursor-pointer group"
              title="Click to change your shopping store"
            >
              <span className={`w-5 h-5 rounded-full ${currentBadge.logoBg} ${currentBadge.text} text-[8px] flex items-center justify-center font-black shadow-xs`}>
                {selectedStore === 'gu_jp' ? 'GU' : 'UQ'}
              </span>
              <span className="text-gray-700">Store: <strong className="text-black">{currentBadge.name}</strong></span>
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 group-hover:bg-red-700 shadow-xs">
                <ArrowLeftRight className="w-2.5 h-2.5" />
                <span>Change Store</span>
              </span>
            </button>
          </div>

          {/* Center Brand Name matching Image 1 */}
          <div 
            className="flex flex-col items-center justify-center cursor-pointer select-none" 
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black flex items-center gap-2">
                <span className="tracking-wide">AH LEAK</span>
                <span className="text-gray-400 font-light text-xl">X</span>
                <span className="font-bold text-[#E8590C] font-khmer text-2xl sm:text-3xl">ការ៉ា</span>
              </h1>
            </div>
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-gray-400 font-semibold -mt-1 uppercase">
              KARA STUDIO WEAR
            </span>
          </div>

          {/* Right Icons matching Image 1: [Search] [User] [Cart] */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-800 hover:text-red-600 transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-6 h-6" strokeWidth={2} />
            </button>

            {/* Login / Account Profile Icon */}
            <button
              onClick={() => openAuthModal()}
              className="relative p-2 text-gray-800 hover:text-red-600 transition-colors hidden sm:flex items-center gap-1.5 cursor-pointer rounded-full hover:bg-gray-100"
              title={user ? `Account: ${user.name} (${user.email})` : "Sign In / Login (ចូលគណនី)"}
              aria-label="Account Login"
            >
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover border border-red-500 shadow-xs" />
              ) : user ? (
                <div className="w-6 h-6 rounded-full bg-red-600 text-white text-[11px] font-black flex items-center justify-center">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              ) : (
                <User className="w-6 h-6" strokeWidth={2} />
              )}
              {user && (
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 absolute top-1 right-1 border-2 border-white" />
              )}
            </button>

            {/* Shopping Cart Icon with Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-800 hover:text-red-600 transition-colors cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-6 h-6" strokeWidth={2} />
              {cartTotalItems > 0 && (
                <span className="absolute top-1 right-1 bg-[#ED1D24] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow">
                  {cartTotalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Subheader Store Navigation Strip with Prominent Change Store Button */}
      <div className="bg-gray-100/80 border-t border-gray-200 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-medium">Active Store:</span>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
            selectedStore === 'gu_jp' ? 'bg-[#002B7F] text-[#FCD206]' : 'bg-[#ED1D24] text-white'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>{currentBadge.name}</span>
          </span>
          <span className="hidden sm:inline text-gray-400 font-mono text-[11px]">
            ({currentBadge.sub})
          </span>
        </div>

        {/* Change Store Action Button */}
        <button
          onClick={() => openStorePicker()}
          className="flex items-center gap-1.5 bg-white hover:bg-red-50 text-[#ED1D24] border border-red-300 hover:border-red-500 font-bold px-3 py-1 rounded-full text-xs shadow-xs transition-all cursor-pointer"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Change Store</span>
        </button>
      </div>

      {/* Expandable Search Input */}
      {isSearchOpen && (
        <div className="bg-gray-50 border-t border-b border-gray-200 px-4 py-3 transition-all">
          <div className="max-w-2xl mx-auto flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Sheer Top, Sweatshirt, Fleece, Cargo, GU or Uniqlo..."
              className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              autoFocus
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-xs text-gray-500 hover:text-black font-semibold px-2 py-1"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Slide-over Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 transition-opacity backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div className="flex flex-col">
                <span className="font-bold text-lg text-black flex items-center gap-1.5">
                  <span>AH LEAK</span>
                  <span className="text-gray-400 font-light text-sm">X</span>
                  <span className="text-[#E8590C] font-khmer">ការ៉ា</span>
                </span>
                <span className="text-[9px] text-gray-500 font-medium tracking-wider uppercase">KARA STUDIO WEAR</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Navigation List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              
              {/* Store Switcher Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    Select Partner Store
                  </span>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openStorePicker();
                    }}
                    className="text-xs text-red-600 font-bold underline cursor-pointer"
                  >
                    Change Store
                  </button>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedStore('gu_jp');
                      setIsMobileMenuOpen(false);
                      const el = document.getElementById('catalog-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      selectedStore === 'gu_jp' ? 'border-blue-600 bg-blue-50/50 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded bg-[#002B7F] text-[#FCD206] font-black text-xs flex items-center justify-center font-sans">
                        GU
                      </span>
                      <div>
                        <div className="font-semibold text-sm text-gray-900">GU Japan</div>
                        <div className="text-[11px] text-gray-500">In-Stock items only</div>
                      </div>
                    </div>
                    {selectedStore === 'gu_jp' && <span className="text-xs text-blue-600 font-bold">Active</span>}
                  </button>

                  <button
                    onClick={() => {
                      setSelectedStore('uniqlo_jp');
                      setIsMobileMenuOpen(false);
                      const el = document.getElementById('catalog-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      selectedStore === 'uniqlo_jp' ? 'border-red-600 bg-red-50/50 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded bg-[#ED1D24] text-white font-black text-[9px] flex items-center justify-center leading-none text-center">
                        UNI<br/>QLO
                      </span>
                      <div>
                        <div className="font-semibold text-sm text-gray-900">UNIQLO Japan</div>
                        <div className="text-[11px] text-gray-500">In-Stock items only</div>
                      </div>
                    </div>
                    {selectedStore === 'uniqlo_jp' && <span className="text-xs text-red-600 font-bold">Active</span>}
                  </button>

                  <button
                    onClick={() => {
                      setSelectedStore('uniqlo_vn');
                      setIsMobileMenuOpen(false);
                      const el = document.getElementById('catalog-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      selectedStore === 'uniqlo_vn' ? 'border-red-600 bg-red-50/50 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded bg-[#ED1D24] text-white font-black text-[9px] flex items-center justify-center leading-none text-center">
                        UNI<br/>QLO
                      </span>
                      <div>
                        <div className="font-semibold text-sm text-gray-900">UNIQLO Vietnam</div>
                        <div className="text-[11px] text-gray-500">In-Stock items only</div>
                      </div>
                    </div>
                    {selectedStore === 'uniqlo_vn' && <span className="text-xs text-red-600 font-bold">Active</span>}
                  </button>
                </div>

                {/* Primary Button to trigger popup */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openStorePicker();
                  }}
                  className="mt-3 w-full bg-[#ED1D24] hover:bg-red-700 text-white font-bold py-2.5 px-3 rounded-lg text-xs shadow flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span>Open Store Picker Popup (Image 2)</span>
                </button>
              </div>

              {/* Order Tracking & Support */}
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                  Customer Care
                </span>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsOrderTrackerOpen(true);
                  }}
                  className="w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md font-medium cursor-pointer"
                >
                  <Truck className="w-4 h-4 text-gray-500" />
                  <span>Track My Order (KH-EXP)</span>
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsStockMonitorOpen(true);
                  }}
                  className="w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md font-medium cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-green-600" />
                  <span>1-Min Live Stock Monitor</span>
                </button>

                <a
                  href="https://t.me/AhLeakKaraSupport"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md font-medium"
                >
                  <PhoneCall className="w-4 h-4 text-blue-500" />
                  <span>Telegram Support (066 455 168)</span>
                </a>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 text-[11px] text-gray-500 text-center">
              <span>AH LEAK x ការ៉ា • Authentic Fashion in Cambodia</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
