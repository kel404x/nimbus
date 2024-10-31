// user_model.js
const mongoose = require('mongoose');

// Define schema for User
const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true , unique:true},
    userPFP: { type: String, required: false }, 
    // walletIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' }], // Array of wallet references
    // primaryWalletId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' }, 
    wallets: [{ type: String, required: true , unique:true}], // Array of wallet references
    primaryWallet: { type: String, required: true , unique:true}, // Primary wallet reference
    netWorth: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
);

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
