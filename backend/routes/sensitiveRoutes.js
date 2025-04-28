const express = require('express');
const router = express.Router();
const SensitiveIssue = require('../models/sensitiveModel');

// Handle POST request to create a new sensitive issue
router.post('/', async (req, res) => {
    try {
      const { name, issueType, description, location } = req.body;
  
      // Log the incoming data
      console.log('Request Body:', req.body);

      if (!name || !issueType || !description || !location) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
      
      // Validate location format
      if (!Array.isArray(req.body.location) || req.body.location.length !== 2) {
        console.error('Location must be an array with two numeric values (latitude, longitude).');
        setError('Location format is invalid.');
        return;
      }      
  
      // Create a new issue
      const newIssue = new SensitiveIssue({
        name,
        issueType,
        description,
        location,
      });
  
      // Save the new issue
      await newIssue.save();
  
      res.status(201).json(newIssue);
    } catch (err) {
      // Log the full error for debugging
      console.error('Error while creating issue:', err);
      console.error(err.stack);  // Log the error stack for better debugging
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  });
  

module.exports = router;
