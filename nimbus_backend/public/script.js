document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchButton'); // Button to fetch NFTs
    const nftDisplay = document.getElementById('nftDisplay'); // Section to display NFTs

    // Add event listener to the button
    fetchButton.addEventListener('click', () => {
        // Call the function to extract and post data
        postData();
        
        fetch('http://localhost:3000/nfts')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json();
                } else {
                    return response.text().then((text) => {
                        throw new Error(`Unexpected response format: ${text}`);
                    });
                }
            })
            .then((data) => {
                console.log('NFTs:', data); // Log NFT data to the console
                displayNFTs(data); // Call function to display NFTs on the webpage
            })
            .catch((error) => {
                console.error('Error fetching NFTs:', error);
            });
    });

    // Function to extract email and wallet addresses and post them
    function postData() {
        const email = document.getElementById('email').value; // Get email value
        const wallet1 = document.getElementById('wallet1').value; // Get wallet address 1
        const wallet2 = document.getElementById('wallet2').value; // Get wallet address 2

        const data = {
            email: email,
            wallets: [wallet1, wallet2] // Send both wallets as an array
        };

        fetch('http://localhost:3000/api/wallet', { // Update URL to match the wallet route
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(responseData => {
            console.log('Data submitted successfully:', responseData);
        })
        .catch(error => {
            console.error('Error submitting data:', error);
        });
    }

    // Function to display NFTs on the webpage
    function displayNFTs(nfts) {
        nftDisplay.innerHTML = ''; // Clear previous content
        if (Array.isArray(nfts) && nfts.length > 0) {
            nfts.forEach((nft) => {
                const nftCard = document.createElement('div');
                nftCard.classList.add('nft-card');

                nftCard.innerHTML = `
                    <h3>${nft.name || 'Unnamed NFT'}</h3>
                    <img src="${nft.image_url || 'https://via.placeholder.com/150'}" alt="${nft.name}" />
                `;
                nftDisplay.appendChild(nftCard); // Add each NFT to the display section
            });
        } else {
            nftDisplay.innerHTML = '<p>No NFTs found.</p>';
        }
    }
});
