const User = require('../models/user_model');

const Wallet = require('../models/wallet_model');


// // Define schema for Wallet
// const walletSchema = new mongoose.Schema({
//     walletAddress: { type: String, required: true, unique: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to parent User
//     isPrimary: { type: Boolean, default: false },
//     netWorth: { type: Number, default: 0 }, // Net worth in USD
//     NFTs: { type: Array, default: [] }, // Array to store NFTs data
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
//   });
  

const create_wallet_array = async (req, res) => {
    const { wallets } = req.body;

    // Initialize an array to hold the wallet IDs
    const walletIds = [];

    // Iterate through each wallet address in the wallets array
    for (const walletAddress of wallets) {
        const newWallet = new Wallet({
            walletAddress: walletAddress,
            isPrimary: false, // Set to false or adjust as needed
            netWorth: 0
        });

        // Save the wallet to the database and push the ID to the walletIds array
        const savedWallet = await newWallet.save();
        walletIds.push(savedWallet._id);
    }

    // Return the array of wallet IDs
    res.json(walletIds);
}
