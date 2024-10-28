const mongoose = require('mongoose');

// {
//   "_id": "ObjectId",  // MongoDB-generated unique ID
//   "userId": "string",  // Unique User ID (e.g., "user_001")
//   "userName": "string",  // User's display name
//   "userPFP": "string",  // URL to profile picture
//   "walletIds": ["ObjectId", "ObjectId"],  // Array of wallet references
//   "primaryWalletId": "ObjectId",  // Reference to primary wallet
//   "netWorth": "number",  // Total net worth across all wallets
//   "createdAt": "string",  // Timestamp of account creation
//   "updatedAt": "string"   // Timestamp of last update
// }

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  wallets: [{ type: String }],  // List of wallet addresses
  userId: { type: String, required: true },  // New field for user ID
  userName: { type: String, required: true },  // New field for user name
  userPFP: { type: String },  // New field for user profile picture
  primaryWallet: { type: String , required: true},  // Updated to store a wallet address
  netWorth: { type: Number, default: 0 },  // New field for net worth
});

module.exports = mongoose.model('user', userSchema);
