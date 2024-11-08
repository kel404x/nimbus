const express = require('express');
const { updateNFTsForAllWallets } = require('../controllers/wallet_controller');
const {connectEthereumWallet} = require('../connectWallets/ethereum_wallet_connect');
const router = express.Router();


router.put('/updateNFTsForAllWallets', updateNFTsForAllWallets);
router.post('/connect/ethereum', connectEthereumWallet);

module.exports = router;
