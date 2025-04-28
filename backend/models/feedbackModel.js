const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  isAnonymous: Boolean,
  location: String,
  rating: Number,
  timeOfDay: String,
  issueType: String,
  message: String,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
