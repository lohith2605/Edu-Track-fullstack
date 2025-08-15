const db = require('../models/db');

const getUserProfile = (req, res) => {
  const userId = req.user.id;

  const query = 'SELECT id, name, email, role FROM users WHERE id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(results[0]);
  });
};

module.exports = { getUserProfile };
