import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account.length > 0) {
      console.log("Account connected: ", account);
      setAccount(account[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(45);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(30);
      await tx.wait();
      getBalance();
    }
  };

  // Function to buy a hoodie
  const buyHoodie = async () => {
    if (atm) {
      let tx = await atm.buyHoodie();
      await tx.wait();
      getBalance();
    }
  };

  // Function to buy a t-shirt
  const buyTShirt = async () => {
    if (atm) {
      let tx = await atm.buyTShirt();
      await tx.wait();
      getBalance();
    }
  };

  // Function to buy pants
  const buyPants = async () => {
    if (atm) {
      let tx = await atm.buyPants();
      await tx.wait();
      getBalance();
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance} ETH</p>
        <div className="button-group">
          <button onClick={deposit}>Deposit 45 ETH</button>
          <button onClick={withdraw}>Withdraw 30 ETH</button>
        </div>
        <h3>Buy Items</h3>
        <div className="button-group">
          <button onClick={buyHoodie}>Buy Hoodie (500 ETH)</button>
          <button onClick={buyTShirt}>Buy T-Shirt (300 ETH)</button>
          <button onClick={buyPants}>Buy Pants (400 ETH)</button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header><h1>Your Ethermancer ATM Awaits!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          background-color: #F39C12;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .button-group {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        button {
          padding: 10px 20px;
          background-color: #3498DB;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 16px;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #2980B9;
        }
      `}
      </style>
    </main>
  );
}
