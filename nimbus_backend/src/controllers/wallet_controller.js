const Wallet = require('../models/wallet_model');
const { getNFTs } = require('./nft_controller');
const User = require('../models/user_model')

/**
 * Creates a wallet if it does not already exist.
 * @param {Object} req - The request object containing the wallet address.
 * @param {Object} res - The response object to send the result.
 * @returns {Promise} A promise that resolves to the created wallet or the existing wallet.
 */
const createWallet = async (req, res) => {
  try {
    const walletAddress = req.body.walletAddress; 
    const user_id = req.user_id; 

    console.log(walletAddress); 
    // Validate walletAddress format (add your own validation logic)
    if (!walletAddress) {
        return res.status(400).json({ message: 'Invalid wallet address provided.' }); // Send error response
    }

    // Check if the wallet already exists
    const existingWallet = await Wallet.findOne({ walletAddress });
    if (existingWallet) {
        console.log(`Wallet already exists: ${walletAddress}`);
        return res.status(200).json(existingWallet); // Send existing wallet as response
    }

    // Create a new wallet if it doesn't exist
    const newWallet = new Wallet({ user_id ,walletAddress });
    const savedWallet = await newWallet.save();
    console.log(`Wallet created: ${walletAddress}`);
    return res.status(201).json(savedWallet); // Send created wallet as response

  } catch (error) {
      console.error('Error creating wallet:', error.message); // Improved error logging
      return res.status(500).json({ message: 'Failed to create wallet: ' + error.message }); // More informative error message
  }
};


/**
 * Helper function to clean up NFT data by picking necessary fields.
 * @param {Object} nftData - Original NFT data.
 * @returns {Object} Cleaned NFT data.
 */
const sanitizeNFTData = (nftData) => {
  return nftData.map(nft => ({
      tokenId: nft.tokenId,
      name: nft.name,
      imageUrl: nft.imageUrl,
      description: nft.description,

      // Add other necessary fields here as per your requirement
  }));
};

/**
 * Updates NFTs for each wallet in the provided array of wallet addresses.
 * Accepts the wallet addresses from the request body and sends a response.
 * @param {Object} req - The request object containing wallet addresses in the body.
 * @param {Object} res - The response object to send the result.
 */
const updateNFTsForAllWallets = async (req, res) => {
    try {
      // Extract wallets array from the request body
      const { wallets } = req.body;
  
      // Validate that wallets is provided and is an array
      if (!wallets || !Array.isArray(wallets) || wallets.length === 0) {
        return res.status(400).json({ message: 'Invalid or empty wallets array provided.' });
      }
  
      // Fetch all wallets by their addresses
      const walletDocs = await Wallet.find({ walletAddress: { $in: wallets } });
  
      if (walletDocs.length === 0) {
        return res.status(404).json({ message: 'No wallets found for the provided addresses.' });
      }
  
      // Iterate over each wallet and fetch its NFTs
      for (let wallet of walletDocs) {
        const nftData = await getNFTs(wallet.walletAddress); // Fetch NFT data
  
        // Sanitize NFT data to avoid complex nested structures
        const sanitizedNFTData = sanitizeNFTData(nftData);
  
        // Update wallet's NFT field with sanitized data
        wallet.NFTs = sanitizedNFTData;
  
        // Save the updated wallet to the database
        await wallet.save();
      }
  
      console.log('NFTs updated for all wallets.');
      res.status(200).json({ message: 'NFTs updated successfully for all wallets.', updatedWallets: walletDocs });
  
    } catch (error) {
      console.error('Error updating NFTs for wallets:', error);
      res.status(500).json({ message: 'Failed to update NFTs for all wallets', error: error.message });
    }
  };

/**
 * Deletes a wallet by its wallet address.
 * @param {string} walletAddress - The wallet address to delete.
 * @returns {Promise} A promise that resolves when the wallet is deleted.
 */
const deleteWallet = async (walletAddress) => {
    try {
        const result = await Wallet.deleteOne({ walletAddress });
        if (result.deletedCount === 0) {
            throw new Error('Wallet not found');
        }
        console.log('Wallet deleted successfully.');
    } catch (error) {
        console.error('Error deleting wallet:', error);
        throw new Error('Failed to delete wallet');
    }
};

/**
 * Checks if a wallet exists by its wallet address from the request.
 * @param {Object} req - The request object containing the wallet address.
 * @param {Object} res - The response object to send the result.
 */
const checkWalletExists = async (req, res) => {
    const walletAddress = req.body.walletAddress; // Extract walletAddress from request body

    if (!walletAddress) {
        return res.status(400).json({ message: 'Wallet address is required.' });
    }

    const exists = await walletExists(walletAddress); // Call the walletExists function

    if (exists) {
        return res.status(200).json({ message: 'Wallet exists.' });
    } else {
        return res.status(404).json({ message: 'Wallet does not exist.' });
    }
};




module.exports = { updateNFTsForAllWallets, deleteWallet , createWallet , checkWalletExists};
