"use client";

import Image from "next/image";

// Define the structure of an NFT object
interface NFT {
  id: string;
  name: string;
  display_image_url: string;
  collection?: string;
  identifier?: string;
  token_standard?: string;
}

// Define the props for the NftDisplay component
interface NftDisplayProps {
  nftData: NFT[];
}

/**
 * NftDisplay Component
 * 
 * This component displays a list of NFTs (Non-Fungible Tokens) in a grid layout.
 * Each NFT is presented as a card with an image and relevant information.
 *
 * @param {NftDisplayProps} props - The props for the component
 * @param {NFT[]} props.nftData - An array of NFT objects to display
 * @returns {JSX.Element} The rendered NFT display
 */
function NftDisplay({ nftData }: NftDisplayProps) {
  // If no NFT data is available, display a message
  if (!nftData || nftData.length === 0) {
    console.log("No NFT data available");
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {nftData.map((nft, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg overflow-hidden shadow-md"
        >
          {/* Display the NFT image if available */}
          {nft.display_image_url && (
            <div className="aspect-square relative">
              <Image
                src={nft.display_image_url}
                alt={nft.name || 'NFT Image'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          )}
          {/* Display NFT information */}
          <div className="p-4">
            <p className="text-lg font-semibold mb-2">
              {nft.name || `NFT #${nft.identifier}`}
            </p>
            <p className="text-sm mb-1">
              <span className="font-medium">Collection:</span> {nft.collection || 'N/A'}
            </p>
            <p className="text-sm">
              <span className="font-medium">Token Standard:</span> {nft.token_standard || 'N/A'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NftDisplay;
