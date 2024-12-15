import React from 'react';
import Sidebar from './SidebarEmployer';
import Header from './HeaderEmployer';
import { FaWallet, FaMoneyBillWave, FaHistory } from 'react-icons/fa';

const Wallet = () => {
  const walletBalance = '₹10,000.00';

  const walletPlans = [
    { amount: 500, description: 'Add ₹500 to your wallet' },
    { amount: 1000, description: 'Add ₹1,000 to your wallet' },
    { amount: 5000, description: 'Add ₹5,000 to your wallet' },
  ];

  const transactionHistory = [
    { date: '01 Aug 2024', description: 'Added ₹500', amount: '₹500' },
    { date: '10 Aug 2024', description: 'Used for Premium Plan', amount: '-₹199' },
    { date: '15 Aug 2024', description: 'Added ₹1,000', amount: '₹1,000' },
  ];

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async (amount) => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: 'rzp_test_GpP5Z2LKkBWqPx',
      amount: amount * 100,
      currency: 'INR',
      name: 'Kridhatutor',
      description: `Adding ₹${amount} to your wallet`,
      handler: function (response) {
        alert(`Payment ID: ${response.razorpay_payment_id}`);
        alert(`Order ID: ${response.razorpay_order_id}`);
        alert(`Razorpay Signature: ${response.razorpay_signature}`);
      },
      prefill: {
        name: 'Your Name',
        email: 'email@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Header />
      <div className="flex-1 bg-gray-50">
        <Sidebar />
        <div className="lg:mt-12 lg:ml-64 p-6 lg:p-12 flex flex-col justify-center lg:justify-start">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
            <FaWallet className="text-green-600" /> Wallet
          </h1>

          {/* Wallet Balance */}
          <div className="bg-white p-6 mb-8 rounded-lg shadow-lg flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Wallet Balance
              </h2>
              <p className="text-3xl font-bold text-green-600">{walletBalance}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add Money Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <FaMoneyBillWave className="text-blue-600" /> Add Money
              </h2>
              {walletPlans.map((plan, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border-b last:border-b-0"
                >
                  <p className="text-gray-700">{plan.description}</p>
                  <button
                    onClick={() => handleRazorpayPayment(plan.amount)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                  >
                    Add ₹{plan.amount}
                  </button>
                </div>
              ))}
            </div>

            {/* Transaction History Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <FaHistory className="text-yellow-600" /> Transaction History
              </h2>
              {transactionHistory.map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border-b last:border-b-0"
                >
                  <div>
                    <p className="text-gray-600 text-sm">{transaction.date}</p>
                    <p className="text-gray-800">{transaction.description}</p>
                  </div>
                  <p
                    className={`text-lg font-semibold ${
                      transaction.amount.startsWith('-')
                        ? 'text-red-600'
                        : 'text-green-600'
                    }`}
                  >
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
