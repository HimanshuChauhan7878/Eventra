const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get leaderboard
router.get('/', async (req, res) => {
  try {
    const users = await User.find({ role: 'student' })
      .sort({ vibeScore: -1, xp: -1 })
      .limit(10)
      .select('name xp vibeScore badges');
    
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 