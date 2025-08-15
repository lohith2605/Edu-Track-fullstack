const express = require('express');
const router = express.Router();
const {
  getEnrollmentReport,
  getGradeReport,
  getAttendanceReport,
} = require('../controllers/reportController');

const { verifyToken } = require('../middleware/authMiddleware');

router.get('/enrollment', verifyToken, getEnrollmentReport);
router.get('/grades', verifyToken, getGradeReport);
router.get('/attendance', verifyToken, getAttendanceReport);

module.exports = router;
