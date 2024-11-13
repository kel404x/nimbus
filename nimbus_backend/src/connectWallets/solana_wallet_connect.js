// // Function to connect to Phantom Wallet
// async function connectPhantomWallet() {
//     if (window.solana && window.solana.isPhantom) {
//       try {
//         const response = await window.solana.connect();
//         const address = response.publicKey.toString();
//         document.getElementById('walletStatus').innerText = `Connected to Phantom as ${address}`;
  
//         // Message to sign
//         const message = "Please sign this message to connect your Solana wallet.";
//         const encodedMessage = new TextEncoder().encode(message);
//         const signedMessage = await window.solana.signMessage(encodedMessage);
  
//         // Convert signed message to a hexadecimal string
//         const hexSignature = Array.from(new Uint8Array(signedMessage.signature))
//           .map(b => b.toString(16).padStart(2, '0'))
//           .join('');
  
//         // Display Phantom address and signed message
//         document.getElementById('output').innerText = `Solana Wallet Address: ${address}\nSignature: ${hexSignature}`;
  
//         document.getElementById("connectPhantomWalletButton").style.display = "none";
//         document.getElementById("disconnectPhantomWalletButton").style.display = "block";
  
//       } catch (error) {
//         console.error("Error connecting to Phantom:", error);
//         document.getElementById('walletStatus').innerText = 'Error connecting to Phantom.';
//       }
//     } else {
//       alert("Phantom Wallet is not installed.");
//     }
//   }


// // Function to disconnect Phantom Wallet
// function disconnectPhantomWallet() {
//     document.getElementById('walletStatus').innerText = 'Disconnected from Phantom Wallet.';
//     document.getElementById("connectPhantomWalletButton").style.display = "block";
//     document.getElementById("disconnectPhantomWalletButton").style.display = "none";
//     document.getElementById("output").innerText = "";
//   }
  
  
//   // Add event listeners for the buttons
//   document.getElementById("connectPhantomWalletButton").addEventListener("click", connectPhantomWallet);
//   document.getElementById("disconnectPhantomWalletButton").addEventListener("click", disconnectPhantomWallet);