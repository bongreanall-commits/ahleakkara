import React from 'react';
import { StoreProvider } from './context/StoreContext';
import Header from './components/Header';
import BannerPromo from './components/BannerPromo';
import NewArrivals from './components/NewArrivals';
import StoreCatalog from './components/StoreCatalog';
import StorePickerModal from './components/StorePickerModal';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import StockMonitorDrawer from './components/StockMonitorDrawer';
import OrderTrackerModal from './components/OrderTrackerModal';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      {/* 1. Header with Logo "AH LEAK x ការ៉ា", Search, User, Cart */}
      <Header />

      {/* 2. Top Promotional Grid (Pixel-Perfect match to Image 1 top section) */}
      <main className="flex-1">
        <BannerPromo />

        {/* 3. NEW ARRIVALS & Category Showcase (Pixel-Perfect match to Image 1 bottom section) */}
        <NewArrivals />

        {/* 4. Complete Store Catalog (GU Japan, Uniqlo Japan, Uniqlo Vietnam with in-stock filtering) */}
        <StoreCatalog />
      </main>

      {/* 5. Footer with store info, Cambodia delivery, KHQR payments */}
      <Footer />

      {/* Interactive Modals */}
      {/* First choice store picker: Image 2 */}
      <StorePickerModal />

      {/* Product Quick Buy / Detail Modal (Step 2 - direct item interaction) */}
      <ProductDetailModal />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Cambodia Checkout Flow with KHQR */}
      <CheckoutModal />

      {/* 1-Minute Live Stock Synchronizer Monitor */}
      <StockMonitorDrawer />

      {/* Order Tracker */}
      <OrderTrackerModal />

      {/* Customer Login / Account Modal */}
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
