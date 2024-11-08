// Function to connect to MetaMask and verify the wallet address
async function connectMetaMask() {
  if (typeof window.ethereum !== 'undefined') {
    const provider = window.ethereum;
    try {
      // Request accounts from MetaMask
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      document.getElementById('walletStatus').innerText = `Connected as ${address}`;

      // Message for user to sign, matching the one in your backend
      const message = "Please sign this message to connect your wallet.";

      // Request signature from MetaMask
      const signature = await provider.request({
        method: 'personal_sign',
        params: [message, address],
      });

      // Send address and signature to the backend for verification
      const response = await fetch('http://localhost:3000/connect/ethereum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, signature }),
      });

      const result = await response.json();
      console.log(result);

      
    } catch (error) {
      console.error("MetaMask connection error:", error);
      document.getElementById('walletStatus').innerText = 'Error connecting MetaMask.';
    }
  } else {
    alert("MetaMask is not installed.");
  }
}

// Add event listener to the button
document.getElementById("connectWalletButton").addEventListener("click", connectMetaMask);
