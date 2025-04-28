const mongoose = require('mongoose');

const SensitiveIssueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  issueType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: [Number],  // Array of numbers to store latitude and longitude
    required: true,
  },
}, {
  timestamps: true,  // This will add createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('SensitiveIssue', SensitiveIssueSchema);
