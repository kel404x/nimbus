import WalletConnect from '@/components/WalletConnect';
import { useUser } from '../service/user/UserProvider';


export default function Main() {
    const { userName, user_ID, wallet, connectWallet } = useUser();

    connectWallet();

    return (
        <div>
            < WalletConnect />
            <h1>Welcome to the Wallet Connect Page</h1>
            <p>User Name: {userName}</p>
            <p>User ID: {user_ID}</p>
            <p>Wallet: {wallet}</p>
        </div>
    );
}