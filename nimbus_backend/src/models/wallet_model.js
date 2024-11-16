const mongoose = require('mongoose');

// Define schema for Wallet
const walletSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  walletName: { type: String, required: false },
  walletAddress: { type: String, required: true, unique: true },
  netWalletWorth: { type: Number, default: 0 },
  NFTs: { type: [Object], default: [] },
}, { timestamps: true });

// Middleware to update `updatedAt` on every document modification
walletSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create Wallet model
const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;
