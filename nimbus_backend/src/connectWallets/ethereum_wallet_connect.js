const Web3 = require('web3').default;
const web3 = new Web3();

// Temporary in-memory storage; in production, replace with a database
const connectedWallets = {};

const connectEthereumWallet = async (req, res) => {
  const { address, signature } = req.body;

  try {
    const message = "Please sign this message to connect your wallet.";
    console.log("Received address:", address);
    console.log("Received signature:", signature);

    // Verify the message signature using web3
    const recoveredAddress = web3.eth.accounts.recover(message, signature);
    console.log("Recovered address:", recoveredAddress);

    // Added success response if the signature is verified
    if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
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

module.exports = { connectEthereumWallet };
