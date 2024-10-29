const express = require('express');
const { getNFTs } = require('../controllers/nft_controller'); // Import controller

const router = express.Router();

// Define the /nfts route
router.get('/nfts', getNFTs);

module.exports = router;
