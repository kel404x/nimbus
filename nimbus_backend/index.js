const express = require('express'); // Import the Express framework
const cors = require('cors'); // Import CORS middleware
const connectDB = require('./src/config/db'); 
const wallet_routes = require('./src/routes/wallet_routes'); 
const user_routes = require('./src/routes/user_routes')


try {
    connectDB(); // Attempt to connect to the database
} catch (error) {
    console.error('Database connection failed:', error); // Log any connection errors
}

const app = express(); // Create an instance of an Express application
const PORT = 3001; // Define the port number the server will listen on

// Use CORS middleware to allow requests from different origins
app.use(cors());

// Middleware to parse JSON bodies in incoming requests
app.use(express.json());

// app.use(nftRoutes);
app.use(user_routes)
app.use(wallet_routes);

app.get('/user/getWalletDetails', (req, res) => {
  const { address } = req.query;

  // Simulate wallet data retrieval
  if (address) {
    res.json({
      walletAddress: address,
      balance: "2.5 ETH",
      lastTransaction: "0xabc123",
      owner: "John Doe",
    });
  } else {
    res.status(400).json({ message: "Wallet address is required." });
  }
});



// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log a message when the server starts
});

