// backend/src/app.js

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

const app = express();

// Security middlewares
app.use(helmet());
// Allow all origins in development
app.use(cors());

// API rate limiter
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

// JSON parser
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', ts: new Date().toISOString() });
});

// --- Import and mount your routes (make sure this is ABOVE the 404 handler!) ---
const priceRoutes = require('./api/routes/priceRoutes');
app.use('/api/prices', priceRoutes);

const retailerRoutes = require('./api/routes/retailerRoutes');
app.use('/api/retailers', retailerRoutes);

// Example to add more routes next
// const retailerRoutes = require('./api/routes/retailerRoutes');
// app.use('/api/retailers', retailerRoutes);

// --- 404 handler: Should come AFTER routes are mounted! ---
app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Not found' });
});

// --- General error handler ---
app.use((err, req, res, next) => {
  console.error('App error:', err);
  res.status(500).json({ status: 'error', message: 'Server error' });
});

module.exports = app;