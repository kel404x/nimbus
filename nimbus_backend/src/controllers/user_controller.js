// user_controller.js

const User = require('../models/user_model');
const Wallet = require('../models/wallet_model');
const wallet_controller = require('./wallet_controller')

/**
 * Creates a new user in the database.
 * @param {Object} req - The request object containing user data.
 * @param {Object} res - The response object to send the result.
 */
const createUser = async (req, res) => {
  try {
    const { userName, userPFP, wallets } = req.body;

    // Check if userName and wallets array are defined
    if (!userName || !wallets || wallets.length === 0) {
      return res.status(400).json({ message: 'userName and at least one wallet address are required' });
    }

    // Ensure wallets is an array
    if (!Array.isArray(wallets)) {
      return res.status(400).json({ message: 'wallets must be an array' });
    }

    const existingUser = await User.findOne({ userName });

    if (existingUser) {
      console.log(`User already exists with userName: ${userName}`, 'WARNING');
      return res.status(400).json({ message: 'User with this username already exists' });
    }

    // Generate wallet IDs using create_wallet_array for wallets array
    console.log('Received wallets:', wallets);
    const walletIds = await wallet_controller.create_wallet_array(wallets);
    console.log('Generated walletIds:', walletIds);

    if (!walletIds || walletIds.length === 0) {
      console.log('Failed to generate wallet IDs', 'ERROR');
      return res.status(500).json({ message: 'Failed to generate wallet IDs' });
    }

    const netWorth = 0; // Assuming netWorth is initialized to 0 or any default value

    // Create a new user instance with the data from the request body
    const newUser = new User({
      userName,
      userPFP,
      wallets: walletIds,
      primaryWallet: walletIds[0], // Set the primary wallet as the first wallet in the array
      netWorth,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    console.log(`User created successfully: ${savedUser.userName}`, 'INFO');
    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (error) {
    console.error('Error creating user:', error);
    console.log('Error creating user: ' + error.message, 'ERROR');
    res.status(500).json({ message: 'Server error', error });
  }
};


/**
 * Retrieves a user by their primary wallet address.
 * @param {Object} req - The request object containing wallet address.
 * @param {Object} res - The response object to send the result.
 */
const getUserByPrimaryWallet = async (req, res) => {
  try {
    const { walletAddress } = req.params; // Get wallet address from URL parameter

    // Find the user with the matching primary wallet address
    const user = await User.findOne({ primaryWallet: walletAddress });

    if (!user) {
      console.log(`User not found for wallet address: ${walletAddress}`, 'WARNING'); 
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`User retrieved successfully: ${user.userName}`, 'INFO'); // Log user retrieval
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by primary wallet:', error);
    console.log('Error fetching user by primary wallet: ' + error.message, 'ERROR'); // Log error
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * Updates the username of a user identified by their primary wallet address.
 * @param {Object} req - The request object containing wallet address and new username.
 * @param {Object} res - The response object to send the result.
 */
const updateUserName = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const { userName } = req.body;

    // Check if userName is defined
    if (!userName) {
      return res.status(400).json({ message: 'userName is required' });
    }

    const updatedUser = await User.findOneAndUpdate(
      { primaryWallet: walletAddress },
      { userName },
      { new: true } // Return the updated user
    );

    if (!updatedUser) {
      console.log(`User not found for update: ${walletAddress}`, 'WARNING'); // Log warning
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`User name updated successfully: ${updatedUser.userName}`, 'INFO'); // Log update
    res.status(200).json({ message: 'User name updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user name:', error);
    console.log('Error updating user name: ' + error.message, 'ERROR'); // Log error
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * Deletes a user identified by their primary wallet address.
 * @param {Object} req - The request object containing wallet address.
 * @param {Object} res - The response object to send the result.
 */
const deleteUser = async (req, res) => {
  try {
    const { walletAddress } = req.params; // Get wallet address from URL parameter

    // Find and delete the user with the matching primary wallet address
    const deletedUser = await User.findOneAndDelete({ primaryWallet: walletAddress });

    if (!deletedUser) {
      console.log(`User not found for deletion: ${walletAddress}`, 'WARNING'); // Log warning
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`User deleted successfully: ${deletedUser.userName}`, 'INFO'); // Log deletion
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    console.log('Error deleting user: ' + error.message, 'ERROR'); // Log error
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { createUser, getUserByPrimaryWallet, updateUserName, deleteUser };
