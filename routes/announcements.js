const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Announcement = require('../models/Announcement');

// @route   POST api/announcements
// @desc    Create a new announcement
// @access  Private (Coordinator and Lecturer only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'coordinator' && req.user.role !== 'lecturer') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const { title, content } = req.body;
    const newAnnouncement = new Announcement({
      title,
      content,
      author: req.user.id
    });

    const announcement = await newAnnouncement.save();
    res.json(announcement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/announcements
// @desc    Get all announcements
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 }).populate('author', 'name');
    res.json(announcements);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;