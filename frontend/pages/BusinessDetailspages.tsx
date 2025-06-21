import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Building, Users, DollarSign, TrendingUp, Calendar, Activity, ChevronRight, PieChart, BarChart3 } from 'lucide-react';
import { mockBusinesses } from '../utils/mockData';
import { useWallet } from '../context/WalletContext';
import toast from 'react-hot-toast';

const BusinessDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const businessId = parseInt(id || '1');
  const business = mockBusinesses.find(b => b.id === businessId) || mockBusinesses[0];
  
  const [investAmount, setInvestAmount] = useState<string>('');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const { currentAccount, isCorrectNetwork, switchToCorrectNetwork } = useWallet();

  const handleInvestClick = () => {
    if (!currentAccount) {
      toast.error('Please connect your wallet first');
      return;
    }
    
    if (!isCorrectNetwork) {
      toast.error('Please switch to Sepolia testnet');
      switchToCorrectNetwork();
      return;
    }
    
    setShowPurchaseModal(true);
  };

  const handlePurchase = () => {
    if (!investAmount || parseFloat(investAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (parseFloat(investAmount) < business.minimumInvestment) {
      toast.error(`Minimum investment is $${business.minimumInvestment}`);
      return;
    }
    
    // In a real app, this would call a smart contract function
    toast.success(`Successfully invested $${investAmount} in ${business.name}`);
    setShowPurchaseModal(false);
    setInvestAmount('');
  };

  if (!business) {
    return <div className="text-center py-16">Business not found</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Banner */}
      <div className="w-full h-64 md:h-80 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/70 to-primary-700/70 z-10"></div>
        <img 
          src={business.image} 
          alt={business.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/businesses" className="inline-flex items-center text-white mb-4 hover:underline">
              <ArrowLeft size={16} className="mr-1" />
              Back to Listings
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{business.name}</h1>
            <div className="flex items-center text-white/90 text-sm mb-4">
              <Building size={16} className="mr-1" />
              <span>{business.type}</span>
              <span className="mx-2">•</span>
              <Users size={16} className="mr-1" />
              <span>{business.investorCount} investors</span>
            </div>
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm">
              {business.status === 'active' ? 'Actively Funding' : business.status}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{business.name}</h2>
                    <p className="text-gray-500">{business.location}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <Activity size={16} className="mr-1" />
                      {parseFloat(business.dividendYield)}% Annual Yield
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{business.fullDescription || business.description}</p>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-3">Business Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Founded</p>
                      <p className="font-medium">{business.founded}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Employees</p>
                      <p className="font-medium">{business.employees}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Revenue (2024)</p>
                      <p className="font-medium">{business.revenue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Profit Margin</p>
                      <p className="font-medium">{business.profitMargin}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Business Performance */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Performance & Growth</h3>
                
                <div className="mb-6">
                  <h4 className="text-md font-medium mb-2 flex items-center">
                    <TrendingUp size={16} className="mr-1 text-primary-600" />
                    Revenue Growth
                  </h4>
                  <div className="h-12 bg-gray-100 rounded-md overflow-hidden relative">
                    {/* This would be a chart in a real app */}
                    <div className="absolute inset-y-0 left-0 bg-primary-500" style={{ width: '65%' }}></div>
                    <div className="absolute inset-0 flex items-center justify-end pr-3">
                      <span className="text-sm font-medium">+65% YoY</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-md font-medium mb-2 flex items-center">
                    <PieChart size={16} className="mr-1 text-secondary-600" />
                    Profit Distribution
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-gray-50 p-3 rounded-md text-center">
                      <p className="text-xs text-gray-500">Reinvestment</p>
                      <p className="font-semibold">40%</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md text-center">
                      <p className="text-xs text-gray-500">Dividends</p>
                      <p className="font-semibold text-green-600">45%</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md text-center">
                      <p className="text-xs text-gray-500">Reserves</p>
                      <p className="font-semibold">15%</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium mb-2 flex items-center">
                    <BarChart3 size={16} className="mr-1 text-accent-600" />
                    Quarterly Earnings
                  </h4>
                  <div className="h-40 bg-gray-100 rounded-md p-3 flex items-end justify-between">
                    {/* Simplified chart representation */}
                    {[45, 60, 40, 75].map((height, i) => (
                      <div key={i} className="w-1/6">
                        <div 
                          className="bg-accent-500 rounded-t-sm" 
                          style={{ height: `${height}%` }}
                        ></div>
                        <p className="text-xs text-center mt-1">Q{i+1}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Business Updates */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Recent Updates</h3>
                
                <div className="space-y-4">
                  {[
                    { 
                      date: "Jun 15, 2025", 
                      title: "Quarterly Dividend Distribution",
                      content: "We're pleased to announce a quarterly dividend of 2.1% has been distributed to all token holders."
                    },
                    { 
                      date: "May 22, 2025", 
                      title: "New Location Opening",
                      content: "Thanks to community investment, we're expanding with a new location downtown opening next month."
                    },
                    { 
                      date: "Apr 03, 2025", 
                      title: "Equipment Upgrade Complete",
                      content: "We've completed our planned equipment upgrade, which should increase production capacity by 30%."
                    }
                  ].map((update, i) => (
                    <div key={i} className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                          <Calendar size={20} />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{update.date}</p>
                        <h4 className="font-medium text-gray-900">{update.title}</h4>
                        <p className="text-gray-600">{update.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Investment Card */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md sticky top-24"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Investment Details</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valuation</span>
                    <span className="font-medium">{business.valuation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Ownership</span>
                    <span className="font-medium">{business.percentAvailable}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Minimum Investment</span>
                    <span className="font-medium">${business.minimumInvestment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Dividend Yield</span>
                    <span className="font-medium text-green-600">{business.dividendYield}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dividend Frequency</span>
                    <span className="font-medium">Quarterly</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Token Price</span>
                    <span className="font-medium">${business.tokenPrice} USDC</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Funding Progress</h4>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${business.fundingProgress}%` }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{business.fundingProgress}% Funded</span>
                    <span>${business.amountRaised} / ${business.fundingGoal}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleInvestClick}
                  className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition-colors flex items-center justify-center"
                >
                  <DollarSign size={18} className="mr-2" />
                  Invest Now
                </button>
                
                <div className="mt-4 text-sm text-gray-500 flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-gray-400 mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.75.75 0 00.736-.686A3.49 3.49 0 0113 12.5a.75.75 0 00.695-1.046l-.493-1.172a.75.75 0 00-.668-.448c-.74 0-1.619.408-2.34 1.012A.75.75 0 009 10.25V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>
                    Investments are made in USDC on the Sepolia testnet. Returns are projected based on past performance and are not guaranteed.
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-200">
                <div className="p-6">
                  <h4 className="font-medium text-gray-900 mb-3">Business Documents</h4>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-primary-600 hover:text-primary-800 flex items-center">
                        <span>Business Plan</span>
                        <ChevronRight size={16} className="ml-auto" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary-600 hover:text-primary-800 flex items-center">
                        <span>Financial Statements</span>
                        <ChevronRight size={16} className="ml-auto" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary-600 hover:text-primary-800 flex items-center">
                        <span>Token Contract</span>
                        <ChevronRight size={16} className="ml-auto" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary-600 hover:text-primary-800 flex items-center">
                        <span>Legal Agreement</span>
                        <ChevronRight size={16} className="ml-auto" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 mx-4">
            <h3 className="text-xl font-semibold mb-4">Invest in {business.name}</h3>
            <p className="text-gray-600 mb-6">
              You are about to purchase ownership tokens for {business.name}. These tokens represent real equity in the business.
            </p>
            
            <div className="mb-6">
              <label htmlFor="investAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Investment Amount (USD)
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="investAmount"
                  id="investAmount"
                  value={investAmount}
                  onChange={(e) => setInvestAmount(e.target.value)}
                  className="block w-full rounded-md border-gray-300 pl-7 pr-12 py-2 border focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="0.00"
                  min={business.minimumInvestment}
                  step="0.01"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-500 sm:text-sm">USDC</span>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Minimum investment: ${business.minimumInvestment}
              </p>
            </div>
            
            {investAmount && parseFloat(investAmount) > 0 && (
              <div className="bg-gray-50 p-3 rounded-md mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Estimated tokens:</span>
                  <span className="font-medium">{(parseFloat(investAmount) / parseFloat(business.tokenPrice)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Estimated annual dividends:</span>
                  <span className="font-medium text-green-600">
                    ${(parseFloat(investAmount) * (parseFloat(business.dividendYield) / 100)).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                disabled={!investAmount || parseFloat(investAmount) <= 0}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Investment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessDetailPage;
