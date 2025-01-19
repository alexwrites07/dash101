import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://server.avyudha.com/transaction-history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions(response.data.transactions);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch transaction history");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSort = (key) => {
    const sortedTransactions = [...transactions].sort((a, b) => {
      return sortOrder === "asc"
        ? new Date(a[key]) - new Date(b[key])
        : new Date(b[key]) - new Date(a[key]);
    });
    setTransactions(sortedTransactions);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const formatDate = (utcDate) => {
    return dayjs(utcDate).format("DD MMM YYYY, h:mm A");
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
    <Header />
    <div className="flex-1 bg-gray-100 ">
      <Sidebar />
      <div className="lg:ml-64 lg:mt-18 mt-36 p-4">
        <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => handleSort("date")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Sort by Date ({sortOrder === "asc" ? "Ascending" : "Descending"})
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.type}
                  </td>
                  <td
                    className={` px-4 py-12 flex ${
                      transaction.type === "credit"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "credit" ? (
                      <FaArrowUp className="mr-2" />
                    ) : (
                      <FaArrowDown className="mr-2" />
                    )}
                    {transaction.amount}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formatDate(transaction.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
