// Function to connect to MetaMask (Ethereum Wallet)
async function connectEthereumWallet() {
    
    if (typeof window.ethereum !== 'undefined') {
      const provider = window.ethereum;
      try {
        // Request accounts from Ethereum wallet
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        const addresses = accounts;
        document.getElementById('walletStatus').innerText = `Connected as ${addresses.join(', ')}`;
  
        // Message for user to sign, matching the one in your backend
        const message = "Please sign this message to connect your wallet.";
  
        // Request signature from Ethereum wallet
        const signature = await provider.request({
          method: 'personal_sign',
          params: [message, addresses[0]],
        });
  
        // Send address and signature to the backend for verification
        const response = await fetch('http://localhost:3001/connect/connectEthereumWallet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address: addresses[0], signature }),
        });
  
        const result = await response.json();
        console.log(result);

        if (result.success) {
            // Open a new window/tab with the user details page and pass the wallet address as a query parameter
            window.open(`user_details.html?address=${encodeURIComponent(addresses[0])}`, '_blank');
          } else {
            // If the connection was not successful, display an error message
            document.getElementById('walletStatus').innerText = 'Failed to connect Ethereum wallet.';
          }
        
  
        
      } catch (error) {
        console.error("Ethereum wallet connection error:", error);
        document.getElementById('walletStatus').innerText = 'Error connecting Ethereum wallet.';
      }
    } else {
      alert("Ethereum wallet is not installed.");
    }
  }

// Function to connect to MetaMask (Ethereum Wallet) with userName
async function connectEthereumWalletWithUserName(userName) {
    
    if (typeof window.ethereum !== 'undefined') {
      const provider = window.ethereum;
      try {
        // Request accounts from Ethereum wallet
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        const addresses = accounts;
        document.getElementById('walletStatus').innerText = `Connected as ${addresses.join(', ')}`;
  
        // Message for user to sign, matching the one in your backend
        const message = "Please sign this message to connect your wallet.";
  
        // Request signature from Ethereum wallet
        const signature = await provider.request({
          method: 'personal_sign',
          params: [message, addresses[0]],
        });
  
        // Send address, signature, and userName to the backend for verification
        const response = await fetch('http://localhost:3001/connect/connectMultipleWallets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address: addresses[0], signature, userName }),
        });
  
        const result = await response.json();
        console.log(result);

        if (result.success) {
            // Open a new window/tab with the user details page and pass the wallet address and userName as query parameters
            window.open(`user_details.html?address=${encodeURIComponent(addresses[0])}&userName=${encodeURIComponent(userName)}`, '_blank');
          } else {
            // If the connection was not successful, display an error message
            document.getElementById('walletStatus').innerText = 'Failed to connect Ethereum wallet.';
          }
        
  
        
      } catch (error) {
        console.error("Ethereum wallet connection error:", error);
        document.getElementById('walletStatus').innerText = 'Error connecting Ethereum wallet.';
      }
    } else {
      alert("Ethereum wallet is not installed.");
    }
  }


 
  
  // Function to disconnect MetaMask
  function disconnectMetaMask() {
    document.getElementById('walletStatus').innerText = 'Disconnected from MetaMask.';
    document.getElementById("connectMetaMaskButton").style.display = "block";
    document.getElementById("disconnectMetaMaskButton").style.display = "block";
    document.getElementById("output").innerText = "";
  }
  
  document.getElementById("connectMetaMaskButton").addEventListener("click", connectEthereumWallet);
  document.getElementById("connectEth").addEventListener("click", connectEthereumWalletWithUserName);
  document.getElementById("disconnectMetaMaskButton").addEventListener("click", disconnectMetaMask);