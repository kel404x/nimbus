const express = require('express');
const router = express.Router();
const { createUser , getUserByPrimaryWallet , updateUserName, deleteUser } = require('../controllers/user_controller');

router.post('/create-user', createUser);
router.get('/users/by-wallet/:walletAddress', getUserByPrimaryWallet);
router.put('/users/by-wallet/:walletAddress/update-name', updateUserName);
router.delete('/users/by-wallet/:walletAddress', deleteUser);

module.exports = router;
