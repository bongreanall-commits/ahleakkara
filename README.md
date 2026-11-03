# AH LEAK x ការ៉ា (KARA STUDIO WEAR)
### E-Commerce Platform with Real-Time 1-Minute Stock Synchronization
*Inspired by mStore.Kh Cambodia Checkout Flow & Fast Retailing Official Flagships*

---

## 🌟 Key Architecture & Features

### 1. First Home Page (Image 1 Visual Match)
- **Header**:
  - Hamburger menu with store drawer
  - Brand identity: **AH LEAK x ការ៉ា** (*KARA STUDIO WEAR*)
  - Search bar with instant autocomplete
  - Order tracking portal
  - Interactive Cart icon with badge counter
  - Dual Currency switcher: **USD ($)** and **Khmer Riel (៛ KHR)**
- **SALE & Special Deals Section**:
  - Typographic Vietnamese/English red promotional block
  - **SPECIAL DEALS** card (*"Refresh Your Everyday Wardrobe • 23.10 ▶ 29.10"*)
  - Yellow Free Delivery banner (*"Add 2 Items to Your Cart for Free Delivery"* with interactive progress tracker)
  - 2x2 featured product grid (Soft Sheer Tank Top $12, Sheer Check T $13, Smooth Sweat T $17 with SALE and LIMITED badges)
- **NEW ARRIVALS Section**:
  - Tabs: **WOMEN**, **MEN**, **KIDS**, **Baby**
  - Category showcase cards (Liberty London, Fleece Jacket, Kids Argyle, Baby Fleece Playwear)

---

### 2. "Choose your Favorite Store" Modal (Image 2 Popup)
- Automatically triggers whenever a user clicks on any item, category, or promotional banner.
- Visual clone of **Image 2**:
  - **GU Japan** (`https://www.gu-global.com/jp/ja/`)
  - **UNIQLO Japan** (`https://www.uniqlo.com/jp/ja/`)
  - **UNIQLO Vietnam** (`https://www.uniqlo.com/vn/en/`)
- Bottom action pill:
  - `👆 ចុចទីនេះដើម្បីបើក • Tap here to open [Store Catalog]`
  - `⚡ Order faster • 🚚 track orders`

---

### 3. mStore.Kh Cambodia Checkout Flow
- **Slide-over Cart Drawer**:
  - Real-time stock boundaries, size & color variants
  - Free delivery threshold counter (2+ items = Free delivery nationwide)
  - Coupon code system (e.g. `AHLEAK10`, `FREESHIP`)
- **4-Step Multi-Stage Checkout**:
  1. **Customer & Delivery Info**: Name, Cambodian Phone (`+855`), Telegram handle, Province dropdown (Phnom Penh, Kandal, Siem Reap, Battambang, etc.), Khan, Sangkat, Street Address.
  2. **Shipping Options**: Phnom Penh Express Courier (1-2 days) & Provinces Express via Virak Buntham / J&T (2-3 days).
  3. **Payment Methods**:
     - **KHQR (Bakong / ABA Mobile / ACLEDA / Wing)**: Dynamic QR generator with merchant details, USD/KHR amount, and slip upload.
     - **Cash on Delivery (COD)**: Pay when the package is delivered.
     - **ABA Direct Transfer**: Account `000 892 119` (AH LEAK X KARA).
  4. **Confirmation & Receipt**:
     - Confetti celebration
     - Unique Order ID (`ALK-XXXXXX`) and Express Tracking Number (`KH-EXP-XXXXXX`)
     - One-click Telegram order submission button (`t.me/AhLeakKaraSupport`)
     - Real-time stock inventory reservation

---

### 4. Automatic 1-Minute Stock Synchronization Engine
- Runs as a persistent background daemon in `server/syncEngine.js`.
- Automatically polls stock availability and counts **every 60 seconds**.
- Maintains an audit history of changes (depletions, warehouse restocks, order reservations).
- Live pulse indicator on the header and dedicated **Live Stock Monitor Drawer** with manual *"Force Sync Now"* trigger.

---

## 🚀 How to Run the Website

### Start Backend + Frontend (Unified Production Mode):
```bash
npm start
```
*Open `http://localhost:5000` in your web browser.*

### Start in Full Concurrent Development Mode (with Live Reload):
```bash
npm run dev
```
- Express Backend: `http://localhost:5000`
- Vite React Client: `http://localhost:5173`
