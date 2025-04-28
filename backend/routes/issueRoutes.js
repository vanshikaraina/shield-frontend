//issueRoutes.js
const express = require('express');
const router = express.Router(); // Correctly using express.Router

const Issue = require('../models/issueModel');
const multer = require('multer');

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/issues
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, location } = req.body;
    const imageUrl = req.file ? req.file.originalname : '';  // Just an example

    const newIssue = new Issue({ title, description, location, imageUrl });
    await newIssue.save();

    res.status(201).json({ message: 'Issue reported successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error reporting issue' });
  }
});

// GET /api/issues - Fetch all issues
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find(); // Fetch all issues from the database
    res.status(200).json(issues); // Send the issues as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching issues' });
  }
});

module.exports = router; // ✅ This must remain here