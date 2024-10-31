const express = require('express');
const router = express.Router();
const { createUser , getUserByPrimaryWallet , updateUserName, deleteUser } = require('../controllers/user_controller');


router.post('/create', createUser);
router.get('/users/wallet/:walletAddress', getUserByPrimaryWallet);
router.put('/users/wallet/:walletAddress/name', updateUserName);
router.delete('/users/wallet/:walletAddress', deleteUser);
module.exports = router;
