const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');
const Review = require('../models/Review');
const Registration = require('../models/Registration');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get trending events
router.get('/trending', async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ registered: -1 })
      .limit(5);
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get events by category
router.get('/category/:category', async (req, res) => {
  try {
    const events = await Event.find({ category: req.params.category }).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get events by date
router.get('/date/:date', async (req, res) => {
  try {
    const startDate = new Date(req.params.date);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const events = await Event.find({
      date: {
        $gte: startDate,
        $lt: endDate
      }
    }).sort({ time: 1 });
    
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new event (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update event (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete event (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Register for an event
router.post('/:id/register', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.registered >= event.capacity) {
      return res.status(400).json({ message: 'Event is full' });
    }

    // Check if already registered
    const existingRegistration = await Registration.findOne({
      eventId: req.params.id,
      userId: req.user.id
    });

    if (existingRegistration) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    // Create registration
    const registration = new Registration({
      eventId: req.params.id,
      userId: req.user.id
    });
    await registration.save();

    // Update event registration count
    event.registered += 1;
    await event.save();

    // Update user XP and Vibe Score
    const user = await User.findById(req.user.id);
    user.xp += 10;
    user.updateVibeScore();
    user.updateBadges();
    await user.save();

    res.json({ message: 'Successfully registered for event', registration });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add review for an event
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const review = new Review({
      eventId: req.params.id,
      text: req.body.text,
      emoji: req.body.emoji,
      userId: req.user.id,
      isAnonymous: req.body.isAnonymous
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get reviews for an event
router.get('/:id/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ eventId: req.params.id })
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 