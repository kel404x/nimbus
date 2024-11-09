// Import the fetchNFTs function to retrieve NFTs from an external source
const { fetchNFTs } = require('../NFTs/fetchNFTs'); 

// Initialize an array to cache NFT data for different wallet addresses
let cachedNFTs = []; 

/**
 * Asynchronously retrieves NFTs for a given wallet address.
 * 
 * @param {string} walletAddress - The wallet address to fetch NFTs for.
 * @param {object} res - The response object to send back the result.
 * @returns {Promise<Array>} - Returns a promise that resolves to the NFT data.
 */
const getNFTs = async (walletAddress, res) => {
  try {
    // Validate the wallet address input
    if (!walletAddress) {
      return res.status(400).send('Wallet address is required');
    }

    // Check if the NFTs are already cached for the provided wallet address
    const cachedData = cachedNFTs.find(entry => entry.wallet === walletAddress);
    if (cachedData) {
      return cachedData.nfts; // Return cached data if available
    }

    // Fetch NFTs and store them in the cache
    const nftData = await new Promise((resolve, reject) => { // Wrap fetchNFTs in a Promise
      fetchNFTs(walletAddress, (data) => {
        cachedNFTs.push({ wallet: walletAddress, nfts: data }); // Store data in memory
        resolve(data); // Resolve the Promise with the fetched data
      }, (errorMessage) => {
        reject(errorMessage); // Reject the Promise with the error message
      });
    });

    return nftData; // Return the fetched NFT data
  } catch (error) {
    // Handle unexpected errors and send a response if headers are not sent
    if (!res.headersSent) {
      res.status(500).send('An unexpected error occurred');
    }
  }
};

// Export the getNFTs function for use in other modules
module.exports = { getNFTs };
 