const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const Schedule = require('../models/Schedule');

// @route   POST api/attendance
// @desc    Mark attendance for a class
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { classId } = req.body;

    // Check if the class exists
    const classSession = await Schedule.findById(classId);
    if (!classSession) {
      return res.status(404).json({ msg: 'Class not found' });
    }

    // Check if attendance already marked
    const existingAttendance = await Attendance.findOne({
      student: req.user.id,
      class: classId
    });

    if (existingAttendance) {
      return res.status(400).json({ msg: 'Attendance already marked for this class' });
    }

    const newAttendance = new Attendance({
      student: req.user.id,
      class: classId
    });

    await newAttendance.save();

    res.json(newAttendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/attendance
// @desc    Get attendance for a user or class
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { userId, classId } = req.query;

    let query = {};

    if (userId) {
      query.student = userId;
    }

    if (classId) {
      query.class = classId;
    }

    const attendance = await Attendance.find(query)
      .populate('student', 'name')
      .populate('class', 'title date time');

    res.json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;