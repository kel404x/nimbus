'use client';

import WalletConnect from '@/components/WalletConnect';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import Main from './Main'

export default function Connect() {
    const { isConnected } = useAccount();

    if (isConnected) {
        // Redirect to another page (e.g., /main) when the wallet is connected
        return (
            <div>
                < WalletConnect />
                <p>Your wallet is connected. Proceed to the next page:</p>
                <Link href="/">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
                        Go to Main Page
                    </button>
                </Link>
            </div>
        );
    }

    // If not connected, show the wallet connection option
    return (
        <div>
            <p>Please connect your wallet:</p>
            < WalletConnect />

        </div>
    );
}
