const express = require('express');
const { updateNFTsForAllWallets} = require('../controllers/wallet_controller');
const router = express.Router();


router.put('/updateNFTsForAllWallets', updateNFTsForAllWallets);

module.exports = router;
