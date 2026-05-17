const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl:
  process.env.NODE_ENV === 'production'
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

// TEST DATABASE CONNECTION
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ PostgreSQL Connected Successfully');
    release();
  }
});

module.exports = pool;