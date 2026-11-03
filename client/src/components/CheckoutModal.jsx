import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import BrandLogo from './BrandLogo';
import confetti from 'canvas-confetti';
import { 
  X, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  User, 
  Send, 
  Truck, 
  CreditCard, 
  QrCode, 
  Banknote, 
  UploadCloud, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Copy, 
  Clock, 
  ExternalLink,
  Receipt
} from 'lucide-react';

const CAMBODIA_PROVINCES = [
  'Phnom Penh (រាជធានីភ្នំពេញ)',
  'Kandal (ខេត្តកណ្តាល)',
  'Siem Reap (ខេត្តសៀមរាប)',
  'Battambang (ខេត្តបាត់ដំបង)',
  'Preah Sihanouk (ខេត្តព្រះសីហនុ)',
  'Kampot (ខេត្តកំពត)',
  'Kampong Cham (ខេត្តកំពង់ចាម)',
  'Takeo (ខេត្តតាកែវ)',
  'Kampong Chhnang (ខេត្តកំពង់ឆ្នាំង)',
  'Kampong Speu (ខេត្តកំពង់ស្ពឺ)',
  'Kampong Thom (ខេត្តកំពង់ធំ)',
  'Pursat (ខេត្តពោធិ៍សាត់)',
  'Banteay Meanchey (ខេត្តបន្ទាយមានជ័យ)',
  'Prey Veng (ខេត្តព្រៃវែង)',
  'Svay Rieng (ខេត្តស្វាយរៀង)',
  'Kratie (ខេត្តក្រចេះ)',
  'Stung Treng (ខេត្តស្ទឹងត្រែង)',
  'Ratanakiri (ខេត្តរតនគិរី)',
  'Mondulkiri (ខេត្តមណ្ឌលគិរី)',
  'Kep (ខេត្តកែប)',
  'Pailin (ខេត្តប៉ៃលិន)',
  'Koh Kong (ខេត្តកោះកុង)',
  'Preah Vihear (ខេត្តព្រះវិហារ)',
  'Oddar Meanchey (ខេត្តឧត្តរមានជ័យ)',
  'Tboung Khmum (ខេត្តត្បូងឃ្មុំ)'
];

