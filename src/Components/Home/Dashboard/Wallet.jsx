import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "./Sidebar";
import Header from "./Header";
import Payment from './Payment';

const WalletPage = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [customAmount, setCustomAmount] = useState("");


  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email'); // Assume email is stored in localStorage or fetch it from context.

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get('https://server.avyudha.com/checkBalance', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(response.data.balance || 0);
      } catch (error) {
        console.error('Error fetching balance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [token]);

  const handleAddMoney = async (amount) => {
    try {
      const response = await axios.post(
        'https://server.avyudha.com/createOrder',
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const order = response.data;
      const payment = new Payment(email, order, amount);
      payment.openCheckout();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to initiate payment');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wallet-page  max-w-3xl  ml-24 min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 ml-64 py-8 px-4">
        <Header />
        <div className="mt-24 lg:mt-28 p-6 lg:p-10">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Wallet</h1>

          {/* Wallet Balance Section */}
          <div className="balance-card bg-blue-700 from-green-400 to-blue-500 text-white rounded-lg p-6 shadow-md mb-8">
            <h2 className="text-xl font-semibold">Your Wallet Balance</h2>
            <p className="text-3xl font-bold mt-2">₹{balance}</p>
          </div>

          {/* Add Money Section */}
          <div className="add-money">
  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add Money</h3>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {[500, 1000, 2000].map((amount) => (
      <button
        key={amount}
        onClick={() => handleAddMoney(amount)}
        className="bg-blue-700 text-white font-medium py-3 px-5 rounded-lg shadow transition duration-200"
      >
        Add ₹{amount}
      </button>
    ))}
  </div>

  {/* Custom Input Amount Section */}
  <div className="mt-6">
    <label htmlFor="customAmount" className="block text-gray-800 font-medium mb-2">
      Enter Custom Amount
    </label>
    <input
      type="number"
      id="customAmount"
      placeholder="Enter amount"
      className="w-full p-3 border border-gray-300 rounded-lg shadow-md"
      onChange={(e) => setCustomAmount(e.target.value)}
    />
    <button
      onClick={() => handleAddMoney(customAmount)}
      className="mt-4 bg-blue-600 text-white font-medium py-3 px-5 rounded-lg shadow transition duration-200"
    >
      Add ₹{customAmount}
    </button>
  </div>
</div>

        </div>

        {/* Transaction History Section */}
        {/* <div className="transaction-history mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Transaction History</h3>
          <ul className="space-y-4">
            {transactionHistory.map((transaction, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md"
              >
                <div>
                  <p className="text-gray-700 font-medium">{transaction.date}</p>
                  <p className="text-gray-600 text-sm">{transaction.description}</p>
                </div>
                <p
                  className={`font-bold ${
                    transaction.amount.startsWith('-')
                      ? 'text-red-500'
                      : 'text-green-500'
                  }`}
                >
                  {transaction.amount}
                </p>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default WalletPage;
