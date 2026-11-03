import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const StoreContext = createContext();

const INITIAL_FALLBACK_PRODUCTS = [
  {
    id: "prod-1",
    storeId: "uniqlo_jp",
    storeName: "UNIQLO Japan",
    name: "Soft Sheer Tank Top",
    nameKhmer: "អាវវាលក្លៀក Soft Sheer Tank Top",
    nameOriginal: "ソフトシアータンクトップ",
    sku: "UQ-JP-465712",
    priceUsd: 12.00,
    originalPriceUsd: 15.00,
    category: "women",
    isFeaturedHome: true,
    isNewArrival: true,
    badge: "SALE",
    colorCount: 6,
    colors: [
      { name: "Off White", hex: "#F8F8F8" },
      { name: "Light Gray", hex: "#C4C4C4" },
      { name: "Black", hex: "#1E1E1E" },
      { name: "Pink", hex: "#E8A598" },
      { name: "Blue", hex: "#5A7C99" }
    ],
    sizes: [
      { size: "S", stock: 12, inStock: true },
      { size: "M", stock: 18, inStock: true },
      { size: "L", stock: 9, inStock: true }
    ],
    totalStock: 39,
    stockStatus: "IN_STOCK",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80"
    ],
    originalUrl: "https://www.uniqlo.com/jp/ja/products/E465712-000"
  },
  {
    id: "prod-2",
    storeId: "uniqlo_jp",
    storeName: "UNIQLO Japan",
    name: "Sheer Check T (Long Sleeve)",
    nameKhmer: "អាវដៃវែងក្រឡាចក្រ Sheer Check",
    nameOriginal: "シアーチェックT(長袖)",
    sku: "UQ-JP-465823",
    priceUsd: 13.00,
    originalPriceUsd: 16.00,
    category: "women",
    isFeaturedHome: true,
    isNewArrival: true,
    badge: "SALE",
    colorCount: 2,
    colors: [
      { name: "Red Plaid", hex: "#B84852" },
      { name: "Monochrome Navy", hex: "#2C394B" }
    ],
    sizes: [
      { size: "S", stock: 8, inStock: true },
      { size: "M", stock: 14, inStock: true },
      { size: "L", stock: 2, inStock: true }
    ],
    totalStock: 24,
    stockStatus: "IN_STOCK",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=700&q=80"
    ],
    originalUrl: "https://www.uniqlo.com/jp/ja/products/E465823-000"
  },
  {
    id: "prod-3",
    storeId: "gu_jp",
    storeName: "GU Japan",
    name: "Smooth Sweat T (Long Sleeve) Red Stripe",
    nameKhmer: "អាវយឺតដៃវែងឆ្នូត Smooth Sweat T",
    nameOriginal: "スムーススウェットT(長袖)",
    sku: "GU-JP-351294",
    priceUsd: 17.00,
    originalPriceUsd: 22.00,
    category: "women",
    isFeaturedHome: true,
    badge: "LIMITED",
    endsDate: "Ends 29 Oct",
    colorCount: 3,
    colors: [
      { name: "Burgundy Stripe", hex: "#800020" },
      { name: "Navy Stripe", hex: "#1B2A4A" }
    ],
    sizes: [
      { size: "S", stock: 5, inStock: true },
      { size: "M", stock: 10, inStock: true },
      { size: "L", stock: 7, inStock: true }
    ],
    totalStock: 22,
    stockStatus: "IN_STOCK",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80"
    ],
    originalUrl: "https://www.gu-global.com/jp/ja/products/E351294-000"
  },
  {
    id: "prod-4",
    storeId: "gu_jp",
    storeName: "GU Japan",
    name: "Smooth Sweat T (Long Sleeve) Earth Tone",
    nameKhmer: "អាវដៃវែងពណ៌ដី Smooth Sweat T",
    nameOriginal: "スムーススウェットT(長袖)",
    sku: "GU-JP-351295",
    priceUsd: 17.00,
    originalPriceUsd: 22.00,
    category: "women",
    isFeaturedHome: true,
    badge: "LIMITED",
    endsDate: "Ends 29 Oct",
    colorCount: 5,
    colors: [
      { name: "Earth Brown", hex: "#5D4037" },
      { name: "Soft Pink", hex: "#F8BBD0" },
      { name: "Cream Beige", hex: "#FFF8E1" }
    ],
    sizes: [
      { size: "S", stock: 6, inStock: true },
      { size: "M", stock: 12, inStock: true },
      { size: "L", stock: 8, inStock: true }
    ],
    totalStock: 26,
    stockStatus: "IN_STOCK",
    images: [
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=700&q=80"
    ],
    originalUrl: "https://www.gu-global.com/jp/ja/products/E351295-000"
  }
];

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(INITIAL_FALLBACK_PRODUCTS);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('alk_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Store state with session persistence (persists on refresh, clears on browser close)
  const [selectedStore, setSelectedStoreState] = useState(() => {
    try {
      return sessionStorage.getItem('alk_selected_store') || 'uniqlo_jp';
    } catch (e) {
      return 'uniqlo_jp';
    }
  });

  const setSelectedStore = useCallback((storeId) => {
    setSelectedStoreState(storeId);
    try {
      sessionStorage.setItem('alk_selected_store', storeId);
      sessionStorage.setItem('alk_store_session_selected', 'true');
    } catch (e) {
      // ignore
    }
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('women'); // 'women', 'men', 'kids', 'baby'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Show store picker ONLY when browser first opens this website, or when browser closes and opens again.
  // DO NOT show on page refresh (sessionStorage persists across refreshes, but resets when browser closes).
  const [isStorePickerOpen, setIsStorePickerOpen] = useState(() => {
    try {
      const alreadyChosenInSession = sessionStorage.getItem('alk_store_session_selected');
      return !alreadyChosenInSession;
    } catch (e) {
      return false;
    }
  });
  // Modals
  const [storePickerTargetItem, setStorePickerTargetItem] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isStockMonitorOpen, setIsStockMonitorOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [activeTrackingCode, setActiveTrackingCode] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Authentication State (Login by Google or Manual Email)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('alk_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRedirectAction, setAuthRedirectAction] = useState(null);

  const loginWithGoogle = useCallback((customEmail = null, customName = null) => {
    const googleUser = {
      id: 'usr_g_' + Date.now(),
      name: customName || 'Bunna Kim',
      email: customEmail || 'bunna.kim@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      provider: 'google',
      phone: '012 345 678',
      joinedAt: new Date().toISOString()
    };
    setUser(googleUser);
    localStorage.setItem('alk_user', JSON.stringify(googleUser));
    setIsAuthModalOpen(false);
    if (authRedirectAction) {
      authRedirectAction();
      setAuthRedirectAction(null);
    }
    return googleUser;
  }, [authRedirectAction]);

  const loginWithEmail = useCallback((email, password) => {
    const registered = JSON.parse(localStorage.getItem('alk_registered_users') || '[]');
    const found = registered.find(u => u.email.toLowerCase() === email.toLowerCase());

    const loggedUser = found || {
      id: 'usr_e_' + Date.now(),
      name: email.split('@')[0],
      email: email,
      avatar: null,
      provider: 'email',
      phone: '',
      joinedAt: new Date().toISOString()
    };

    setUser(loggedUser);
    localStorage.setItem('alk_user', JSON.stringify(loggedUser));
    setIsAuthModalOpen(false);
    if (authRedirectAction) {
      authRedirectAction();
      setAuthRedirectAction(null);
    }
    return loggedUser;
  }, [authRedirectAction]);

  const registerWithEmail = useCallback(({ name, email, phone, password }) => {
    const newUser = {
      id: 'usr_e_' + Date.now(),
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
      phone: phone?.trim() || '',
      avatar: null,
      provider: 'email',
      joinedAt: new Date().toISOString()
    };

    const registered = JSON.parse(localStorage.getItem('alk_registered_users') || '[]');
    registered.push({ ...newUser, password });
    localStorage.setItem('alk_registered_users', JSON.stringify(registered));

    setUser(newUser);
    localStorage.setItem('alk_user', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
    if (authRedirectAction) {
      authRedirectAction();
      setAuthRedirectAction(null);
    }
    return newUser;
  }, [authRedirectAction]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('alk_user');
  }, []);

  // User Orders History State
  const [userOrders, setUserOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('alk_my_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const recordUserOrder = useCallback((order) => {
    setUserOrders(prev => {
      const updated = [order, ...prev.filter(o => o.orderId !== order.orderId)];
      localStorage.setItem('alk_my_orders', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Fetch orders from server when user is logged in
  useEffect(() => {
    if (user?.email || user?.phone) {
      const q = user.email ? `email=${encodeURIComponent(user.email)}` : `phone=${encodeURIComponent(user.phone)}`;
      fetch(`/api/orders?${q}`)
        .then(res => res.ok ? res.json() : [])
        .then(serverOrders => {
          if (Array.isArray(serverOrders) && serverOrders.length > 0) {
            setUserOrders(prev => {
              const combined = [...serverOrders];
              prev.forEach(p => {
                if (!combined.some(c => c.orderId === p.orderId)) {
                  combined.push(p);
                }
              });
              localStorage.setItem('alk_my_orders', JSON.stringify(combined));
              return combined;
            });
          }
        })
        .catch(() => {});
    }
  }, [user]);

  const updateUserProfile = useCallback((updates) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem('alk_user', JSON.stringify(updated));

      // Also update in registered users list if email provider
      try {
        const registered = JSON.parse(localStorage.getItem('alk_registered_users') || '[]');
        const idx = registered.findIndex(u => u.id === prev.id || u.email.toLowerCase() === prev.email.toLowerCase());
        if (idx !== -1) {
          registered[idx] = { ...registered[idx], ...updates };
          localStorage.setItem('alk_registered_users', JSON.stringify(registered));
        }
      } catch (e) {}

      return updated;
    });
    return true;
  }, []);

  const changePassword = useCallback((currentPassword, newPassword) => {
    if (!user) return { success: false, message: 'You must be logged in.' };
    if (!newPassword || newPassword.length < 6) {
      return { success: false, message: 'New password must be at least 6 characters.' };
    }

    try {
      const registered = JSON.parse(localStorage.getItem('alk_registered_users') || '[]');
      const idx = registered.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
      
      if (idx === -1) {
        // If user logged in via google, they can set a password for the first time
        if (user.provider === 'google') {
          registered.push({
            ...user,
            password: newPassword
          });
          localStorage.setItem('alk_registered_users', JSON.stringify(registered));
          return { success: true, message: 'Password set successfully! You can now also log in with email.' };
        }
        return { success: false, message: 'User account not found.' };
      }

      if (registered[idx].password && registered[idx].password !== currentPassword) {
        return { success: false, message: 'Current password is incorrect.' };
      }

      registered[idx].password = newPassword;
      localStorage.setItem('alk_registered_users', JSON.stringify(registered));
      return { success: true, message: 'Password changed successfully!' };
    } catch (e) {
      return { success: false, message: 'An error occurred while changing password.' };
    }
  }, [user]);

  const openAuthModal = useCallback((callback = null) => {
    if (callback && typeof callback === 'function') {
      setAuthRedirectAction(() => callback);
    }
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setAuthRedirectAction(null);
  }, []);

  // Sync state
  const [syncStatus, setSyncStatus] = useState({
    isRunning: true,
    lastSyncTime: new Date().toISOString(),
    nextSyncTime: new Date(Date.now() + 60000).toISOString(),
    totalProductsTracked: 12,
    totalUnitsInWarehouse: 380,
    recentLogs: []
  });

  // Currency
  const [currency, setCurrency] = useState('USD'); // 'USD' or 'KHR'
  const exchangeRate = 4100;

  // Save cart
  useEffect(() => {
    localStorage.setItem('alk_cart', JSON.stringify(cart));
  }, [cart]);

  // Fetch products from server (with automatic GitHub Pages static fallback)
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
          return;
        }
      }
    } catch (err) {
      // Backend not running (e.g. GitHub Pages static hosting)
    }

    // Static fallback for GitHub Pages hosting: load from ./data/products.json
    try {
      const staticRes = await fetch('./data/products.json');
      if (staticRes.ok) {
        const staticData = await staticRes.json();
        if (Array.isArray(staticData) && staticData.length > 0) {
          setProducts(staticData);
        }
      }
    } catch (staticErr) {
      console.warn('Using embedded local catalog cache');
    }
  }, []);

  // Fetch sync status
  const fetchSyncStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/sync/status');
      if (res.ok) {
        const data = await res.json();
        setSyncStatus(data);
      }
    } catch (e) {
      // offline fallback
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchSyncStatus();

    // Poll sync status & products every 15 seconds to reflect 1-minute background changes immediately
    const pollInterval = setInterval(() => {
      fetchProducts();
      fetchSyncStatus();
    }, 15000);

    return () => clearInterval(pollInterval);
  }, [fetchProducts, fetchSyncStatus]);

  // Trigger manual sync
  const triggerManualSync = async () => {
    try {
      const res = await fetch('/api/sync/trigger', { method: 'POST' });
      if (res.ok) {
        await fetchProducts();
        await fetchSyncStatus();
        return true;
      }
    } catch (err) {
      console.error('Failed manual sync:', err);
    }
    return false;
  };

  // Cart operations
  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    setCart(prev => {
      const cartItemId = `${product.id}-${selectedSize}-${selectedColor?.name || 'default'}`;
      const existing = prev.find(item => item.cartItemId === cartItemId);

      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          nameKhmer: product.nameKhmer,
          sku: product.sku,
          storeId: product.storeId,
          storeName: product.storeName,
          priceUsd: product.priceUsd,
          originalPriceUsd: product.originalPriceUsd,
          selectedSize: selectedSize || (product.sizes[0]?.size || 'M'),
          selectedColor: selectedColor || (product.colors[0] || null),
          image: product.images[0],
          quantity
        }
      ];
    });

    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
    ));
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Open store picker (Image 2)
  const openStorePicker = (item = null) => {
    setStorePickerTargetItem(item);
    setIsStorePickerOpen(true);
  };

  const closeStorePicker = () => {
    setIsStorePickerOpen(false);
    setStorePickerTargetItem(null);
    try {
      sessionStorage.setItem('alk_store_session_selected', 'true');
    } catch (e) {
      // ignore
    }
  };

  // Calculate cart totals
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.priceUsd * item.quantity), 0);
  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  // Free delivery threshold: 2 items or more (as shown in image 1: "Add 2 Items to Your Cart for Free Delivery")
  const isFreeDeliveryEligible = cartTotalItems >= 2;
  const shippingFee = cartTotalItems === 0 ? 0 : (isFreeDeliveryEligible ? 0 : 1.50);
  const cartGrandTotal = cartSubtotal + shippingFee;

  return (
    <StoreContext.Provider
      value={{
        products,
        setProducts,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartTotalItems,
        isFreeDeliveryEligible,
        shippingFee,
        cartGrandTotal,
        selectedStore,
        setSelectedStore,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isSearching,
        setIsSearching,
        isStorePickerOpen,
        openStorePicker,
        closeStorePicker,
        storePickerTargetItem,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isStockMonitorOpen,
        setIsStockMonitorOpen,
        isOrderTrackerOpen,
        setIsOrderTrackerOpen,
        activeTrackingCode,
        setActiveTrackingCode,
        selectedProduct,
        setSelectedProduct,
        syncStatus,
        triggerManualSync,
        currency,
        setCurrency,
        exchangeRate,
        user,
        setUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
        updateUserProfile,
        changePassword,
        userOrders,
        recordUserOrder
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
