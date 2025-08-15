const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../models/db');

require('dotenv').config();

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if email already exists
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );

    const userId = result.insertId;

    // Generate token for auto-login
    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    // Send same shape as login
    res.status(200).json({
      token,
      role,
      user: {
        id: userId,
        name,
        email,
      },
    });
  } catch (err) {
   console.error('Register Error:', err.message, err.stack);

    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [result] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (result.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.status(200).json({
      token,
      role: user.role,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };
