# Your Ethermancer ATM Awaits!
In this project we are using Ethereum blockchain technology. It allows users to connect their MetaMask wallet, check their account balance, deposit and withdraw Ether (ETH) from a smart contract deployed on the Ethereum network.

## Features
Connect Wallet: Users can connect their MetaMask wallet to interact with the banking service.
Check Balance: View the account balance in Ether (ETH).
Deposit and Withdraw: Deposit or withdraw ETH from the connected wallet to the smart contract.
User Interface: Simple and intuitive UI built using React.js.

## Technologies Used
React: Frontend framework for building user interfaces.
Ethers.js: Ethereum JavaScript library for interacting with Ethereum nodes.
MetaMask: Ethereum wallet browser extension for interacting with the Ethereum blockchain.
Solidity: Smart contract programming language used for writing Ethereum smart contracts.

## Functions
#### Wallet Connection
getWallet: Initializes the MetaMask wallet connection if available.
handleAccount: Handles the retrieved Ethereum accounts from MetaMask.
connectAccount: Initiates the connection process with MetaMask and retrieves user accounts.
getATMContract: Retrieves and sets up the deployed ATM smart contract using ethers.js.

### Balance Management
Fetches and displays the current ETH balance of the connected account from the smart contract.

### Transactions
deposit: Allows users to deposit a amount of ETH into the smart contract.
withdraw: Enables users to withdraw a amount of ETH from the smart contract.

### Dependencies
React: Front-end framework for building the user interface.
ethers.js: JavaScript library for interacting with Ethereum nodes and smart contracts.
