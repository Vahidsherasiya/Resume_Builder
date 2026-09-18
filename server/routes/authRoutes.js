import express from 'express';
import { User } from '../models/User.js';

const router = express.Router();

// Fallback in-memory user database if Mongo is offline
const memoryUsers = [
  {
    id: 'user-admin-01',
    name: 'Master Admin',
    email: 'admin@enhancv.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date().toISOString()
  },
  {
    id: 'user-default-01',
    name: 'Alex Morgan',
    email: 'user@enhancv.com',
    password: 'user123',
    role: 'user',
    createdAt: new Date().toISOString()
  },
  {
    id: 'user-default-02',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    password: 'password123',
    role: 'user',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    // Default role is ALWAYS 'user', only admin@enhancv.com can be admin
    const userRole = normalizedEmail === 'admin@enhancv.com' ? 'admin' : 'user';

    // Try MongoDB
    try {
      let existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        return res.status(400).json({ message: 'An account with this email already exists. Please log in.' });
      }

      const newUser = await User.create({
        name,
        email: normalizedEmail,
        password,
        role: userRole
      });

      const token = `token_${newUser._id}_${Date.now()}`;
      return res.status(201).json({
        success: true,
        user: { id: newUser._id.toString(), name: newUser.name, email: newUser.email, role: newUser.role },
        token
      });
    } catch (dbErr) {
      // Memory Store Fallback
      const existing = memoryUsers.find((u) => u.email === normalizedEmail);
      if (existing) {
        return res.status(400).json({ message: 'An account with this email already exists. Please log in.' });
      }

      const memUser = {
        id: `user-${Date.now()}`,
        name,
        email: normalizedEmail,
        password,
        role: userRole,
        createdAt: new Date().toISOString()
      };
      memoryUsers.push(memUser);

      const token = `token_${memUser.id}_${Date.now()}`;
      return res.status(201).json({
        success: true,
        user: { id: memUser.id, name: memUser.name, email: memUser.email, role: memUser.role },
        token
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    try {
      const user = await User.findOne({ email: normalizedEmail });
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password. Please verify your credentials or register.' });
      }

      const token = `token_${user._id}_${Date.now()}`;
      return res.json({
        success: true,
        user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role || 'user', avatar: user.avatar },
        token
      });
    } catch (dbErr) {
      // Memory Fallback: Check strictly for matching email and password
      const memUser = memoryUsers.find(
        (u) => u.email === normalizedEmail && u.password === password
      );

      if (!memUser) {
        return res.status(401).json({ message: 'Invalid email or password. Please verify your credentials or register.' });
      }

      const token = `token_${memUser.id}_${Date.now()}`;
      return res.json({
        success: true,
        user: { id: memUser.id, name: memUser.name, email: memUser.email, role: memUser.role || 'user', avatar: memUser.avatar },
        token
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/users (Admin: List all users)
router.get('/users', async (req, res) => {
  try {
    let users = [];
    try {
      users = await User.find().select('-password').sort({ createdAt: -1 });
    } catch (dbErr) {
      users = memoryUsers.map(({ password, ...u }) => u);
    }
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// PUT /api/auth/users/:id/role (Admin: Update user role)
router.put('/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Role must be user or admin' });
    }

    try {
      const updated = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
      if (updated) return res.json({ success: true, user: updated });
    } catch (dbErr) {
      // Memory fallback
    }

    const memUser = memoryUsers.find((u) => u.id === id || u._id === id);
    if (memUser) {
      memUser.role = role;
      const { password, ...safeUser } = memUser;
      return res.json({ success: true, user: safeUser });
    }

    return res.status(404).json({ message: 'User not found' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
