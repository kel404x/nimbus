// auth.js
const jwt = require('jsonwebtoken');
const Web3 = require('web3');

// Initialize Web3
const web3 = new Web3('https://cloudflare-eth.com/');

let jwtSecret;

try {
  jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error('JWT_SECRET is not defined');
} catch (error) {
  console.error('Error retrieving JWT secret:', error.message);
}

// Function to generate a temporary JWT token with address and nonce
const generateTempToken = (address, nonce) => {
  return jwt.sign({ address, nonce }, jwtSecret, { expiresIn: '60s' });
};

// Function to generate a signed message for the user
const getSignMessage = (address, nonce) => {
  return `Please sign this message for address ${address}:\n\n${nonce}`;
};

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, jwtSecret, (err, authData) => {
    if (err) return res.sendStatus(403); // Forbidden

    req.authData = authData;
    next();
  });
};

// Verify user's signature and generate final JWT token
const verifySignature = async (tempToken, signature) => {
  const { nonce, address } = await jwt.verify(tempToken, jwtSecret);
  const message = getSignMessage(address, nonce);
  const verifiedAddress = await web3.eth.accounts.recover(message, signature);

  if (verifiedAddress.toLowerCase() === address.toLowerCase()) {
    const finalToken = jwt.sign({ verifiedAddress }, jwtSecret, { expiresIn: '1d' });
    return { verified: true, token: finalToken };
  } else {
    return { verified: false };
  }
};

module.exports = {
  generateTempToken,
  getSignMessage,
  authenticateToken,
  verifySignature,
};
