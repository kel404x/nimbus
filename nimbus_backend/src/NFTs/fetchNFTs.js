const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Fetches NFTs associated with a given wallet address from the OpenSea API.
 * 
 * @param {string} wallet - The Ethereum wallet address to fetch NFTs for.
 * @param {function} setNftData - A function to handle the NFT data.
 */
const fetchNFTs = async (wallet, setNftData) => {
    // Retrieve the OpenSea API key from environment variables
    const apiKey = process.env.OPENSEA_API_KEY;
    console.log("API Key:", apiKey);

    // Check if the API key is available
    if (!apiKey) {
        console.error("API key is missing. Please set OPENSEA_API_KEY in your .env file.");
        return;
    }

    // Set up the API request URL
    const contractAddress = wallet;
    console.log("Contract Address:", contractAddress);
    
    const apiUrl = `https://api.opensea.io/api/v2/chain/ethereum/account/${contractAddress}/nfts`;
    console.log("API URL:", apiUrl);

    try {
        // Make the API request
        console.log("Making API request...");
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "X-API-KEY": apiKey,
                "Content-Type": "application/json",
            },
        });

        // Check if the response is successful
        console.log("Response Status:", response.status);
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error Response Text:", errorText);
            throw new Error(`Error: ${response.status} - ${errorText}`);
        }

        // Parse the JSON response
        const data = await response.json();
        console.log("API Response Data:", data);

        // Update state based on the API response
        if (data !== null && 'nfts' in data) {
            console.log("NFTs found in response.");
            setNftData(data.nfts);

        } else if (Array.isArray(data)) {
            console.log("Data is an array.");
            setNftData(data);

        } else {
            console.log("Invalid API response.");
            setNftData(null);
        }

    } catch (error) {
        // Handle any errors that occur during the API request
        console.error("Error in fetchNFTsFromUser:", error);
       
    }
};

module.exports = { fetchNFTs };
