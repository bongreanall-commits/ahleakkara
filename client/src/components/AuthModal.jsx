import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  LogOut, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Package, 
  Settings, 
  KeyRound, 
  MapPin, 
  Truck, 
  Clock, 
  CreditCard, 
  ExternalLink,
  ChevronRight,
  Check,
  AlertCircle,
  Copy,
  ShoppingBag
} from 'lucide-react';

const CAMBODIA_PROVINCES = [
  'Phnom Penh (រាជធានីភ្នំពេញ)',
  'Kandal (ខេត្តកណ្តាល)',
  'Siem Reap (ខេត្តសៀមរាប)',
  'Battambang (ខេត្តបាត់ដំបង)',
  'Preah Sihanouk (ខេត្តព្រះសីហនុ)',
  'Kampong Cham (ខេត្តកំពង់ចាម)',
  'Kampot (ខេត្តកំពត)',
  'Takeo (ខេត្តតាកែវ)',
  'Kampong Speu (ខេត្តកំពង់ស្ពឺ)',
  'Prey Veng (ខេត្តព្រៃវែង)',
  'Svay Rieng (ខេត្តស្វាយរៀង)',
  'Kampong Chhnang (ខេត្តកំពង់ឆ្នាំង)',
  'Kampong Thom (ខេត្តកំពង់ធំ)',
  'Banteay Meanchey (ខេត្តបន្ទាយមានជ័យ)',
  'Pursat (ខេត្តពោធិ៍សាត់)',
  'Koh Kong (ខេត្តកោះកុង)',
  'Kep (ខេត្តកែប)',
  'Pailin (ខេត្តប៉ៃលិន)',
  'Kratie (ខេត្តក្រចេះ)',
  'Stung Treng (ខេត្តស្ទឹងត្រែង)',
  'Ratanakiri (ខេត្តរតនគិរី)',
  'Mondulkiri (ខេត្តមណ្ឌលគិរី)',
  'Preah Vihear (ខេត្តព្រះវិហារ)',
  'Oddar Meanchey (ខេត្តឧត្តរមានជ័យ)',
  'Tboung Khmum (ខេត្តត្បូងឃ្មុំ)'
];

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80'
];

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    user, 
    loginWithGoogle, 
    loginWithEmail, 
    registerWithEmail, 
    logout,
    updateUserProfile,
    changePassword,
    userOrders,
    setActiveTrackingCode,
    setIsOrderTrackerOpen,
    currency,
    exchangeRate
  } = useStore();

  // Tab Navigation for Logged-In User: 'orders' | 'settings' | 'password' | 'addresses'
  const [activeTab, setActiveTab] = useState('orders');

  // Login / Register Mode
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Settings Form State
  const [editName, setEditName] = useState(() => user?.name || '');
  const [editPhone, setEditPhone] = useState(() => user?.phone || '');
  const [editProvince, setEditProvince] = useState(() => user?.province || 'Phnom Penh (រាជធានីភ្នំពេញ)');
  const [editDistrict, setEditDistrict] = useState(() => user?.district || '');
  const [editAddress, setEditAddress] = useState(() => user?.address || '');
  const [editAvatar, setEditAvatar] = useState(() => user?.avatar || PRESET_AVATARS[0]);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Change Password Form State
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdMsg, setPwdMsg] = useState({ text: '', type: '' });

  // Address Book state
  const [savedAddresses, setSavedAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('alk_saved_addresses');
      return saved ? JSON.parse(saved) : [
        {
          id: 'addr-1',
          label: 'Home (ផ្ទះ)',
          isDefault: true,
          recipient: user?.name || 'Bunna Kim',
          phone: user?.phone || '012 345 678',
          province: 'Phnom Penh (រាជធានីភ្នំពេញ)',
          detail: 'No. 24, St. 310, Boeung Keng Kang 1, Phnom Penh'
        }
      ];
    } catch (e) {
      return [];
    }
  });
  const [newAddrLabel, setNewAddrLabel] = useState('');
  const [newAddrProvince, setNewAddrProvince] = useState('Phnom Penh (រាជធានីភ្នំពេញ)');
  const [newAddrDetail, setNewAddrDetail] = useState('');
  const [showAddAddrForm, setShowAddAddrForm] = useState(false);

  // Keep state synced with user
  React.useEffect(() => {
    if (user) {
      setEditName(user.name || '');
      setEditPhone(user.phone || '');
      setEditProvince(user.province || 'Phnom Penh (រាជធានីភ្នំពេញ)');
      setEditDistrict(user.district || '');
      setEditAddress(user.address || '');
      setEditAvatar(user.avatar || PRESET_AVATARS[0]);
    }
  }, [user]);

  if (!isAuthModalOpen) return null;

  const formatPrice = (usd) => {
    if (currency === 'KHR') {
      return `៛${Math.round(usd * exchangeRate).toLocaleString()}`;
    }
    return `$${usd.toFixed(2)}`;
  };

  const handleGoogleClick = () => {
    setIsLoading(true);
    setAuthError('');
    setTimeout(() => {
      loginWithGoogle();
      setIsLoading(false);
    }, 400);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    if (!authEmail.trim() || !authPassword.trim()) {
      setAuthError('Please fill in email and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (authMode === 'register') {
        if (!authName.trim()) {
          setAuthError('Please provide your full name.');
          setIsLoading(false);
          return;
        }
        registerWithEmail({
          name: authName,
          email: authEmail,
          phone: authPhone,
          password: authPassword
        });
      } else {
        loginWithEmail(authEmail, authPassword);
      }
      setIsLoading(false);
    }, 400);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({
      name: editName.trim(),
      phone: editPhone.trim(),
      province: editProvince,
      district: editDistrict.trim(),
      address: editAddress.trim(),
      avatar: editAvatar
    });
    setSaveSuccessMsg('Profile updated successfully! (ព័ត៌មានត្រូវបានកែប្រែដោយជោគជ័យ)');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    setPwdMsg({ text: '', type: '' });

    if (newPwd.length < 6) {
      setPwdMsg({ text: 'New password must be at least 6 characters.', type: 'error' });
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdMsg({ text: 'New password and confirmation do not match.', type: 'error' });
      return;
    }

    const res = changePassword(currentPwd, newPwd);
    if (res.success) {
      setPwdMsg({ text: res.message, type: 'success' });
      setCurrentPwd('');
      setNewPwd('');
      setConfirmPwd('');
      setTimeout(() => setPwdMsg({ text: '', type: '' }), 4000);
    } else {
      setPwdMsg({ text: res.message, type: 'error' });
    }
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddrDetail.trim()) return;

    const newAddr = {
      id: 'addr-' + Date.now(),
      label: newAddrLabel.trim() || 'Other',
      isDefault: savedAddresses.length === 0,
      recipient: user?.name || 'Customer',
      phone: user?.phone || '',
      province: newAddrProvince,
      detail: newAddrDetail.trim()
    };

    const updated = [...savedAddresses, newAddr];
    setSavedAddresses(updated);
    localStorage.setItem('alk_saved_addresses', JSON.stringify(updated));
    setNewAddrLabel('');
    setNewAddrDetail('');
    setShowAddAddrForm(false);
  };

  const handleDeleteAddress = (id) => {
    const updated = savedAddresses.filter(a => a.id !== id);
    setSavedAddresses(updated);
    localStorage.setItem('alk_saved_addresses', JSON.stringify(updated));
  };

  const handleSetDefaultAddress = (id) => {
    const updated = savedAddresses.map(a => ({
      ...a,
      isDefault: a.id === id
    }));
    setSavedAddresses(updated);
    localStorage.setItem('alk_saved_addresses', JSON.stringify(updated));
  };

  const handleTrackOrderClick = (trackingCode) => {
    setActiveTrackingCode(trackingCode);
    closeAuthModal();
    setIsOrderTrackerOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeAuthModal}
      />

      {/* Modal Dialog */}
      <div className={`relative bg-white w-full ${user ? 'max-w-2xl' : 'max-w-md'} rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 my-auto flex flex-col max-h-[92vh]`}>
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-black text-xl text-[#ED1D24]">AH LEAK x ការ៉ា</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm font-semibold text-gray-800 font-khmer">
              {user ? 'គណនីអតិថិជន (Member Account)' : 'ចូលគណនី (Sign In)'}
            </span>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LOGGED IN VIEW: FULL SHOPPING PROFILE WITH TABS */}
        {user ? (
          <div className="flex flex-col flex-1 overflow-hidden">
            
            {/* User Profile Header Card */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 sm:p-5 shrink-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#E8590C] shadow-lg shrink-0">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-red-600 to-amber-500 text-white flex items-center justify-center font-black text-2xl">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-black text-white">{user.name}</h3>
                      <span className="bg-[#E8590C] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        VIP Member
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 mt-0.5">{user.email}</p>
                    <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                      {user.phone ? `Tel: ${user.phone}` : 'No phone set'} • Provider: {user.provider === 'google' ? 'Google' : 'Email'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="self-start sm:self-center flex items-center gap-1.5 bg-white/10 hover:bg-red-600 text-white text-xs font-bold py-1.5 px-3 rounded-lg border border-white/20 transition-all cursor-pointer"
                  title="Sign out of your account"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 sm:gap-4 mt-5 border-t border-gray-700/60 pt-3 overflow-x-auto text-xs font-bold whitespace-nowrap scrollbar-none">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'orders' 
                      ? 'bg-red-600 text-white shadow-sm' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>My Orders</span>
                  {userOrders.length > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      activeTab === 'orders' ? 'bg-white text-red-600' : 'bg-red-600 text-white'
                    }`}>
                      {userOrders.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'settings' 
                      ? 'bg-red-600 text-white shadow-sm' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Account Settings</span>
                </button>

                <button
                  onClick={() => setActiveTab('password')}
                  className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'password' 
                      ? 'bg-red-600 text-white shadow-sm' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Security & Password</span>
                </button>

                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'addresses' 
                      ? 'bg-red-600 text-white shadow-sm' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Address Book</span>
                </button>
              </div>
            </div>

            {/* Scrollable Tab Content */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-gray-50/50">
              
              {/* TAB 1: VIEW ORDERED (MY ORDERS) */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-gray-900 flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-red-600" />
                        <span>Order History & Packages (ប្រវត្តិនៃការបញ្ជាទិញ)</span>
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Track deliveries, inspect items, and review past receipts
                      </p>
                    </div>
                  </div>

                  {userOrders.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
                      <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                        <Package className="w-8 h-8" />
                      </div>
                      <h5 className="font-bold text-gray-800 text-sm">No Orders Placed Yet</h5>
                      <p className="text-xs text-gray-500 max-w-sm mx-auto">
                        You have not placed any orders yet. Discover authentic collections from GU Japan and UNIQLO now!
                      </p>
                      <button
                        onClick={closeAuthModal}
                        className="bg-[#ED1D24] hover:bg-red-700 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
                      >
                        <span>Start Shopping</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {userOrders.map((order) => {
                        const dateFormatted = new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        });

                        return (
                          <div 
                            key={order.orderId}
                            className="bg-white rounded-xl border border-gray-200 shadow-xs hover:shadow-md transition-all p-4 space-y-3"
                          >
                            {/* Order Header */}
                            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-gray-100">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-black text-sm text-gray-900 font-mono">
                                    {order.orderId}
                                  </span>
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    {order.status || 'CONFIRMED'}
                                  </span>
                                </div>
                                <span className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                                  <Clock className="w-3 h-3" />
                                  <span>{dateFormatted}</span>
                                </span>
                              </div>

                              <div className="text-right">
                                <span className="text-sm font-black text-red-600 block">
                                  ${order.pricing?.totalUsd?.toFixed(2) || '0.00'}
                                </span>
                                <span className="text-[10px] text-gray-500 font-mono">
                                  {order.paymentMethod?.name || order.paymentMethod?.type || 'KHQR'}
                                </span>
                              </div>
                            </div>

                            {/* Order Items Preview */}
                            <div className="space-y-2">
                              {order.items?.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    {item.image && (
                                      <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-10 h-10 object-cover rounded-lg border border-gray-200 shrink-0" 
                                      />
                                    )}
                                    <div className="min-w-0">
                                      <span className="font-bold text-gray-900 block truncate">
                                        {item.name}
                                      </span>
                                      <span className="text-[11px] text-gray-500">
                                        Size: {item.selectedSize} • {item.selectedColor?.name || 'Standard'} • Qty: {item.quantity}
                                      </span>
                                    </div>
                                  </div>
                                  <span className="font-bold text-gray-800 ml-2 shrink-0">
                                    ${(item.priceUsd * item.quantity).toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {/* Delivery & Tracking Footer */}
                            <div className="pt-2.5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 bg-gray-50/60 -mx-4 -mb-4 p-3 rounded-b-xl">
                              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                <Truck className="w-3.5 h-3.5 text-gray-400" />
                                <span className="font-medium">Tracking:</span>
                                <span className="font-mono font-bold text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-200">
                                  {order.trackingCode}
                                </span>
                              </div>

                              <button
                                onClick={() => handleTrackOrderClick(order.trackingCode)}
                                className="bg-[#ED1D24] hover:bg-red-700 text-white text-[11px] font-bold py-1.5 px-3 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                              >
                                <span>Track Package</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: ACCOUNT SETTINGS */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="pb-2 border-b border-gray-200">
                    <h4 className="font-bold text-sm sm:text-base text-gray-900 flex items-center gap-2">
                      <Settings className="w-4 h-4 text-red-600" />
                      <span>Edit Profile Information (កែប្រែព័ត៌មានគណនី)</span>
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Update your contact details and default delivery destination
                    </p>
                  </div>

                  {saveSuccessMsg && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{saveSuccessMsg}</span>
                    </div>
                  )}

                  {/* Preset Avatar Selection */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-2">
                      Select Profile Picture (ជ្រើសរើសរូបតំណាង)
                    </label>
                    <div className="flex items-center gap-3">
                      {PRESET_AVATARS.map((avUrl, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setEditAvatar(avUrl)}
                          className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                            editAvatar === avUrl ? 'border-red-600 scale-105 shadow-md ring-2 ring-red-200' : 'border-gray-200 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={avUrl} alt="Avatar" className="w-full h-full object-cover" />
                          {editAvatar === avUrl && (
                            <div className="absolute inset-0 bg-red-600/30 flex items-center justify-center">
                              <Check className="w-4 h-4 text-white drop-shadow" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Full Name (ឈ្មោះពេញ) *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="e.g. Bunna Kim"
                          className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Phone Number (លេខទូរស័ព្ទ) *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                          placeholder="e.g. 012 345 678"
                          className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Primary Province / City (ខេត្ត/រាជធានី)
                      </label>
                      <select
                        value={editProvince}
                        onChange={(e) => setEditProvince(e.target.value)}
                        className="w-full text-xs sm:text-sm p-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 font-khmer"
                      >
                        {CAMBODIA_PROVINCES.map((p, idx) => (
                          <option key={idx} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        District / Khan (ខណ្ឌ/ស្រុក)
                      </label>
                      <input
                        type="text"
                        value={editDistrict}
                        onChange={(e) => setEditDistrict(e.target.value)}
                        placeholder="e.g. Boeung Keng Kang"
                        className="w-full text-xs sm:text-sm p-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Street Address & House No. (អាសយដ្ឋានលម្អិត)
                    </label>
                    <textarea
                      rows={2}
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      placeholder="Street #, House #, Apartment or Landmark..."
                      className="w-full text-xs sm:text-sm p-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#ED1D24] hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save Changes (រក្សាទុកព័ត៌មាន)</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: SECURITY & CHANGE PASSWORD */}
              {activeTab === 'password' && (
                <div className="space-y-4">
                  <div className="pb-2 border-b border-gray-200">
                    <h4 className="font-bold text-sm sm:text-base text-gray-900 flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-red-600" />
                      <span>Security & Password (សុវត្ថិភាព និងពាក្យសម្ងាត់)</span>
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Change your password or manage linked authentication
                    </p>
                  </div>

                  {/* Provider Info Banner */}
                  <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        {user.provider === 'google' ? 'G' : '✉'}
                      </div>
                      <div>
                        <span className="font-bold text-xs text-gray-900 block">
                          Linked with {user.provider === 'google' ? 'Google Account' : 'Email Address'}
                        </span>
                        <span className="text-[11px] text-gray-500">{user.email}</span>
                      </div>
                    </div>
                    <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-green-200 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                      <span>Active & Secured</span>
                    </span>
                  </div>

                  {/* Alert Feedback */}
                  {pwdMsg.text && (
                    <div className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                      pwdMsg.type === 'success' 
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                        : 'bg-red-50 border border-red-200 text-red-700'
                    }`}>
                      {pwdMsg.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      )}
                      <span>{pwdMsg.text}</span>
                    </div>
                  )}

                  {/* Password Form */}
                  <form onSubmit={handleChangePasswordSubmit} className="space-y-3.5 bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
                    {user.provider !== 'google' && (
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">
                          Current Password (ពាក្យសម្ងាត់បច្ចុប្បន្ន) *
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                          <input
                            type="password"
                            required
                            value={currentPwd}
                            onChange={(e) => setCurrentPwd(e.target.value)}
                            placeholder="Enter current password"
                            className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        New Password (ពាក្យសម្ងាត់ថ្មី) *
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="password"
                          required
                          value={newPwd}
                          onChange={(e) => setNewPwd(e.target.value)}
                          placeholder="At least 6 characters"
                          className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Confirm New Password (បញ្ជាក់ពាក្យសម្ងាត់ថ្មី) *
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="password"
                          required
                          value={confirmPwd}
                          onChange={(e) => setConfirmPwd(e.target.value)}
                          placeholder="Re-enter new password"
                          className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#ED1D24] hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <KeyRound className="w-4 h-4" />
                      <span>Update Password (ផ្លាស់ប្តូរពាក្យសម្ងាត់)</span>
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 4: SAVED ADDRESSES */}
              {activeTab === 'addresses' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-gray-900 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-600" />
                        <span>Saved Address Book (សៀវភៅអាសយដ្ឋាន)</span>
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Addresses for swift express checkout across Cambodia
                      </p>
                    </div>

                    <button
                      onClick={() => setShowAddAddrForm(!showAddAddrForm)}
                      className="bg-gray-900 hover:bg-black text-white text-xs font-bold py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
                    >
                      {showAddAddrForm ? 'Cancel' : '+ Add Address'}
                    </button>
                  </div>

                  {/* Add New Address Sub-form */}
                  {showAddAddrForm && (
                    <form onSubmit={handleAddAddress} className="bg-white rounded-xl border border-red-200 p-4 space-y-3 animate-in fade-in">
                      <h5 className="font-bold text-xs text-gray-900">Add New Shipping Address</h5>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          value={newAddrLabel}
                          onChange={(e) => setNewAddrLabel(e.target.value)}
                          placeholder="Label (e.g. Home / Office)"
                          className="text-xs border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                        <select
                          value={newAddrProvince}
                          onChange={(e) => setNewAddrProvince(e.target.value)}
                          className="text-xs border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-red-500 font-khmer"
                        >
                          {CAMBODIA_PROVINCES.map((p, i) => (
                            <option key={i} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>

                      <textarea
                        required
                        rows={2}
                        value={newAddrDetail}
                        onChange={(e) => setNewAddrDetail(e.target.value)}
                        placeholder="Street #, House #, Sangkat, Landmark..."
                        className="w-full text-xs border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                      />

                      <button
                        type="submit"
                        className="w-full bg-[#ED1D24] hover:bg-red-700 text-white text-xs font-bold py-2 rounded-lg cursor-pointer"
                      >
                        Save Address
                      </button>
                    </form>
                  )}

                  {/* Address List */}
                  <div className="space-y-2.5">
                    {savedAddresses.map((addr) => (
                      <div 
                        key={addr.id}
                        className={`bg-white rounded-xl border p-3.5 flex items-start justify-between gap-3 transition-all ${
                          addr.isDefault ? 'border-red-500 shadow-xs ring-1 ring-red-100' : 'border-gray-200'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-gray-900">{addr.label}</span>
                            {addr.isDefault && (
                              <span className="bg-red-50 text-red-600 text-[9px] font-bold px-2 py-0.2 rounded-full border border-red-200">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">{addr.detail}</p>
                          <span className="text-[11px] text-gray-400 font-medium block">{addr.province}</span>
                        </div>

                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          {!addr.isDefault && (
                            <button
                              type="button"
                              onClick={() => handleSetDefaultAddress(addr.id)}
                              className="text-[10px] text-gray-500 hover:text-red-600 font-bold underline cursor-pointer"
                            >
                              Set as Default
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="text-[10px] text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>
          </div>
        ) : (

          /* LOGGED OUT VIEW: SIGN IN / REGISTER FORM */
          <div className="p-6">
            <div className="text-center mb-5">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                {authMode === 'login' ? 'Welcome Back!' : 'Create an Account'}
              </h2>
              <p className="text-xs text-gray-500 font-khmer mt-1">
                {authMode === 'login' 
                  ? 'សូមចូលគណនីដើម្បីគ្រប់គ្រង និងតាមដានការបញ្ជាទិញ' 
                  : 'ចុះឈ្មោះដើម្បីទិញទំនិញ និងទូទាត់ប្រាក់បានរហ័ស'}
              </p>
            </div>

            {/* OPTION 1: 1-CLICK GOOGLE SIGN IN */}
            <button
              type="button"
              onClick={handleGoogleClick}
              disabled={isLoading}
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
              <span>Continue with Google Account</span>
            </button>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-gray-400 font-medium font-khmer">
                  ឬប្រើអ៊ីមែល (Or with Email)
                </span>
              </div>
            </div>

            {/* Error Alert */}
            {authError && (
              <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
                {authError}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              {authMode === 'register' && (
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Full Name (ឈ្មោះពេញ) *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder="e.g. Bunna Kim"
                      className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Email Address (អ៊ីមែល) *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {authMode === 'register' && (
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Phone Number (លេខទូរស័ព្ទ)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={authPhone}
                      onChange={(e) => setAuthPhone(e.target.value)}
                      placeholder="012 345 678"
                      className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Password (ពាក្យសម្ងាត់) *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#ED1D24] hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <span>Processing...</span>
                ) : authMode === 'login' ? (
                  <span>Sign In (ចូលគណនី)</span>
                ) : (
                  <span>Create Account (ចុះឈ្មោះ)</span>
                )}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Mode Toggle Link */}
            <div className="mt-5 text-center text-xs text-gray-600">
              {authMode === 'login' ? (
                <span>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('register');
                      setAuthError('');
                    }}
                    className="font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    Create Account (ចុះឈ្មោះថ្មី)
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setAuthError('');
                    }}
                    className="font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    Sign In (ចូលគណនី)
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
