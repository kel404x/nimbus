const mongoose = require('mongoose');

// Define schema for User
const userSchema = new mongoose.Schema({
  userName: { type: String, required: false, unique: true },
  userPFP: { type: String, required: false },
  wallets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' }], 
  primaryWallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' }, 
  netWorth: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Middleware to update `updatedAt` on every document modification
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
