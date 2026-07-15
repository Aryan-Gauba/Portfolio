const { Pool } = require('pg');
require('dotenv').config();

// Use DATABASE_URL if available (perfect for hosting platforms like Render/Render.com)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Simple test to ensure the database connects successfully
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Error connecting to the database:', err.stack);
  } else {
    console.log('✅ PostgreSQL Database connected successfully at:', res.rows[0].now);
  }
});

module.exports = pool;