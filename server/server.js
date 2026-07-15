const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// Middleware
// ==========================================
app.use(cors());
app.use(express.json()); // Essential for parsing JSON request bodies

// Rate limiting to prevent API abuse (e.g., maximum of 100 requests per 15 minutes)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use(globalLimiter);

// Stricter rate limiting specifically for contact form submissions
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // Limit each IP to 5 contact submissions per hour
  message: { error: 'Message limit reached. Please try again in an hour.' }
});

// ==========================================
// API Routes
// ==========================================

/**
 * @route   POST /api/visit
 * @desc    Log a page view/visit for simple analytics
 * @access  Public
 */
app.post('/api/visit', async (req, res) => {
  const { page_name } = req.body;

  // Fallback default if page_name isn't provided
  const page = page_name || 'home';

  try {
    // Optional: Extract and hash IP address to keep analytics private but identify unique visits
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const crypto = require('crypto');
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex');

    const query = `
      INSERT INTO portfolio_analytics (page_name, visitor_ip_hash) 
      VALUES ($1, $2) 
      RETURNING *;
    `;
    
    await pool.query(query, [page, ipHash]);
    res.status(201).json({ success: true, message: 'Visit logged successfully.' });
  } catch (err) {
    console.error('Error logging visit:', err.message);
    // Silent fail on client side so a database hiccup doesn't crash their browsing session
    res.status(500).json({ error: 'Server error tracking analytics' });
  }
});

/**
 * @route   POST /api/contact
 * @desc    Submit contact form
 * @access  Public (Protected by contactLimiter)
 */
app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, message } = req.body;

  // Simple backend validation to ensure payloads aren't empty or invalid
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all fields (name, email, and message).' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  try {
    const query = `
      INSERT INTO contact_submissions (name, email, message) 
      VALUES ($1, $2, $3) 
      RETURNING id, submitted_at;
    `;
    
    const result = await pool.query(query, [name, email, message]);
    
    res.status(201).json({
      success: true,
      message: 'Message sent! I will get back to you as soon as possible.',
      submissionId: result.rows[0].id
    });
  } catch (err) {
    console.error('Error inserting contact submission:', err.message);
    res.status(500).json({ error: 'Something went wrong on our end. Please try again later.' });
  }
});

// Start listening
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

module.exports = app;