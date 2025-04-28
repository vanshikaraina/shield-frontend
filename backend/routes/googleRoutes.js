// // routes/googleRoutes.js

// const express = require('express');
// const axios = require('axios');
// const router = express.Router();

// const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// // Route for nearby places
// router.get('/nearby', async (req, res) => {
//   const { location, radius, type } = req.query;

//   try {
//     const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
//       params: {
//         location,
//         radius,
//         type,
//         key: GOOGLE_MAPS_API_KEY,
//       },
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching nearby places:', error.message);
//     res.status(500).json({ error: 'Failed to fetch nearby places' });
//   }
// });

// // Route for geocoding address
// router.get('/geocode', async (req, res) => {
//   const { address } = req.query;

//   try {
//     const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
//       params: {
//         address,
//         key: GOOGLE_MAPS_API_KEY,
//       },
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching geocode:', error.message);
//     res.status(500).json({ error: 'Failed to fetch geocode' });
//   }
// });

// module.exports = router;
