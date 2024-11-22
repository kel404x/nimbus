const express = require('express');
const { updateNFTsCollection } = require('../controllers/wallet_controller');
const { connectEthereumWallet , connectNextWallet} = require('../connectWallets/ethereum_wallet_connect');
const { createWallet , connectWallet , deleteWallet, connectMultipleWallets} = require('../controllers/wallet_controller');
const router = express.Router();

router.put('/updateNFTsCollection', updateNFTsCollection);
router.post('/connect/connectEthereumWallet', connectEthereumWallet);
router.post('/createWallet', createWallet);
router.post('/connectWallet', connectWallet);
router.post('/connect-multiple-wallets', connectMultipleWallets);
router.post('/connectMultipleWallets', connectNextWallet)
router.delete('/deleteWallet', deleteWallet)

module.exports = router;
