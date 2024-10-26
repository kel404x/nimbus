const express = require('express');
const { getNFTs } = require('../controllers/nftController'); // Import controller

const router = express.Router();

// Define the /nfts route
router.get('/nfts', getNFTs);

module.exports = router;
