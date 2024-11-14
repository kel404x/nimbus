"use client";

import { useAccount } from "wagmi";

export default function walletData() {
    const { isConnected } = useAccount();

    return (
        <div>
            {isConnected ? (
                <p>You are connected to your wallet!</p>
            ) : (
                <p>Please connect your wallet.</p>
            )}
        </div>
    );
}

