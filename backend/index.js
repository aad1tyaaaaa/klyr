require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

// Hardcoded explicit origins for best cross-device/production compatibility
const allowedOrigins = [
  'https://klyr-chi.vercel.app',
  'http://localhost:3000',
  'http://localhost:5000'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://192.168.')) {
      callback(null, true);
    } else {
      // For testing, just allow all origins if it's not a strict production check
      callback(null, true); 
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Express doesn't automatically handle OPTIONS preflight for all routes unless we tell it to
app.options('*', cors());

app.use(express.json());

// ... everything else
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// Dashboard Data
app.get('/dashboard-data', async (req, res) => {
  try {
    const user = await prisma.user.findFirst();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Credentials
app.get('/credentials', async (req, res) => {
  const { type } = req.query;
  try {
    const credentials = await prisma.credential.findMany({
      where: type ? { type } : undefined
    });
    res.json(credentials);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Activities
app.get('/activities', async (req, res) => {
  try {
    const activities = await prisma.activity.findMany();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});


// Login Mock - REMOVED (Mocked in Frontend)
// app.post('/login', async (req, res) => { ... });


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on http://0.0.0.0:${PORT}`);
});