export default function CheckoutModal() {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    clearCart, 
    cartSubtotal, 
    cartTotalItems, 
    isFreeDeliveryEligible, 
    shippingFee, 
    currency, 
    exchangeRate,
    setActiveTrackingCode,
    setIsOrderTrackerOpen,
    user,
    loginWithGoogle,
    registerWithEmail,
    loginWithEmail,
    recordUserOrder
  } = useStore();

  const [step, setStep] = useState(1); // 1: Shipping Details, 2: Shipping Method, 'auth_gate': Account Required, 3: Payment, 4: Receipt/Confirmation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [slipUploaded, setSlipUploaded] = useState(false);

  // Customer Form
  const [fullName, setFullName] = useState(() => user?.name || '');
  const [phone, setPhone] = useState(() => user?.phone || '');
  const [telegram, setTelegram] = useState('');
  const [province, setProvince] = useState('Phnom Penh (រាជធានីភ្នំពេញ)');
  const [district, setDistrict] = useState('');
  const [commune, setCommune] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [notes, setNotes] = useState('');

  // Inline Auth Gate Form state
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authMode, setAuthMode] = useState('register'); // 'register' | 'login'
  const [authError, setAuthError] = useState('');

  // Shipping Method
  const [selectedShippingMethod, setSelectedShippingMethod] = useState({
    id: 'pp_express',
    name: 'Phnom Penh Express (1-2 Days)',
    fee: isFreeDeliveryEligible ? 0 : 1.50
  });

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState('KHQR'); // 'KHQR', 'COD', 'ABA'

  if (!isCheckoutOpen) return null;

  const currentTotalUsd = cartSubtotal + selectedShippingMethod.fee;
  const currentTotalKhr = Math.round(currentTotalUsd * exchangeRate);

  const formatPrice = (usd) => {
    if (currency === 'KHR') {
      return `៛${Math.round(usd * exchangeRate).toLocaleString()}`;
    }
    return `$${usd.toFixed(2)}`;
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !addressDetail.trim()) {
      alert('Please fill in required fields: Full Name, Phone, and Address.');
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = () => {
    // Check if user is logged in: if not, require account login/creation before payment
    if (!user) {
      setStep('auth_gate');
    } else {
      setStep(3);
    }
  };

  const handleGateGoogleLogin = () => {
    loginWithGoogle(null, fullName);
    setStep(3);
  };

  const handleGateEmailSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    if (!authEmail.trim() || !authPassword.trim()) {
      setAuthError('Please fill in both email and password.');
      return;
    }

    if (authMode === 'register') {
      registerWithEmail({
        name: fullName || authEmail.split('@')[0],
        email: authEmail,
        phone: phone,
        password: authPassword
      });
      setStep(3);
    } else {
      loginWithEmail(authEmail, authPassword);
      setStep(3);
    }
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      const orderPayload = {
        customer: {
          fullName,
          phone,
          telegram,
          province,
          district,
          commune,
          addressDetail,
          notes
        },
        account: {
          userId: user?.id || 'guest',
          userName: user?.name || fullName,
          userEmail: user?.email || '',
          provider: user?.provider || 'guest'
        },
        shippingMethod: selectedShippingMethod,
        paymentMethod: {
          type: paymentMethod,
          name: paymentMethod === 'KHQR' ? 'KHQR (Bakong / ABA / ACLEDA)' : paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'ABA Direct Transfer'
        },
        items: cart,
        pricing: {
          subtotal: cartSubtotal,
          shippingFee: selectedShippingMethod.fee,
          totalUsd: currentTotalUsd,
          totalKhr: currentTotalKhr
        }
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      let orderResult = null;
      if (res.ok) {
        const data = await res.json();
        orderResult = data.order;
      } else {
        // Fallback local order generation
        orderResult = {
          orderId: `ALK-${Math.floor(100000 + Math.random() * 900000)}`,
          trackingCode: `KH-EXP-${Math.floor(100000 + Math.random() * 900000)}`,
          createdAt: new Date().toISOString(),
          customer: { fullName, phone, telegram, province, addressDetail },
          items: cart,
          pricing: { totalUsd: currentTotalUsd, totalKhr: currentTotalKhr },
          paymentMethod: { type: paymentMethod }
        };
      }

      setCompletedOrder(orderResult);
      if (typeof recordUserOrder === 'function') {
        recordUserOrder(orderResult);
      }
      clearCart();
      setStep(4);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

    } catch (e) {
      console.error('Order error:', e);
      alert('Network error. Please try again or order via Telegram.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('000892119');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => {
          if (step !== 4) setIsCheckoutOpen(false);
        }}
      />

      {/* Modal Dialog (Cambodia Checkout Experience) */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-black text-xl text-[#ED1D24]">AH LEAK x ការ៉ា</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm font-semibold text-gray-700">Checkout</span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (1 -> 2 -> Account -> 3) */}
        {step !== 4 && (
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 shrink-0">
            <div className="flex items-center justify-between max-w-md mx-auto text-xs">
              <div className={`flex items-center gap-1.5 font-bold ${step === 1 ? 'text-red-600' : 'text-gray-700'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step !== 1 ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  {step !== 1 ? '✓' : '1'}
                </span>
                <span>Address</span>
              </div>

              <div className={`h-0.5 w-8 ${step !== 1 ? 'bg-green-600' : 'bg-gray-200'}`} />

              <div className={`flex items-center gap-1.5 font-bold ${step === 2 ? 'text-red-600' : step === 'auth_gate' || step === 3 ? 'text-gray-700' : 'text-gray-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step === 'auth_gate' || step === 3 ? 'bg-green-600 text-white' : step === 2 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step === 'auth_gate' || step === 3 ? '✓' : '2'}
                </span>
                <span>Shipping</span>
              </div>

              <div className={`h-0.5 w-8 ${step === 'auth_gate' || step === 3 ? 'bg-red-600' : 'bg-gray-200'}`} />

              <div className={`flex items-center gap-1.5 font-bold ${step === 'auth_gate' ? 'text-amber-600' : step === 3 ? 'text-red-600' : 'text-gray-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step === 3 ? 'bg-red-600 text-white' : step === 'auth_gate' ? 'bg-amber-500 text-white animate-pulse' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step === 'auth_gate' ? '🔐' : '3'}
                </span>
                <span>{step === 'auth_gate' ? 'Login' : 'Payment'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: CUSTOMER CONTACT & DELIVERY ADDRESS */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-red-600" />
                  <span>Delivery Information (ព័ត៌មានដឹកជញ្ជូន)</span>
                </h3>
                <span className="text-xs text-gray-400">* Required</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Full Name */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Receiver's Full Name (ឈ្មោះអ្នកទទួល) *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Bunna Sok"
                    className="w-full text-xs sm:text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Cambodia Phone Number */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Phone Number (លេខទូរស័ព្ទ) *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-xs font-semibold">
                      🇰🇭 +855
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="012 345 678"
                      className="w-full text-xs sm:text-sm border border-gray-300 rounded-r-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                {/* Telegram Contact */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Telegram Account / Username (optional)
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-xs font-semibold">
                      @
                    </span>
                    <input
                      type="text"
                      value={telegram}
                      onChange={(e) => setTelegram(e.target.value)}
                      placeholder="username (for delivery notification)"
                      className="w-full text-xs sm:text-sm border border-gray-300 rounded-r-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                {/* City / Province */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Province / City (ខេត្ត/ក្រុង) *
                  </label>
                  <select
                    value={province}
                    onChange={(e) => {
                      setProvince(e.target.value);
                      const isPP = e.target.value.includes('Phnom Penh');
                      setSelectedShippingMethod({
                        id: isPP ? 'pp_express' : 'province_express',
                        name: isPP ? 'Phnom Penh Express (1-2 Days)' : 'Provinces Express (2-3 Days)',
                        fee: isFreeDeliveryEligible ? 0 : (isPP ? 1.50 : 2.00)
                      });
                    }}
                    className="w-full text-xs sm:text-sm border border-gray-300 rounded-lg p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
                  >
                    {CAMBODIA_PROVINCES.map((prov) => (
                      <option key={prov} value={prov}>
                        {prov}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Khan & Sangkat */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Khan / District (ខណ្ឌ/ស្រុក)
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Chamkarmon / Toul Kork"
                    className="w-full text-xs sm:text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Sangkat / Commune (សង្កាត់/ឃុំ)
                  </label>
                  <input
                    type="text"
                    value={commune}
                    onChange={(e) => setCommune(e.target.value)}
                    placeholder="e.g. Boeng Keng Kang / Teuk Laak"
                    className="w-full text-xs sm:text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* House / Street / Landmark Address */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Street Address & House No. (អាសយដ្ឋានលម្អិត) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={addressDetail}
                  onChange={(e) => setAddressDetail(e.target.value)}
                  placeholder="Street #, House #, Condo/Apartment name, Landmark..."
                  className="w-full text-xs sm:text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Delivery Notes */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Delivery Note (ចំណាំដឹកជញ្ជូន)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Call before arrival, leave with security guard..."
                  className="w-full text-xs sm:text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-[#ED1D24] hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl shadow transition-colors flex items-center justify-center gap-2"
                >
                  <span>Continue to Shipping Option</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: SHIPPING METHOD SELECTION */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="pb-2 border-b border-gray-100">
                <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-red-600" />
                  <span>Choose Delivery Method</span>
                </h3>
                <p className="text-xs text-gray-500">
                  Destination: <span className="font-semibold text-gray-800">{province}</span>
                </p>
              </div>

              <div className="space-y-3">
                {/* Option 1: Phnom Penh Express */}
                <label 
                  onClick={() => setSelectedShippingMethod({
                    id: 'pp_express',
                    name: 'Phnom Penh Express (1-2 Days)',
                    fee: isFreeDeliveryEligible ? 0 : 1.50
                  })}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedShippingMethod.id === 'pp_express' 
                      ? 'border-2 border-red-600 bg-red-50/20 shadow-xs' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={selectedShippingMethod.id === 'pp_express'}
                      onChange={() => {}}
                      className="text-red-600 focus:ring-red-500"
                    />
                    <div>
                      <div className="font-bold text-sm text-gray-900">
                        Phnom Penh Express Delivery
                      </div>
                      <div className="text-xs text-gray-500">
                        Door-to-door courier • 1-2 business days
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm text-gray-900">
                      {isFreeDeliveryEligible ? (
                        <span className="text-green-600 font-black">FREE (Promo)</span>
                      ) : (
                        '$1.50'
                      )}
                    </span>
                  </div>
                </label>

                {/* Option 2: Provinces Delivery */}
                <label 
                  onClick={() => setSelectedShippingMethod({
                    id: 'province_express',
                    name: 'Provinces Express (Virak Buntham / J&T / Kerry)',
                    fee: isFreeDeliveryEligible ? 0 : 2.00
                  })}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedShippingMethod.id === 'province_express' 
                      ? 'border-2 border-red-600 bg-red-50/20 shadow-xs' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={selectedShippingMethod.id === 'province_express'}
                      onChange={() => {}}
                      className="text-red-600 focus:ring-red-500"
                    />
                    <div>
                      <div className="font-bold text-sm text-gray-900">
                        Provinces Express (Virak Buntham / J&T)
                      </div>
                      <div className="text-xs text-gray-500">
                        Branches or home delivery • 2-3 business days
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm text-gray-900">
                      {isFreeDeliveryEligible ? (
                        <span className="text-green-600 font-black">FREE (Promo)</span>
                      ) : (
                        '$2.00'
                      )}
                    </span>
                  </div>
                </label>
              </div>

              {/* Free delivery badge if met */}
              {isFreeDeliveryEligible && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-xs text-green-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Your order has 2+ items! Free Delivery discount automatically applied.</span>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 border border-gray-300 text-gray-700 font-bold rounded-xl text-xs hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleStep2Submit}
                  className="flex-1 bg-[#ED1D24] hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl shadow transition-colors flex items-center justify-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP: ACCOUNT REQUIRED AUTH GATE (Before Payment) */}
          {step === 'auth_gate' && (
            <div className="space-y-5">
              <div className="text-center pb-2 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-2 border border-red-200 shadow-xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-black text-lg sm:text-xl text-gray-900">
                  Account Required to Complete Payment
                </h3>
                <p className="text-xs text-gray-500 font-khmer mt-1">
                  ព័ត៌មានអ្នកទទួល៖ <strong className="text-gray-800">{fullName}</strong> ({phone}) ត្រូវបានកត់ត្រារួចរាល់។ សូមភ្ជាប់គណនីរបស់អ្នកដើម្បីបន្តទៅការទូទាត់ប្រាក់ (Payment)
                </p>
              </div>

              {/* OPTION 1: 1-Click with Google */}
              <button
                type="button"
                onClick={handleGateGoogleLogin}
                className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs sm:text-sm rounded-xl border border-gray-300 shadow-xs flex items-center justify-center gap-3 transition-all cursor-pointer hover:border-gray-400 group"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Continue with Google to Payment</span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-gray-400 font-medium font-khmer">
                    ឬចុះឈ្មោះ / ចូលគណនីតាមអ៊ីមែល (Or with Email)
                  </span>
                </div>
              </div>

              {authError && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
                  {authError}
                </div>
              )}

              {/* OPTION 2: Email Form */}
              <form onSubmit={handleGateEmailSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg text-xs font-bold text-center">
                  <button
                    type="button"
                    onClick={() => { setAuthMode('register'); setAuthError(''); }}
                    className={`py-1.5 rounded-md transition-all cursor-pointer ${
                      authMode === 'register' ? 'bg-white shadow-xs text-red-600' : 'text-gray-600'
                    }`}
                  >
                    Create Account (ចុះឈ្មោះ)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthMode('login'); setAuthError(''); }}
                    className={`py-1.5 rounded-md transition-all cursor-pointer ${
                      authMode === 'login' ? 'bg-white shadow-xs text-red-600' : 'text-gray-600'
                    }`}
                  >
                    I Have Account (ចូលគណនី)
                  </button>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Email Address (អ៊ីមែលរបស់អ្នក) *
                  </label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full text-xs sm:text-sm border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Password (ពាក្យសម្ងាត់) *
                  </label>
                  <input
                    type="password"
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs sm:text-sm border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-xl text-xs hover:bg-gray-50 cursor-pointer"
                  >
                    Back to Shipping
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#ED1D24] hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{authMode === 'register' ? 'Create Account & Pay' : 'Sign In & Pay'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD (Cambodian Local Payment / KHQR / COD / ABA) */}
          {step === 3 && (
            <div className="space-y-4">
              
              {/* Logged in customer badge */}
              {user && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 sm:p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-emerald-500 shrink-0" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center text-xs shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <span className="font-bold text-gray-900 block leading-tight">{user.name}</span>
                      <span className="text-gray-500 text-[11px]">{user.email}</span>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Verified Buyer Account</span>
                  </span>
                </div>
              )}

              <div className="pb-2 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-red-600" />
                  <span>Payment Method (វិធីសាស្ត្រទូទាត់ប្រាក់)</span>
                </h3>
                <span className="text-xs font-black text-red-600">
                  Total: ${currentTotalUsd.toFixed(2)} (៛{currentTotalKhr.toLocaleString()})
                </span>
              </div>

              {/* 3 Payment Options */}
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('KHQR')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                    paymentMethod === 'KHQR' 
                      ? 'border-2 border-red-600 bg-red-50/30 shadow-xs' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded bg-red-600 text-white flex items-center justify-center font-black text-xs">
                    QR
                  </div>
                  <span className="font-bold text-xs text-gray-900">KHQR</span>
                  <span className="text-[10px] text-gray-500">Bakong / ABA</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                    paymentMethod === 'COD' 
                      ? 'border-2 border-red-600 bg-red-50/30 shadow-xs' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded bg-amber-500 text-white flex items-center justify-center font-black text-xs">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-xs text-gray-900">COD</span>
                  <span className="text-[10px] text-gray-500">Pay on Arrival</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('ABA')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                    paymentMethod === 'ABA' 
                      ? 'border-2 border-red-600 bg-red-50/30 shadow-xs' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded bg-[#004B87] text-white flex items-center justify-center font-black text-[10px]">
                    ABA
                  </div>
                  <span className="font-bold text-xs text-gray-900">ABA Bank</span>
                  <span className="text-[10px] text-gray-500">Direct Transfer</span>
                </button>
              </div>

              {/* PAYMENT DETAILS ACCORDING TO SELECTION */}
              {paymentMethod === 'KHQR' && (
                <div className="bg-red-50/50 border border-red-200 rounded-xl p-4 text-center space-y-3">
                  <div className="inline-block bg-[#ED1D24] text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                    Official KHQR Payment
                  </div>
                  
                  {/* Generated Standard KHQR Graphic */}
                  <div className="mx-auto w-44 bg-white p-3 rounded-xl shadow-md border border-gray-200 flex flex-col items-center">
                    <div className="flex items-center justify-between w-full pb-1 border-b border-gray-100 text-[10px] font-bold text-gray-700">
                      <span>KHQR Bakong</span>
                      <span className="text-red-600 font-black">USD</span>
                    </div>

                    {/* QR Code Matrix Display */}
                    <div className="my-2 p-1 bg-white border border-gray-100 rounded">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=KHQR://AHLEAK_KARA_STORE/USD/${currentTotalUsd}`}
                        alt="AH LEAK x KARA KHQR"
                        className="w-36 h-36"
                      />
                    </div>

                    <div className="text-[11px] font-bold text-gray-800">
                      AH LEAK X KARA
                    </div>
                    <div className="text-xs font-black text-red-600">
                      ${currentTotalUsd.toFixed(2)}
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 max-w-sm mx-auto">
                    Scan with any Cambodian Banking app (ABA Mobile, ACLEDA, Wing, Canadia, Bakong).
                  </p>

                  {/* Payment Slip Upload */}
                  <div className="pt-1">
                    <label 
                      onClick={() => setSlipUploaded(true)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold border cursor-pointer transition-all ${
                        slipUploaded 
                          ? 'bg-green-100 text-green-800 border-green-300' 
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>{slipUploaded ? '✓ Payment Slip Attached' : 'Attach Payment Screenshot (optional)'}</span>
                    </label>
                  </div>
                </div>
              )}

              {paymentMethod === 'ABA' && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 uppercase">ABA Bank Account</span>
                    <span className="text-xs text-blue-600 font-bold">Fast Transfer</span>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-gray-500 font-medium">Account Name:</div>
                      <div className="text-sm font-black text-gray-900">AH LEAK X KARA STORE</div>
                      <div className="text-base font-mono font-black text-[#004B87] mt-1">000 892 119</div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyAccount}
                      className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                    >
                      {copiedAccount ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedAccount ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="text-xs text-gray-500">
                    Remark: <span className="font-semibold text-gray-800">{phone || 'Your Phone Number'}</span>
                  </div>
                </div>
              )}

              {paymentMethod === 'COD' && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-900 text-xs space-y-2">
                  <div className="font-bold flex items-center gap-1.5">
                    <Banknote className="w-4 h-4 text-amber-600" />
                    <span>Cash on Delivery (ទូទាត់ប្រាក់ពេលទំនិញដល់ដៃ)</span>
                  </div>
                  <p>
                    You can pay the courier in cash (USD or Cambodian Riel) upon inspecting the package. Please ensure your phone is reachable.
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-3 border border-gray-300 text-gray-700 font-bold rounded-xl text-xs hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handlePlaceOrder}
                  className="flex-1 bg-[#ED1D24] hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Order & Reserving Stock...</span>
                  ) : (
                    <>
                      <span>Complete Order • ${currentTotalUsd.toFixed(2)}</span>
                      <Check className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ORDER CONFIRMATION & RECEIPT */}
          {step === 4 && completedOrder && (
            <div className="text-center py-4 space-y-5 animate-in fade-in zoom-in-95">
              
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="text-xs uppercase font-extrabold text-green-600 tracking-wider">
                  Order Successfully Placed!
                </span>
                <h3 className="text-2xl font-black text-gray-900 mt-1">
                  Thank you, {completedOrder.customer.fullName}!
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  We have received your order. Our team will verify and prepare your dispatch.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-gray-50 rounded-xl p-4 text-left border border-gray-200 space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">Order Number</span>
                    <span className="font-mono font-black text-sm text-gray-900">
                      {completedOrder.orderId}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">Tracking Code</span>
                    <span className="font-mono font-bold text-red-600">
                      {completedOrder.trackingCode}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-gray-600">
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span className="font-semibold text-gray-900">{completedOrder.customer.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Destination:</span>
                    <span className="font-semibold text-gray-900">{completedOrder.customer.province}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Address:</span>
                    <span className="font-semibold text-gray-900 truncate max-w-[200px]">{completedOrder.customer.addressDetail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="font-semibold text-gray-900">{completedOrder.paymentMethod.name}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-gray-200 text-sm font-black text-gray-900">
                    <span>Total Paid:</span>
                    <span className="text-red-600">
                      ${completedOrder.pricing.totalUsd.toFixed(2)} (៛{completedOrder.pricing.totalKhr.toLocaleString()} KHR)
                    </span>
                  </div>
                </div>
              </div>

              {/* Telegram Confirmation Button */}
              <div className="space-y-2">
                <a
                  href={`https://t.me/AhLeakKaraSupport?text=${encodeURIComponent(
                    `Hello AH LEAK x KARA! I just placed an order:\nOrder ID: ${completedOrder.orderId}\nName: ${completedOrder.customer.fullName}\nPhone: ${completedOrder.customer.phone}\nTotal: $${completedOrder.pricing.totalUsd.toFixed(2)}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold py-3 px-4 rounded-xl shadow transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Order Confirmation to Telegram</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTrackingCode(completedOrder.trackingCode);
                    setIsCheckoutOpen(false);
                    setIsOrderTrackerOpen(true);
                  }}
                  className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 px-4 rounded-xl transition-colors text-xs"
                >
                  Track Delivery Live
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
