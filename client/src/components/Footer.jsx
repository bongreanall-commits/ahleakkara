import React from 'react';
import { useStore } from '../context/StoreContext';
import BrandLogo from './BrandLogo';
import { Truck, ShieldCheck, RefreshCw, Send, Phone, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  const { openStorePicker, setIsStockMonitorOpen, setIsOrderTrackerOpen } = useStore();

  return (
    <footer className="bg-white border-t border-gray-200 mt-16 text-gray-700">
      
      {/* 3 Value Propositions */}
      <div className="border-b border-gray-100 bg-gray-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Nationwide Delivery</h4>
                <p className="text-xs text-gray-500 mt-0.5">Express 1-2 days in Phnom Penh & all 24 provinces</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">100% Authentic Guaranteed</h4>
                <p className="text-xs text-gray-500 mt-0.5">Direct official sourcing from GU & Uniqlo flagships</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Real-Time Stock Engine</h4>
                <p className="text-xs text-gray-500 mt-0.5">Synchronized every 60 seconds with original portals</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-black">AH LEAK</span>
              <span className="text-gray-400 font-light text-xl">X</span>
              <span className="font-bold text-[#E8590C] font-khmer text-2xl">ការ៉ា</span>
            </div>
            <span className="text-[9px] tracking-[0.25em] text-gray-400 font-semibold uppercase block -mt-2">
              KARA STUDIO WEAR
            </span>
            <p className="text-xs text-gray-500 leading-relaxed">
              Your premier gateway for authentic GU and UNIQLO collections in Cambodia. Fast delivery, secure KHQR payments, and live stock tracking.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsStockMonitorOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs text-green-700 bg-green-50 px-2.5 py-1 rounded-md border border-green-200 font-medium hover:bg-green-100 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Stock Synchronizer Active (60s)</span>
              </button>
            </div>
          </div>

          {/* 3 Partner Stores */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
              Official Partner Stores
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.gu-global.com/jp/ja/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-red-600 transition-colors flex items-center justify-between"
                >
                  <span>1. GU Japan</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.uniqlo.com/jp/ja/?srsltid=AYCX9vLRCQPR2Yf7aaUHXqFYrluHBUhGR4nDED70eCJUXi29kuFS-Jh_"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-red-600 transition-colors flex items-center justify-between"
                >
                  <span>2. UNIQLO Japan</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.uniqlo.com/vn/en/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-red-600 transition-colors flex items-center justify-between"
                >
                  <span>3. UNIQLO Vietnam</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => openStorePicker()}
                  className="text-red-600 font-bold hover:underline"
                >
                  👆 Choose Store Popup (Image 2)
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Checkout */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
              Customer Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setIsOrderTrackerOpen(true)}
                  className="hover:text-red-600 transition-colors"
                >
                  Track Delivery (KH-EXP Code)
                </button>
              </li>
              <li>
                <span className="text-gray-600">Cambodia Express Checkout</span>
              </li>
              <li>
                <span className="text-gray-600">Payment: KHQR, Bakong, ABA, COD</span>
              </li>
              <li>
                <a
                  href="https://t.me/AhLeakKaraSupport"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Telegram: 066 455 168</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Local Cambodian Payment Accepted */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
              Cambodian Local Payments
            </h4>
            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-red-600 text-white font-black text-[9px] flex items-center justify-center">
                  QR
                </span>
                <span className="font-semibold text-gray-800">KHQR (Bakong / All Banks)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-[#004B87] text-white font-black text-[8px] flex items-center justify-center">
                  ABA
                </span>
                <span className="font-semibold text-gray-800">ABA PayWay / Direct Transfer</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-amber-500 text-white font-bold text-[9px] flex items-center justify-center">
                  COD
                </span>
                <span className="font-semibold text-gray-800">Cash on Delivery (Pay at Door)</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} AH LEAK x ការ៉ា. Sourced from GU Global & UNIQLO. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted for Cambodia with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
