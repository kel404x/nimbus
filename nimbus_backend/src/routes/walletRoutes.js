const express = require('express');
const { addWallet, getWallets } = require('../controllers/walletController');
const router = express.Router();

// POST /api/wallet - Add a new wallet
router.post('/wallet', addWallet);

// GET /api/wallet/:email - Get wallets for a user
router.get('/wallet/:email', getWallets);

module.exports = router;
