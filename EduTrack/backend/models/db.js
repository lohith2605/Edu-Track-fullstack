// EduTrack/backend/models/db.js
// Use the promise-based version of mysql2
const mysql = require('mysql2/promise'); 
require('dotenv').config();

console.log("ENV Loaded: ", {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME
});


const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Create a pool for promise-based connections (recommended for Express apps)
const pool = mysql.createPool(dbConfig);

// Test connection
pool.getConnection()
  .then(connection => {
    console.log('MySQL connected ✅');
    connection.release(); // Release the connection back to the pool
  })
  .catch(err => {
    console.error('MySQL connection failed:', err);
  });

module.exports = pool; // Export the pool instead of the direct connection