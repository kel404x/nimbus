import axios from 'axios';
import { useAccount } from 'wagmi';

export async function createUser(): Promise<void> {
    // Get account information
    const { address, isConnected } = useAccount();

    if (!isConnected) {
        console.error('User is not connected to Ethereum network');
        return;
    }

    try {
        // Make an API call to create a user with wallet address
        const response = await axios.post('http://localhost:3001/createWallet', { walletAddress: address });

        console.log('User created successfully:', response.data);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}