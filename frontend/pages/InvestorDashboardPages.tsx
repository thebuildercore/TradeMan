import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PieChart, BarChart, TrendingUp, Calendar, DollarSign, ArrowDown, ArrowUp, RefreshCw, Layers } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

const InvestorDashboardPage: React.FC = () => {
  const { currentAccount, connectWallet } = useWallet();
  const [activeTab, setActiveTab] = useState<'portfolio' | 'dividends' | 'transactions'>('portfolio');

  const mockPortfolio = [
    {
      id: 1,
      name: "Green Earth Café",
      image: "https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg",
      tokenAmount: 250,
      tokenValue: 2500,
      percentChange: 5.2,
      percentOwned: 0.8,
      tokenPrice: 10,
    },
    {
      id: 2,
      name: "Harbor Bookstore",
      image: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg",
      tokenAmount: 100,
      tokenValue: 1200,
      percentChange: -1.5,
      percentOwned: 0.3,
      tokenPrice: 12,
    },
    {
      id: 3,
      name: "Bright Smile Dental",
      image: "https://images.pexels.com/photos/3881445/pexels-photo-3881445.jpeg",
      tokenAmount: 50,
      tokenValue: 750,
      percentChange: 2.1,
      percentOwned: 0.15,
      tokenPrice: 15,
    }
  ];

  const mockDividends = [
    {
      id: 1,
      businessName: "Green Earth Café",
      amount: 62.5,
      date: "2025-06-15",
      status: "Paid",
      txHash: "0x42ab...7def",
      quarter: "Q2 2025"
    },
    {
      id: 2,
      businessName: "Harbor Bookstore",
      amount: 36,
      date: "2025-06-10",
      status: "Paid",
      txHash: "0x89cd...3efa",
      quarter: "Q2 2025"
    },
    {
      id: 3,
      businessName: "Green Earth Café",
      amount: 62.5,
      date: "2025-03-15",
      status: "Paid",
      txHash: "0x91ab...5cde",
      quarter: "Q1 2025"
    },
    {
      id: 4,
      businessName: "Harbor Bookstore",
      amount: 36,
      date: "2025-03-10",
      status: "Paid",
      txHash: "0x72fe...9abc",
      quarter: "Q1 2025"
    }
  ];

  const mockTransactions = [
    {
      id: 1,
      type: "Buy",
      businessName: "Green Earth Café",
      amount: 150,
      tokens: 15,
      date: "2025-06-01",
      txHash: "0x32fe...9bcd"
    },
    {
      id: 2,
      type: "Sell",
      businessName: "Bright Smile Dental",
      amount: 300,
      tokens: 20,
      date: "2025-05-20",
      txHash: "0x72ac...3def"
    },
    {
      id: 3,
      type: "Buy",
      businessName: "Harbor Bookstore",
      amount: 600,
      tokens: 50,
      date: "2025-05-15",
      txHash: "0x91fe...7abc"
    },
    {
      id: 4,
      type: "Dividend",
      businessName: "Green Earth Café",
      amount: 62.5,
      tokens: 0,
      date: "2025-03-15",
      txHash: "0x91ab...5cde"
    },
  ];

  const totalPortfolioValue = mockPortfolio.reduce((sum, investment) => sum + investment.tokenValue, 0);
  
  if (!currentAccount) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center"
        >
          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
            <Wallet size={28} className="text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6">
            Please connect your wallet to access your investor dashboard and view your investments.
          </p>
          <button
            onClick={connectWallet}
            className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition-colors"
          >
            Connect Wallet
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Investor Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Track your investments, dividends, and transactions
          </p>
        </div>

        {/* Portfolio Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-500 text-sm mb-1">Total Portfolio Value</h3>
            <div className="flex items-end">
              <span className="text-3xl font-bold text-gray-900">${totalPortfolioValue.toFixed(2)}</span>
              <span className="text-green-600 text-sm ml-2 flex items-center">
                <ArrowUp size={14} className="mr-1" />
                3.2%
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-500 text-sm mb-1">Total Businesses</h3>
            <div className="flex items-end">
              <span className="text-3xl font-bold text-gray-900">{mockPortfolio.length}</span>
              <span className="text-sm ml-2 text-gray-500">local investments</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-500 text-sm mb-1">Total Dividends (2025)</h3>
            <div className="flex items-end">
              <span className="text-3xl font-bold text-gray-900">$197.50</span>
              <span className="text-green-600 text-sm ml-2 flex items-center">
                <ArrowUp size={14} className="mr-1" />
                12.5%
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'portfolio'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Layers size={18} className="mr-2" />
                Portfolio
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('dividends')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dividends'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <DollarSign size={18} className="mr-2" />
                Dividends
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('transactions')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'transactions'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <RefreshCw size={18} className="mr-2" />
                Transactions
              </div>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'portfolio' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Your Investments</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {mockPortfolio.map((investment) => (
                  <div key={investment.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                          <img src={investment.image} alt={investment.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="ml-4">
                          <Link to={`/businesses/${investment.id}`} className="text-lg font-medium text-gray-900 hover:text-primary-600">
                            {investment.name}
                          </Link>
                          <p className="text-sm text-gray-500">
                            {investment.tokenAmount} tokens ({investment.percentOwned}% ownership)
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">${investment.tokenValue}</p>
                        <p className={`text-sm flex items-center justify-end ${investment.percentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {investment.percentChange >= 0 ? (
                            <ArrowUp size={14} className="mr-1" />
                          ) : (
                            <ArrowDown size={14} className="mr-1" />
                          )}
                          {Math.abs(investment.percentChange)}%
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-sm border border-primary-500 text-primary-600 rounded hover:bg-primary-50">
                          Buy More
                        </button>
                        <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                          Sell
                        </button>
                      </div>
                      <div className="text-sm text-gray-500">
                        Token Price: ${investment.tokenPrice}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <Link to="/businesses" className="text-primary-600 hover:text-primary-800 font-medium">
                  Browse more businesses to invest in
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'dividends' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Dividend History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quarter</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockDividends.map((dividend) => (
                      <tr key={dividend.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{dividend.businessName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{dividend.quarter}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-green-600">${dividend.amount.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(dividend.date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {dividend.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a href="#" className="text-primary-600 hover:text-primary-800">
                            {dividend.txHash}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">
                    Next expected dividend: <span className="font-medium">Sep 15, 2025</span>
                  </p>
                </div>
                <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
                  View All Transactions
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'transactions' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Transaction History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tokens</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            tx.type === 'Buy' ? 'bg-green-100 text-green-800' : 
                            tx.type === 'Sell' ? 'bg-red-100 text-red-800' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {tx.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{tx.businessName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${
                            tx.type === 'Buy' ? 'text-red-600' : 
                            tx.type === 'Sell' ? 'text-green-600' : 
                            'text-green-600'
                          }`}>
                            {tx.type === 'Buy' ? '-' : '+'} ${tx.amount}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {tx.tokens > 0 ? (
                              tx.type === 'Buy' ? `+${tx.tokens}` : `-${tx.tokens}`
                            ) : '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(tx.date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a href="#" className="text-primary-600 hover:text-primary-800">
                            {tx.txHash}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 px-6 py-4 flex justify-end">
                <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
                  Download Transaction History
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InvestorDashboardPage;
