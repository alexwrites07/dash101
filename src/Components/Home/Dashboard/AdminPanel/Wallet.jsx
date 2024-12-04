import React, { useState } from "react";
import axios from "axios";

const WalletManager = () => {
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState(0);
  const [newBalance, setNewBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch balance
  const fetchBalance = async () => {
    if (!email) {
      alert("Please enter an email.");
      return;
    }
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`https://server.avyudha.com/coin-balance/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBalance(response.data.balance || 0);
      setNewBalance(response.data.balance || 0);
    } catch (error) {
      console.error("Error fetching balance:", error);
      alert("Could not fetch balance. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update balance
  const updateBalance = async () => {
    if (!email) {
      alert("Please enter an email.");
      return;
    }
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const payload = {
        email,
        coins: newBalance,
      };
      await axios.post("https://server.avyudha.com/wallet/add-coins", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Balance updated successfully!");
      setBalance(newBalance);
    } catch (error) {
      console.error("Error updating balance:", error);
      alert("Could not update balance. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-semibold mb-4">Wallet Manager </h1>
      <h3 className="text-2xl mb-4"> (Enter amout you want to add to user coins and Use - sign when you want to reduce coins )</h3>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded mb-4 w-64"
      />
      <button
        onClick={fetchBalance}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Check Balance"}
      </button>
      <div className="mb-4">
        <p className="text-lg">Current Balance: {balance}</p>
      </div>
      <input
        type="number"
        placeholder="Add amount"
        value={newBalance}
        onChange={(e) => setNewBalance(Number(e.target.value))}
        className="border p-2 rounded mb-4 w-64"
      />
      <button
        onClick={updateBalance}
        className="bg-green-500 text-white py-2 px-4 rounded disabled:opacity-50"
        disabled={isLoading || balance === newBalance}
      >
        {isLoading ? "Saving..." : "Add Balance"}
      </button>
    </div>
  );
};

export default WalletManager;
