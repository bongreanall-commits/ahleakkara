import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { syncEngine } from './syncEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory orders store (with file persistence)
const ORDERS_FILE = path.join(__dirname, 'data', 'orders.json');
let orders = [];
try {
  if (fs.existsSync(ORDERS_FILE)) {
    orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'));
  }
} catch (e) {
  orders = [];
}

const saveOrders = () => {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error saving orders:', e);
  }
};

// API: Health & Store Info
app.get('/api/info', (req, res) => {
  res.json({
    name: 'AH LEAK x ការ៉ា',
    tagline: 'Authentic GU & UNIQLO Fashion Delivery in Cambodia',
    connectedStores: [
      { id: 'gu_jp', name: 'GU Japan', url: 'https://www.gu-global.com/jp/ja/' },
      { id: 'uniqlo_jp', name: 'UNIQLO Japan', url: 'https://www.uniqlo.com/jp/ja/' },
      { id: 'uniqlo_vn', name: 'UNIQLO Vietnam', url: 'https://www.uniqlo.com/vn/en/' }
    ],
    checkoutEngine: 'Cambodia Delivery & KHQR Flow',
    stockSyncInterval: 'Every 60 seconds (1 minute)'
  });
});

// API: Get Products
app.get('/api/products', (req, res) => {
  const { storeId, category, search, featured } = req.query;
  let products = syncEngine.getProducts();

  if (storeId && storeId !== 'all') {
    products = products.filter(p => p.storeId === storeId);
  }
  if (category && category !== 'all') {
    products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  if (featured === 'true') {
    products = products.filter(p => p.isFeaturedHome);
  }
  if (search) {
    const s = search.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(s) || 
      (p.nameKhmer && p.nameKhmer.toLowerCase().includes(s)) ||
      (p.nameOriginal && p.nameOriginal.toLowerCase().includes(s)) ||
      p.sku.toLowerCase().includes(s) ||
      p.storeName.toLowerCase().includes(s)
    );
  }

  res.json(products);
});

// API: Get Single Product
app.get('/api/products/:id', (req, res) => {
  const products = syncEngine.getProducts();
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// API: Sync Status & Trigger
app.get('/api/sync/status', (req, res) => {
  res.json(syncEngine.getStatus());
});

app.post('/api/sync/trigger', async (req, res) => {
  const result = await syncEngine.syncAllProducts('MANUAL_USER_REQUEST');
  res.json(result);
});

app.get('/api/sync/logs', (req, res) => {
  res.json(syncEngine.syncHistory);
});

// API: Create Order (Cambodia checkout)
app.post('/api/orders', (req, res) => {
  try {
    const {
      customer,
      items,
      shippingMethod,
      paymentMethod,
      pricing
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    if (!customer || !customer.phone || !customer.fullName) {
      return res.status(400).json({ error: 'Customer phone and name are required' });
    }

    const orderId = `ALK-${Date.now().toString().slice(-6)}`;
    const trackingCode = `KH-EXP-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      orderId,
      trackingCode,
      createdAt: new Date().toISOString(),
      status: 'CONFIRMED', // CONFIRMED, PROCESSING, IN_TRANSIT, DELIVERED
      customer: {
        fullName: customer.fullName,
        phone: customer.phone,
        telegram: customer.telegram || '',
        province: customer.province || 'Phnom Penh',
        district: customer.district || '',
        commune: customer.commune || '',
        addressDetail: customer.addressDetail || '',
        notes: customer.notes || ''
      },
      shippingMethod: shippingMethod || {
        name: 'Express Delivery (Phnom Penh 1-2 Days)',
        fee: 1.50
      },
      paymentMethod: paymentMethod || {
        type: 'KHQR',
        name: 'KHQR (Bakong / ABA / ACLEDA)'
      },
      items,
      pricing: {
        subtotal: pricing?.subtotal || items.reduce((acc, it) => acc + (it.priceUsd * it.quantity), 0),
        discount: pricing?.discount || 0,
        shippingFee: pricing?.shippingFee || 0,
        totalUsd: pricing?.totalUsd || 0,
        totalKhr: Math.round((pricing?.totalUsd || 0) * 4100)
      },
      statusTimeline: [
        { status: 'ORDER_PLACED', time: new Date().toISOString(), note: 'Order placed by customer' },
        { status: 'PAYMENT_PENDING_CONFIRMATION', time: new Date().toISOString(), note: 'Payment receipt received' }
      ]
    };

    // Decrement stock in real-time
    syncEngine.decrementStockForOrder(items);

    orders.unshift(newOrder);
    saveOrders();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order: newOrder
    });
  } catch (error) {
    console.error('Failed to create order:', error);
    res.status(500).json({ error: 'Failed to process order' });
  }
});

// API: List Orders for User
app.get('/api/orders', (req, res) => {
  const { email, phone, userId } = req.query;
  let userOrders = orders;
  if (email) {
    userOrders = userOrders.filter(o => 
      (o.account && o.account.userEmail?.toLowerCase() === email.toLowerCase()) ||
      (o.customer && o.customer.email?.toLowerCase() === email.toLowerCase())
    );
  } else if (phone) {
    userOrders = userOrders.filter(o => o.customer && o.customer.phone === phone);
  } else if (userId) {
    userOrders = userOrders.filter(o => o.account && o.account.userId === userId);
  }
  res.json(userOrders);
});

// API: Track Order
app.get('/api/orders/:identifier', (req, res) => {
  const identifier = req.params.identifier.trim();
  const order = orders.find(o => 
    o.orderId.toLowerCase() === identifier.toLowerCase() ||
    o.trackingCode.toLowerCase() === identifier.toLowerCase() ||
    o.customer.phone === identifier
  );
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

// Serve static client assets in production if built
const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Start Server & Sync Daemon
app.listen(PORT, () => {
  console.log(`[AH LEAK x KARA] Server running on http://localhost:${PORT}`);
  // Start the 60s stock synchronizer
  syncEngine.start();
});
