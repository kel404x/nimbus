// script.js

// Get the form element
const userForm = document.getElementById('userForm');

// Add an event listener to handle form submission
userForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the form from refreshing the page

  // Collect form data
  const userName = document.getElementById('userName').value;
  const wallet1 = document.getElementById('wallet1').value;
  const wallet2 = document.getElementById('wallet2').value;

  // Create an array of wallet addresses
  const wallets = [wallet1, wallet2];

  // Prepare the data to send
  const data = {
    userName,
    wallets: wallets, // Send the array of wallet addresses
    primaryWallet: wallets[0], // Use the first wallet as primary
  };

  try {
    // Send a POST request to the backend
    const response = await fetch('http://localhost:3000/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    // Log the response to the console
    if (response.ok) {
      console.log('User created successfully:', result.user);
    } else {
      console.error('Error creating user:', result.message);
    }
  } catch (error) {
    console.error('Something went wrong:', error);
  }
});
