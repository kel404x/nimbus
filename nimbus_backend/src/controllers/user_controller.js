// userController.js

const User = require('../models/user_model'); // Adjust path as necessary


// Controller to create a new user
const createUser = async (req, res) => {
  try {
    const { userName, userPFP, wallets, primaryWallet } = req.body;

    // Generate a unique userId
    const netWorth = 0; // Assuming netWorth is initialized to 0 or any default value

    // Create a new user instance with the data from the request body
    const newUser = new User({
      userName,
      userPFP,
      wallets,
      primaryWallet,
      netWorth,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { createUser };
