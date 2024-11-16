import axios from 'axios';

export async function createUser(): Promise<void> {
    const userName = "";

    try {
        // Make an API call to create a user with wallet address
        const response = await axios.post('http://localhost:3001/create-user', { userName: userName });

        console.log('User created successfully:', response.data);
    } catch (error) {
        console.error('Error creating user:', error);
    }
    
}