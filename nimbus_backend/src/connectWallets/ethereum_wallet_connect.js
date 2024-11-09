const Web3 = require('web3').default;
const web3 = new Web3();
const axios = require('axios');


/**
 * Connects an Ethereum wallet by verifying the provided signature.
 * 
 * @param {Object} req - The request object containing the wallet address and signature.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const connectEthereumWallet = async (req, res) => {
  const { address, signature } = req.body;

  try {
    const message = "Please sign this message to connect your wallet.";
    console.log("Received address:", address);
    console.log("Received signature:", signature);

    // Verify the message signature using web3
    const recoveredAddress = web3.eth.accounts.recover(message, signature);
    console.log("Recovered address:", recoveredAddress);

    // Check if recovered address matches the provided address
    if (recoveredAddress.toLowerCase() === address.toLowerCase()) {

      // Make a POST request to the /createWallet route on localhost
      const response = await axios.post('http://localhost:3000/createWallet', { walletAddress: address });

      // Log the response from the /createWallet endpoint
      console.log('Wallet creation response:', response.data);

      return res.json({ success: true, message: "Ethereum wallet connected successfully." });
    }

    res.status(400).json({ success: false, message: "Signature verification failed." });
  } catch (error) {
    console.error("Error connecting Ethereum wallet:", error);
    res.status(500).json({
      success: false,
      message: "Error connecting Ethereum wallet.",
      error: error.message,
    });
  }
};

module.exports = { connectEthereumWallet, connectedWalletAddresses };
