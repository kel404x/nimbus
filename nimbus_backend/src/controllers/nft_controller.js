const { fetchNFTs } = require('../NFTs/fetchNFTs'); // Import the fetchNFTs function


 let cachedNFTs = []; // In-memory storage

 const getNFTs = async (req, res) => {
   try {
     const wallet = req.query.wallet || "0x07f7dED89D22c4BABa44346577ceBCBB9D1dB81D";
 
     if (!wallet) {
       return res.status(400).send('Wallet address is required');
     }
 
     // Check if the NFTs are already in cache
     const cachedData = cachedNFTs.find(entry => entry.wallet === wallet);
     if (cachedData) {
       return res.json(cachedData.nfts); // Return cached data if available
     }
 
     // Fetch NFTs and store in cache
     await fetchNFTs(wallet, (nftData) => {
       cachedNFTs.push({ wallet, nfts: nftData }); // Store data in memory
       res.json(nftData);
     }, (errorMessage) => {
       if (!res.headersSent) {
         res.status(500).send(errorMessage);
       }
     });
   } catch (error) {
     if (!res.headersSent) {
       res.status(500).send('An unexpected error occurred');
     }
   }
 };
 
 module.exports = { getNFTs };
 