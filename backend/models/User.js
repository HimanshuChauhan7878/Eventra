const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  xp: {
    type: Number,
    default: 0
  },
  vibeScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  badges: [{
    type: String,
    enum: ['Bronze', 'Silver', 'Gold', 'Platinum']
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to update badges based on XP
userSchema.methods.updateBadges = function() {
  this.badges = [];
  if (this.xp >= 50) this.badges.push('Bronze');
  if (this.xp >= 100) this.badges.push('Silver');
  if (this.xp >= 200) this.badges.push('Gold');
  if (this.xp >= 500) this.badges.push('Platinum');
};

// Method to update Vibe Score based on XP
userSchema.methods.updateVibeScore = function() {
  this.vibeScore = Math.min(100, Math.floor(this.xp / 50));
};

module.exports = mongoose.model('User', userSchema); 