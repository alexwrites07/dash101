import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Pricing = () => {
  // Define the mock data for the custom payment
  const customPayment = {
    amount: '₹1,500.00',
    title: 'Custom Title by Admin',
    description:
      'This is a custom payment description, providing details about the payment requirements and conditions.',
    paymentDate: 'Due: 15th August 2024',
    buttonLabel: 'Pay Now',
  };

  const plans = [
    {
      title: 'Basic',
      price: '₹199.00',
      details: [
        '30 job posting',
        '3 featured job',
        'Job displayed for 15 days',
        'Premium Support 24/7',
      ],
      action: 'Add to cart',
    },
    {
      title: 'Standard',
      price: '₹499.00',
      details: [
        '40 job posting',
        '5 featured job',
        'Job displayed for 30 days',
        'Premium Support 24/7',
      ],
      action: 'View cart',
      recommended: true,
    },
    {
      title: 'Extended',
      price: '₹799.00',
      details: [
        '50 job posting',
        '10 featured job',
        'Job displayed for 60 days',
        'Premium Support 24/7',
      ],
      action: 'Add to cart',
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="mt-12 lg:ml-64 lg:mt-12 p-4 lg:p-28 flex flex-col items-center lg:items-start w-full">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Custom Payments</h1>
          {/* Custom Payment Card */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">
            <div className="bg-white p-4 mb-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{customPayment.title}</h2>
              <p className="text-2xl font-bold mb-4 text-gray-700">{customPayment.amount}</p>
              <p className="text-gray-700 mb-4">{customPayment.description}</p>
              <p className="text-sm text-gray-600 mb-4">{customPayment.paymentDate}</p>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                {customPayment.buttonLabel}
              </button>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-8 text-gray-900">Pricing</h1>
          {/* Pricing Plans */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {plans.map((plan, index) => (
              <div key={index} className="bg-white p-4 mb-6 rounded-lg shadow-md">
                {plan.recommended && (
                  <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block">
                    Recommended
                  </div>
                )}
                <h2 className="text-xl font-semibold mb-4 text-gray-900">{plan.title}</h2>
                <p className="text-2xl font-bold mb-4 text-gray-700">{plan.price}</p>
                <ul className="text-gray-700 mb-6">
                  {plan.details.map((detail, i) => (
                    <li key={i} className="mb-2">
                      {detail}
                    </li>
                  ))}
                </ul>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                  {plan.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
