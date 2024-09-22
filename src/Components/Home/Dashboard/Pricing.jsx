import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Wallet = () => {
  const walletBalance = '₹10,000.00';

  const walletPlans = [
    { amount: '₹500.00', description: 'Add ₹500 to your wallet' },
    { amount: '₹1,000.00', description: 'Add ₹1,000 to your wallet' },
    { amount: '₹5,000.00', description: 'Add ₹5,000 to your wallet' },
  ];

  const transactionHistory = [
    { date: '01 Aug 2024', description: 'Added ₹500', amount: '₹500' },
    { date: '10 Aug 2024', description: 'Used for Premium Plan', amount: '-₹199' },
    { date: '15 Aug 2024', description: 'Added ₹1,000', amount: '₹1,000' },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Header />
      <div className="flex-1 bg-gray-100">
        <Sidebar />
    <div className="lg:mt-12 lg:ml-64 p-2 lg:p-24 flex flex-col justify-center lg:justify-start">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Wallet</h1>
      <div className="bg-white p-4 mb-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Wallet Balance</h2>
        <p className="text-2xl font-bold mb-4 text-gray-700">{walletBalance}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Add Money Section */}
        <div className="bg-white p-4 mb-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Add Money</h2>
          {walletPlans.map((plan, index) => (
            <div key={index} className="mb-4">
              <p className="text-gray-700 mb-2">{plan.description}</p>
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                {plan.amount}
              </button>
            </div>
          ))}
        </div>

        {/* Transaction History Section */}
        <div className="bg-white p-4 mb-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Transaction History</h2>
          {transactionHistory.map((transaction, index) => (
            <div key={index} className="mb-4">
              <p className="text-gray-700">{transaction.date}</p>
              <p className="text-gray-600">{transaction.description}</p>
              <p className={`text-${transaction.amount.startsWith('-') ? 'red' : 'green'}-600`}>
                {transaction.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
   </div>
  </div>
  );
};

export default Wallet;
