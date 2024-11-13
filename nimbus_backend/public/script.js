// Function to connect to MetaMask (Ethereum Wallet)
async function connectMetaMask() {
  if (typeof window.ethereum !== 'undefined') {
    const provider = window.ethereum;
    try {
      // Request accounts from MetaMask
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      const addresses = accounts;
      document.getElementById('walletStatus').innerText = `Connected as ${addresses.join(', ')}`;

      // Message for user to sign, matching the one in your backend
      const message = "Please sign this message to connect your wallet.";

      // Request signature from MetaMask
      const signature = await provider.request({
        method: 'personal_sign',
        params: [message, addresses[0]],
      });

      // Send address and signature to the backend for verification
      const response = await fetch('http://localhost:3000/connect/connectEthereumWallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: addresses[0], signature }),
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

// Function to disconnect MetaMask
function disconnectMetaMask() {
  document.getElementById('walletStatus').innerText = 'Disconnected from MetaMask.';
  document.getElementById("connectMetaMaskButton").style.display = "block";
  document.getElementById("disconnectMetaMaskButton").style.display = "block";
  document.getElementById("output").innerText = "";
}

document.getElementById("connectMetaMaskButton").addEventListener("click", connectMetaMask);
document.getElementById("disconnectMetaMaskButton").addEventListener("click", disconnectMetaMask);