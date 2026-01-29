// server.js - Root of project (next to db.json)
const jsonServer = require('json-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const PORT = 3001;
const JWT_SECRET = 'your-super-secret-key-change-in-production';  // Use env var

app.use(middlewares);

// Middleware: Verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // Attach user info to req
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// User Registration Endpoint
app.post('/register', async (req, res, next) => {
  try {
    const { email, password, ...userData } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Check if user exists
    const users = app.db.get('users');
    const existingUser = await users.find({ email }).value();
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = {
      ...userData,
      email,
      password: hashedPassword,
    };
    const createdUser = await users.insert(newUser).write();
    const token = jwt.sign({ id: createdUser.id, email: createdUser.email }, JWT_SECRET, { expiresIn: '1h' });

    // Return user without password
    const { password: _, ...safeUser } = createdUser;
    res.status(201).json({ accessToken: token, user: safeUser });
  } catch (error) {
    next(error);
  }
});

// User Login Endpoint
app.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const users = app.db.get('users');
    const user = await users.find({ email }).value();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    const { password: _, ...safeUser } = user;
    res.json({ accessToken: token, user: safeUser });
  } catch (error) {
    next(error);
  }
});

// Apply JWT middleware to protected routes (example: /profile, /orders, etc.)
// Use: app.use('/profile', verifyToken, router);
// For now, exposing router as-is, apply verifyToken where needed

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Bind router.db for lowdb access in endpoints
app.db = router.db;
app.use(router);

app.listen(PORT, () => {
  console.log(`JSON Server with JWT Auth running on port ${PORT}`);
});
