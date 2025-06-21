import React, { useState } from 'react';
import { motion } from 'framer-motion';
 import { BarChart, Users, DollarSign, Calendar, TrendingUp, Download, Plus } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import toast from 'react-hot-toast';

const BusinessDashboardPage: React.FC = () => {
  const { currentAccount, connectWallet } = useWallet();
  const [activeTab, setActiveTab] = useState<'overview' | 'investors' | 'dividends'>('overview');
  const [showDividendModal, setShowDividendModal] = useState(false);
  const [dividendAmount, setDividendAmount] = useState<string>('');
  const [dividendNote, setDividendNote] = useState<string>('');

  // Mock data for a business owner's dashboard
  const businessData = {
    name: "Green Earth Café",
    tokenized: 40,
    valuation: "$450,000",
    investors: 32,
    tokensIssued: 18000,
    tokenPrice: 10,
    tokensSold: 12500,
    revenue: {
      current: 280000,
      previous: 230000,
      percentChange: 21.7
    },
    dividendsPaid: {
      total: 24000,
      lastQuarter: 6500
    },
    ownerTokens: 5500,
    image: "https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg",
  };

  const mockInvestors = [
    { address: "0x1234...5678", tokens: 2500, ownership: "5.56%", since: "2025-01-15" },
    { address: "0x8765...4321", tokens: 1800, ownership: "4.00%", since: "2025-02-03" },
    { address: "0x9876...1234", tokens: 1500, ownership: "3.33%", since: "2025-02-10" },
    { address: "0x4567...8901", tokens: 1200, ownership: "2.67%", since: "2025-03-05" },
    { address: "0x2345...6789", tokens: 1000, ownership: "2.22%", since: "2025-03-20" },
    { address: "0x3456...7890", tokens: 800, ownership: "1.78%", since: "2025-04-15" },
    { address: "0x5678...9012", tokens: 700, ownership: "1.56%", since: "2025-05-01" },
    { address: "0x6789...0123", tokens: 500, ownership: "1.11%", since: "2025-05-10" },
    { address: "0x7890...1234", tokens: 500, ownership: "1.11%", since: "2025-05-20" },
    { address: "0x8901...2345", tokens: 400, ownership: "0.89%", since: "2025-06-01" },
  ];

  const mockDividendHistory = [
    { date: "2025-06-15", amount: 6500, quarter: "Q2 2025", investorCount: 32, status: "Distributed" },
    { date: "2025-03-15", amount: 6000, quarter: "Q1 2025", investorCount: 28, status: "Distributed" },
    { date: "2024-12-15", amount: 5500, quarter: "Q4 2024", investorCount: 25, status: "Distributed" },
    { date: "2024-09-15", amount: 4500, quarter: "Q3 2024", investorCount: 22, status: "Distributed" },
  ];

  const handleDistributeDividends = () => {
    if (!dividendAmount || parseFloat(dividendAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    // In a real app, this would call a smart contract function
    toast.success(`Successfully distributed $${dividendAmount} to ${businessData.investors} investors`);
    setShowDividendModal(false);
    setDividendAmount('');
    setDividendNote('');
  };

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
            {/* <Building size={28} className="text-primary-600" /> */}
          </div>
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6">
            Please connect your wallet to access your business dashboard and manage your listing.
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
              <img src={businessData.image} alt={businessData.name} className="h-full w-full object-cover" />
            </div>
            <div className="ml-4">
              <h1 className="text-3xl font-bold text-gray-900">{businessData.name}</h1>
              <p className="text-gray-600">Business Dashboard</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button 
              onClick={() => setShowDividendModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <DollarSign size={16} className="mr-2" />
              Distribute Dividends
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <Download size={16} className="mr-2" />
              Generate Report
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-md bg-primary-100 text-primary-600">
                <DollarSign size={24} />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Business Valuation</p>
                <p className="text-2xl font-semibold text-gray-900">{businessData.valuation}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-md bg-secondary-100 text-secondary-600">
                <Users size={24} />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total Investors</p>
                <p className="text-2xl font-semibold text-gray-900">{businessData.investors}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-md bg-accent-100 text-accent-600">
                <BarChart size={24} />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Tokens Sold</p>
                <p className="text-2xl font-semibold text-gray-900">{businessData.tokensSold} / {businessData.tokensIssued}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-md bg-green-100 text-green-600">
                <DollarSign size={24} />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total Dividends Paid</p>
                <p className="text-2xl font-semibold text-gray-900">${businessData.dividendsPaid.total}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <BarChart size={18} className="mr-2" />
                Overview
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('investors')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'investors'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Users size={18} className="mr-2" />
                Investors
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
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Business Performance */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Business Performance</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Current Year Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">${businessData.revenue.current.toLocaleString()}</p>
                      <div className="flex items-center mt-1 text-sm text-green-600">
                        <TrendingUp size={14} className="mr-1" />
                        <span>{businessData.revenue.percentChange}% vs previous year</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-sm text-gray-700 px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Monthly</button>
                      <button className="text-sm text-white px-3 py-1 bg-primary-600 rounded hover:bg-primary-700">Yearly</button>
                    </div>
                  </div>
                  
                  <div className="h-64 bg-gray-100 rounded-md p-4 flex items-end justify-between">
                    {/* Simplified chart representation */}
                    {[35, 45, 38, 55, 60, 58, 65, 70, 68, 75, 80, 85].map((height, i) => (
                      <div key={i} className="w-1/12">
                        <div 
                          className={`rounded-t-sm ${i === 11 ? 'bg-primary-600' : 'bg-primary-400'}`}
                          style={{ height: `${height}%` }}
                        ></div>
                        <p className="text-xs text-center mt-1">{i + 1}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ownership Breakdown */}
            <div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Ownership Breakdown</h3>
                </div>
                <div className="p-6">
                  <div className="h-52 bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                    {/* Simplified pie chart representation */}
                    <div className="relative w-40 h-40">
                      <div className="absolute inset-0 rounded-full border-8 border-primary-500"></div>
                      <div 
                        className="absolute bg-gray-100 rounded-full" 
                        style={{ 
                          top: '8px', 
                          left: '8px', 
                          right: '8px', 
                          bottom: '8px', 
                          clipPath: 'polygon(50% 50%, 100% 50%, 100% 0%, 0% 0%, 0% 50%)' 
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-gray-900">60%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                        <span className="text-sm text-gray-700 ml-2">You (Owner)</span>
                      </div>
                      <span className="text-sm font-medium">60%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-700 ml-2">Community Investors</span>
                      </div>
                      <span className="text-sm font-medium">40%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Token Information</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Tokens</span>
                      <span className="font-medium">{businessData.tokensIssued}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tokens Sold</span>
                      <span className="font-medium">{businessData.tokensSold}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Your Tokens</span>
                      <span className="font-medium">{businessData.ownerTokens}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Token Price</span>
                      <span className="font-medium">${businessData.tokenPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contract Address</span>
                      <a href="#" className="text-primary-600 hover:text-primary-800 truncate max-w-[160px]">0xabc...def</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'investors' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Investor List ({mockInvestors.length})</h3>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* <Search size={16} className="text-gray-400" /> */}
                  const Search = () (
                 <input
                  type="text"
                  placeholder="Search..."
                   className="border p-2 rounded w-full"
                    />
                    );

export default Search;

                </div>
                <input
                  type="text"
                  placeholder="Search investors..."
                  className="border border-gray-300 rounded-md pl-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wallet Address</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tokens</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ownership %</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investor Since</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockInvestors.map((investor, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{investor.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{investor.tokens}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{investor.ownership}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(investor.since).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-primary-600 hover:text-primary-800 mr-3">
                          Message
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">{mockInvestors.length}</span> investors
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                  Next
                </button>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Dividend History</h3>
                    <button
                      onClick={() => setShowDividendModal(true)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                    >
                      <Plus size={16} className="mr-1" />
                      Distribute New
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quarter</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investors</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockDividendHistory.map((dividend, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {new Date(dividend.date).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{dividend.quarter}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">${dividend.amount}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{dividend.investorCount}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {dividend.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <button className="text-primary-600 hover:text-primary-800">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Dividend Stats</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Total Dividends Paid</h4>
                      <p className="text-2xl font-bold text-gray-900">${businessData.dividendsPaid.total}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Last Quarter Dividends</h4>
                      <p className="text-2xl font-bold text-gray-900">${businessData.dividendsPaid.lastQuarter}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Average Dividend per Token</h4>
                      <p className="text-2xl font-bold text-gray-900">$0.52</p>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Dividend Distribution Timeline</h4>
                      <div className="space-y-3">
                        {['Q1', 'Q2', 'Q3', 'Q4'].map((quarter, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className={`h-6 w-6 rounded-full flex items-center justify-center ${idx < 2 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                              <Calendar size={14} />
                            </div>
                            <span className="ml-2 text-sm text-gray-600">{quarter} {new Date().getFullYear()}</span>
                            {idx < 2 && <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800">Complete</span>}
                            {idx === 2 && <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">Upcoming</span>}
                            {idx > 2 && <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">Planned</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Need Help?</h3>
                    <p className="text-gray-600 mb-4">
                      Learn more about managing your business tokens, distributing dividends, and engaging with investors.
                    </p>
                    <a href="#" className="text-primary-600 hover:text-primary-800 font-medium inline-flex items-center">
                      View Documentation
                      {/* <ChevronRight size={16} className="ml-1" /> */}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Distribute Dividend Modal */}
      {showDividendModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 mx-4">
            <h3 className="text-xl font-semibold mb-4">Distribute Quarterly Dividend</h3>
            <p className="text-gray-600 mb-6">
              This will distribute the specified amount proportionally to all {businessData.investors} token holders based on their ownership percentage.
            </p>
            
            <div className="mb-4">
              <label htmlFor="dividendAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Dividend Amount (USD)
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="dividendAmount"
                  id="dividendAmount"
                  value={dividendAmount}
                  onChange={(e) => setDividendAmount(e.target.value)}
                  className="block w-full rounded-md border-gray-300 pl-7 pr-12 py-2 border focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="0.00"
                  min="1"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="dividendNote" className="block text-sm font-medium text-gray-700 mb-1">
                Note to Investors (Optional)
              </label>
              <textarea
                id="dividendNote"
                value={dividendNote}
                onChange={(e) => setDividendNote(e.target.value)}
                rows={3}
                className="block w-full rounded-md border-gray-300 py-2 px-3 border focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Add a note about this dividend payment..."
              />
            </div>
            
            {dividendAmount && (
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Per Token Amount:</span>
                  <span className="font-medium">
                    ${(parseFloat(dividendAmount) / businessData.tokensSold).toFixed(4)}
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">Quarter:</span>
                  <span className="font-medium">Q2 2025</span>
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDividendModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDistributeDividends}
                disabled={!dividendAmount || parseFloat(dividendAmount) <= 0}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Distribute Dividend
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessDashboardPage;
