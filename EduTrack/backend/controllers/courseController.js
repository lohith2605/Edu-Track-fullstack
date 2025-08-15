// EduTrack/backend/controllers/courseController.js
const db = require('../models/db');

// ✅ GET all courses
const getAllCourses = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM courses');
    res.json(results);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ message: 'DB error', error: err });
  }
};

// ✅ POST create a new course
const createCourse = async (req, res) => {
  const { name, code, description } = req.body;
  const userRole = req.user.role;

  if (userRole !== 'admin' && userRole !== 'faculty') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO courses (name, code, description) VALUES (?, ?, ?)',
      [name, code, description]
    );
    res.status(201).json({ id: result.insertId, name, code, description });
  } catch (err) {
    console.error('Create course error:', err);
    res.status(500).json({ message: 'Failed to create course', error: err });
  }
};

// ✅ DELETE a course
const deleteCourse = async (req, res) => {
  const userRole = req.user.role;
  const courseId = req.params.id;

  if (userRole !== 'admin' && userRole !== 'faculty') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  try {
    await db.query('DELETE FROM courses WHERE id = ?', [courseId]);
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    console.error('Delete course error:', err);
    res.status(500).json({ message: 'Failed to delete course', error: err });
  }
};

// ✅ POST enroll a student into a course
const enrollInCourse = async (req, res) => {
  const userRole = req.user.role;
  const studentId = req.user.id;
  const courseId = req.params.id;

  if (userRole !== 'student') {
    return res.status(403).json({ message: 'Only students can enroll' });
  }

  try {
    await db.query(
      'INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)',
      [studentId, courseId]
    );
    res.status(200).json({ message: 'Enrolled successfully' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Already enrolled' });
    }
    console.error('Enroll error:', err);
    res.status(500).json({ message: 'Enrollment failed', error: err });
  }
};

module.exports = {
  getAllCourses,
  createCourse,
  deleteCourse,
  enrollInCourse,
};
