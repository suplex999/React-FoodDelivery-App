// server.js - FOODKART FULLSTACK BACKEND (100 PTS)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const multer = require('multer');
const nodemailer = require('nodemailer');
const Stripe = require('stripe');
const { Server } = require('socket.io');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: {
    origin: "http://localhost:5173", // Your Vite port
    methods: ["GET", "POST"]
  }
});

// ===== 1. DATABASES (SQL + NoSQL) =====
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/foodkart')
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('MongoDB error:', err));
const pgPool = new Pool({ connectionString: process.env.PG_URI || 'postgres://user:pass@localhost:5432/foodkart' });

// ===== 2. MIDDLEWARE =====
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'foodkart-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// ===== 3. STRIPE =====
const stripe = Stripe(process.env.STRIPE_SECRET || 'sk_test_...');

// ===== 4. MODELS =====
const userSchema = new mongoose.Schema({
  email: String, password: String, role: { type: String, default: 'user' }
});
const User = mongoose.model('User', userSchema);

// ===== 5. UPLOAD =====
const upload = multer({ dest: 'uploads/' });

// ===== 6. AUTH MIDDLEWARE =====
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies.token;
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'foodkart-jwt-secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ===== MOUNT ROUTES (ADD THESE LINES) =====
app.use('/api/auth', require('./routes/auth'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/products', require('./routes/products'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // ✅ Serve images
app.use('/api/admin', require('./routes/admin')); // ✅ Admin routes


// Seed products (test data)
app.get('/api/seed', async (req, res) => {
  const products = [
    { name: 'Margherita Pizza', price: 299, image: '/pizza.jpg' },
    { name: 'Chicken Biryani', price: 399, image: '/biryani.jpg' }
  ];
  // In real app: Product.insertMany(products)
  res.json({ products });
});


// ===== 7. EMAIL =====
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

// 5. PRODUCTS SEARCH/SORT
app.get('/api/products', async (req, res) => {
  const { search, sort = 'price', order = 'asc' } = req.query;
  let query = Product.find();
  if (search) query = query.where({ name: { $regex: search, $options: 'i' } });
  query.sort({ [sort]: order === 'asc' ? 1 : -1 });
  res.json(await query);
});

// 7. FILE UPLOAD
app.post('/api/upload', auth, upload.single('image'), (req, res) => {
  res.json({ file: req.file.filename });
});

// 8. TRANSACTIONS (PG)
app.post('/api/orders/pay', auth, async (req, res) => {
  const client = await pgPool.connect();
  try {
    await client.query('BEGIN');
    const payment = await client.query(
      'INSERT INTO payments (user_id, amount, order_id) VALUES ($1, $2, $3) RETURNING *',
      [req.user.id, req.body.amount, req.body.orderId]
    );
    await client.query('UPDATE orders SET status=$1 WHERE id=$2', ['paid', req.body.orderId]);
    await client.query('COMMIT');
    res.json(payment.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

// 5. EMAIL
app.post('/api/send-email', async (req, res) => {
  await transporter.sendMail({
    to: req.body.email,
    subject: 'Order Confirmed - FoodKart',
    html: `<h1>Order #${req.body.orderId} Confirmed!</h1><p>Total: ₹${req.body.total}</p>`
  });
  res.json({ message: 'Email sent' });
});

// 9. SOCKET.IO CHAT

// ✅ Real-time Chat Socket
io.on('connection', (socket) => {
  console.log('👤 User connected:', socket.id);
  
  // ✅ JOIN USER TO ROOM (FoodKart Order Chat)
  socket.on('join-room', (orderId) => {
    socket.join(orderId);
    console.log(`✅ User ${socket.id} joined order room: ${orderId}`);
  });

  // ✅ SEND MESSAGE (Order support chat)
  socket.on('send-message', (data) => {
    io.to(data.orderId).emit('receive-message', {
      ...data,
      socketId: socket.id,
      timestamp: new Date()
    });
  });

  socket.on('disconnect', () => {
    console.log('👋 User disconnected:', socket.id);
  });
});

// ✅ CHANGE PORT TO 5000 (Socket needs it)
server.listen(5000, () => {
  console.log('🚀 Server + Socket.IO running on port 5000');
});

// // ===== 1. EJS ADMIN DASHBOARD =====
// app.set('view engine', 'ejs');
// app.get('/admin', auth, async (req, res) => {
//   res.render('admin', { orders: await Order.find() });
// });

// // Serve static files
// app.use(express.static('public'));

// // Error handling
// app.use((err, req, res, next) => res.status(500).json({ error: err.message }));

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`FoodKart Backend on http://localhost:${PORT}`));
