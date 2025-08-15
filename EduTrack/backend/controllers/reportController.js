const db = require('../models/db');

const getEnrollmentReport = (req, res) => {
  const sql = `
    SELECT c.code AS course_code, c.name AS course_name,
           u.name AS student_name, u.email AS student_email
    FROM enrollments e
    JOIN users u ON e.student_id = u.id
    JOIN courses c ON e.course_id = c.id
    ORDER BY c.name ASC, u.name ASC;
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: 'Enrollment report failed', error: err });
    res.json(result);
  });
};

const getGradeReport = (req, res) => {
  const sql = `
    SELECT u.name AS student_name, u.email AS student_email,
           c.name AS course_name, c.code AS course_code, g.grade
    FROM grades g
    JOIN users u ON g.student_id = u.id
    JOIN courses c ON g.course_id = c.id
    ORDER BY c.name ASC;
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: 'Grade report failed', error: err });
    res.json(result);
  });
};

const getAttendanceReport = (req, res) => {
  const sql = `
    SELECT u.name AS student_name, c.name AS course_name,
           c.code AS course_code, a.date, a.status
    FROM attendance a
    JOIN users u ON a.student_id = u.id
    JOIN courses c ON a.course_id = c.id
    ORDER BY a.date DESC;
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: 'Attendance report failed', error: err });
    res.json(result);
  });
};

module.exports = {
  getEnrollmentReport,
  getGradeReport,
  getAttendanceReport,
};
