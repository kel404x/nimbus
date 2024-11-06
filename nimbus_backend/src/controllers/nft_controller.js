const { fetchNFTs } = require('../NFTs/fetchNFTs'); // Import the fetchNFTs function


 let cachedNFTs = []; // In-memory storage

 const getNFTs = async (walletAddress, res) => {
   try {
    
     if (!walletAddress) {
       return res.status(400).send('Wallet address is required');
     }
 
     // Check if the NFTs are already in cache
     const cachedData = cachedNFTs.find(entry => entry.wallet === walletAddress);
     if (cachedData) {
       return cachedData.nfts; // Return cached data if available
     }
 
     // Fetch NFTs and store in cache
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
     if (!res.headersSent) {
       res.status(500).send('An unexpected error occurred');
     }
   }
 };


 
 module.exports = { getNFTs };
 