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
    const { walletAddress, user_id } = req.body;

    console.debug('Received request to create wallet:', { walletAddress, user_id });

    // Validate walletAddress format (add your own validation logic)
    if (!walletAddress) {
        console.debug('Invalid wallet address provided.');
        return res.status(400).json({ message: 'Invalid wallet address provided.' }); // Send error response
    }

    if (!user_id) {
      console.debug('Invalid user_id provided.');
      return res.status(400).json({ message: 'Invalid user_id provided.' }); // Send error response
    }

    // Check if the wallet already exists
    console.debug('Checking if wallet already exists:', walletAddress);
    const existingWallet = await Wallet.findOne({ walletAddress });
    if (existingWallet) {
        console.debug(`Wallet already exists: ${walletAddress}`);
        return res.status(200).json(existingWallet); // Send existing wallet as response
    }

    // Create a new wallet if it doesn't exist
    console.debug('Creating new wallet:', { user_id, walletAddress });
    const newWallet = new Wallet({ user_id, walletAddress });
    const savedWallet = await newWallet.save();
    console.debug(`Wallet created successfully: ${walletAddress}`);
    return res.status(201).json(savedWallet); 

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
 * Updates NFTs for a single wallet provided in the request body.
 * Accepts the wallet address from the request body and sends a response.
 * @param {Object} req - The request object containing a wallet address in the body.
 * @param {Object} res - The response object to send the result.
 */
const updateNFTsCollection = async (req, res) => {
  try {
    // Extract wallet address from the request body
    const { walletAddress } = req.body;

    // Validate that walletAddress is provided
    if (!walletAddress) {
      return res.status(400).json({ message: 'Invalid or missing wallet address provided.' });
    }

    // Fetch the wallet by its address
    const wallet = await Wallet.findOne({ walletAddress });

    if (!wallet) {
      return res.status(404).json({ message: 'No wallet found for the provided address.' });
    }

    // Fetch NFT data for the wallet
    const nftData = await getNFTs(wallet.walletAddress); // Fetch NFT data

    // Sanitize NFT data to avoid complex nested structures
    const sanitizedNFTData = sanitizeNFTData(nftData);

    // Update wallet's NFT field with sanitized data
    wallet.NFTs = sanitizedNFTData;

    // Save the updated wallet to the database
    await wallet.save();

    console.log('NFTs updated for the wallet.');
    res.status(200).json({ message: 'NFTs updated successfully for the wallet.', updatedWallet: wallet });

  } catch (error) {
    console.error('Error updating NFTs for the wallet:', error);
    res.status(500).json({ message: 'Failed to update NFTs for the wallet', error: error.message });
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


/**
 * Connects a wallet to the system.
 * 
 * This function checks if a wallet with the given address already exists.
 * If it does, it returns the associated user information.
 * If not, it creates a new user and wallet, then returns the new user and wallet information.
 * 
 * @param {Object} req - The request object containing the wallet address in the body.
 * @param {Object} res - The response object used to send back the appropriate HTTP response.
 */
const connectWallet = async (req, res) => {
  const { walletAddress } = req.body;

  // Validate the presence of a wallet address in the request
  if (!walletAddress) {
      return res.status(400).json({ error: "Wallet address is required" });
  }

  try {
      // Check if the wallet already exists in the database
      let wallet = await Wallet.findOne({ walletAddress });

      if (wallet) {
          // If the wallet exists, fetch the associated user
          const user = await User.findById(wallet.user_id);
          
          return res.status(200).json({
              userName: user.userName,
              user_ID: wallet.user_id,
              wallet,
          });
      }

      // If the wallet doesn't exist, create a new user
      const userName = `user_${Date.now()}`; // Generate a unique username
      const newUser = new User({ userName });
      const savedUser = await newUser.save();

      // Create a new wallet associated with the newly created user
      const newWallet = new Wallet({
          user_id: savedUser._id,
          walletAddress
      });
      const savedWallet = await newWallet.save();

      // Respond with the newly created user and wallet information
      res.status(201).json({
          userName: savedUser.userName,
          user_ID: savedUser._id,
          wallet: savedWallet,
      });
  } catch (error) {
      // Log the error and respond with a 500 status code for server errors
      console.error("Error handling wallet connection:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Connects multiple wallets to an existing user.
 * 
 * This function checks if a user with the given userName exists.
 * If it does, it adds the new wallet address to the user.
 * If not, it returns an error indicating the user does not exist.
 * 
 * @param {Object} req - The request object containing the userName and wallet address in the body.
 * @param {Object} res - The response object used to send back the appropriate HTTP response.
 */
const connectMultipleWallets = async (req, res) => {
  const { user_ID, walletAddress } = req.body;

  // Validate the presence of a userName and wallet address in the request
  if (!user_ID || !walletAddress) {
      return res.status(400).json({ error: "user_ID and wallet address are required" });
  }

  try {
      // Check if the user exists in the database
      const user = await User.findOne({ user_id: user_ID });

      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      // Check if the wallet already exists for the user
      let wallet = await Wallet.findOne({ walletAddress, user_id: user._id });

      if (wallet) {
          return res.status(409).json({ error: "Wallet address already associated with this user" });
      }

      // Create a new wallet associated with the existing user
      const newWallet = new Wallet({
          user_id: user._id,
          walletAddress
      });
      const savedWallet = await newWallet.save();

      // Respond with the updated user and new wallet information
      res.status(201).json({
          userName: user.userName,
          user_ID: user._id,
          wallet: savedWallet,
      });
  } catch (error) {
      // Log the error and respond with a 500 status code for server errors
      console.error("Error handling multiple wallet connection:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { updateNFTsCollection, deleteWallet , createWallet , checkWalletExists, connectWallet, connectMultipleWallets};
