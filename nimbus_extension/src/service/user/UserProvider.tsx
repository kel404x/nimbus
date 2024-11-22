"use client"

import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useAccount } from "wagmi";

// Define the shape of the UserContext
interface UserContextType {
    userName: string;
    user_ID: string;
    walletAddress: string | null;
    wallet: string | null; // Wallet data from backend
    setUserName: (name: string) => void;
    setUser_ID: (id: string) => void;
    connectWallet: () => Promise<void>;
}

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userName, setUserName] = useState<string>("");
    const [user_ID, setUser_ID] = useState<string>("");
    const [wallet, setWallet] = useState<string | null>(null);
    const { address, isConnected } = useAccount();

    const connectWallet = async () => {
        try {
            if (!address) {
                console.error("No wallet address found. Ensure wallet is connected.");
                return;
            }

            // Call backend to check or create user and wallet
            const response = await axios.post("http://localhost:3001/connectWallet", {
                walletAddress: address,
            });

            if (response.data) {
                const { userName, user_ID, wallet } = response.data;

                // Update state with fetched/created data
                setUserName(userName);
                setUser_ID(user_ID);
                setWallet(wallet);
            } else {
                console.error("Unexpected response from backend:", response);
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    return (
        <UserContext.Provider
            value={{
                userName,
                user_ID,
                walletAddress: address || null,
                wallet,
                setUserName,
                setUser_ID,
                connectWallet,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
