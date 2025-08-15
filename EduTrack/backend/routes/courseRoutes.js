const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  createCourse,
  deleteCourse,
  enrollInCourse
} = require('../controllers/courseController');

const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, getAllCourses);
router.post('/', verifyToken, createCourse);
router.post('/:id/enroll', verifyToken, enrollInCourse);
router.delete('/:id', verifyToken, deleteCourse);

module.exports = router;
