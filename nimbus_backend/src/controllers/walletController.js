const User = require('../models/user_model');

// Add a new wallet address for a user
const addWallet = async (req, res) => {
  const { email, wallet } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, wallets: [wallet] });
    } else if (!user.wallets.includes(wallet)) {
      user.wallets.push(wallet);
    }

    await user.save();
    res.status(200).json({ message: 'Wallet added successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add wallet', error });
  }
};

// Get all wallets for a specific user
const getWallets = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ wallets: user.wallets });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve wallets', error });
  }
};

module.exports = { addWallet, getWallets };
