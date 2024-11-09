const express = require('express');
const { updateNFTsForAllWallets } = require('../controllers/wallet_controller');
const { connectEthereumWallet } = require('../connectWallets/ethereum_wallet_connect');
const { createWallet } = require('../controllers/wallet_controller');
const router = express.Router();

router.put('/updateNFTsForAllWallets', updateNFTsForAllWallets);
router.post('/connect/ethereum', connectEthereumWallet);
router.post('/createWallet', createWallet);

module.exports = router;
