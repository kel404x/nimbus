const mongoose = require('mongoose');

// Define schema for Wallet
const walletSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to parent User
  isPrimary: { type: Boolean, default: false },
  netWorth: { type: Number, default: 0 }, // Net worth in USD
  NFTs: { type: Array, default: [] }, // Array to store NFTs data
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Middleware to update `updatedAt` on every document modification
walletSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create Wallet model
const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;
