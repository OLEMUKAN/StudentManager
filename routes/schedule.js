const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Schedule = require('../models/Schedule');

// @route   POST api/schedule
// @desc    Create a new class session
// @access  Private (Coordinator and Lecturer only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'coordinator' && req.user.role !== 'lecturer') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const { title, date, time } = req.body;
    const newSession = new Schedule({
      title,
      date,
      time,
      lecturer: req.user.id
    });

    const session = await newSession.save();
    res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/schedule
// @desc    Get all class sessions
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const schedule = await Schedule.find().sort({ date: 1, time: 1 }).populate('lecturer', 'name');
    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;