const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const File = require('../models/File');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    if (req.user.role !== 'coordinator' && req.user.role !== 'lecturer') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const newFile = new File({
      name: req.file.originalname,
      path: req.file.path,
      type: req.file.mimetype,
      size: req.file.size,
      uploadedBy: req.user.id
    });

    const file = await newFile.save();
    res.json(file);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ... rest of the file routes

module.exports = router;