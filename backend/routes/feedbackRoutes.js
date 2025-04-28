const express = require('express');
const Feedback = require('../models/feedbackModel');

const router = express.Router();

router.post('/submit-feedback', async (req, res) => {
  try {
    const newFeedback = new Feedback({
      isAnonymous: req.body.isAnonymous,
      location: req.body.location,
      rating: req.body.rating,
      timeOfDay: req.body.timeOfDay,
      issueType: req.body.issueType,
      message: req.body.message,
    });

    await newFeedback.save();
    res.status(200).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit feedback' });
  }
});

module.exports = router;
