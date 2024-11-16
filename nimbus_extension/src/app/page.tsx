'use client'

import { createWallet } from "@/service/wallet/createWallet";
import WalletConnect from "../components/WalletConnect";


export default function Home() {

  createWallet();


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <WalletConnect />
    </div>
  );
} 