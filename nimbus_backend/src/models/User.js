const mongoose = require('mongoose');

/*
TODO: Change userSchema to include:
- userId
- userName
- userPFP
- wallet list
- primary wallet (boolean)
- netWorth
*/
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  wallets: [{ type: String }],  // List of wallet addresses
});

module.exports = mongoose.model('User', userSchema);
