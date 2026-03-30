import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Building, Users, DollarSign, TrendingUp, Calendar, Activity, ChevronRight, PieChart, BarChart3, ShieldCheck, MapPin } from 'lucide-react';
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
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Building className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Opportunity Not Found</h2>
        <p className="text-gray-500 mt-2">This business listing may have been removed or funded completely.</p>
        <Link to="/businesses" className="mt-6 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Back to Marketplace</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans selection:bg-emerald-200">
      {/* Hero Banner - Dark Mode */}
      <div className="w-full h-[32rem] md:h-[36rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gray-900/50 mix-blend-multiply z-10"></div>
        <img 
          src={business.image} 
          alt={business.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-16">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Link to="/businesses" className="inline-flex items-center text-gray-300 mb-6 hover:text-white transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to Marketplace
              </Link>
              
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-xs font-bold tracking-wider uppercase">
                  {business.type}
                </span>
                <span className="px-3 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-300 rounded-full text-xs font-bold tracking-wider uppercase flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></div>
                  {business.status === 'active' ? 'Actively Funding' : business.status}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">{business.name}</h1>
              
              <div className="flex flex-wrap items-center text-gray-300 text-sm md:text-base gap-6 font-medium">
                <span className="flex items-center"><MapPin size={18} className="mr-1.5 text-gray-400" /> {business.location}</span>
                <span className="flex items-center"><Users size={18} className="mr-1.5 text-gray-400" /> {business.investorCount} Active Investors</span>
                <span className="flex items-center"><ShieldCheck size={18} className="mr-1.5 text-emerald-400" /> Verified Asset</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Executive Summary</h2>
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Opportunity Overview</p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center shadow-sm">
                    <Activity size={24} className="text-emerald-600 mr-3" />
                    <div>
                      <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Target Yield</p>
                      <p className="text-xl font-extrabold text-emerald-700">{business.dividendYield} APY</p>
                    </div>
                  </div>
                </div>

                <div className="prose prose-lg text-gray-600 mb-10 file:leading-relaxed">
                  <p>{business.fullDescription || business.description}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Founded</p>
                    <p className="text-lg font-bold text-gray-900">{business.founded}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Team Size</p>
                    <p className="text-lg font-bold text-gray-900">{business.employees} Employees</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">TTM Revenue</p>
                    <p className="text-lg font-bold text-gray-900">{business.revenue}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Profit Margin</p>
                    <p className="text-lg font-bold text-gray-900">{business.profitMargin}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Financial Performance */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Financial Health</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
                      <TrendingUp size={16} className="mr-2 text-primary-500" /> Revenue Growth (YoY)
                    </h4>
                    <div className="h-16 bg-gray-200/50 rounded-xl overflow-hidden relative border border-gray-200">
                      <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-primary-400" />
                      <div className="absolute inset-0 flex items-center justify-end pr-4 text-sm font-bold text-gray-900 drop-shadow-sm">+65%</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
                      <PieChart size={16} className="mr-2 text-secondary-500" /> Capital Allocation
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white p-3 rounded-lg text-center shadow-sm border border-gray-100">
                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Reinvest</p>
                        <p className="font-extrabold text-gray-900">40%</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center shadow-sm border border-gray-100">
                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Dividends</p>
                        <p className="font-extrabold text-emerald-600">45%</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center shadow-sm border border-gray-100">
                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Reserve</p>
                        <p className="font-extrabold text-gray-900">15%</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 flex items-center">
                    <BarChart3 size={16} className="mr-2 text-accent-500" /> Quarterly Earnings Output
                  </h4>
                  <div className="h-48 flex items-end justify-between gap-2 md:gap-4 px-2">
                    {[45, 60, 40, 75, 85, 65].map((height, i) => (
                      <div key={i} className="w-1/6 flex flex-col items-center group">
                        <motion.div 
                          initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ duration: 1, delay: i * 0.1 }}
                          className="w-full max-w-[40px] bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg relative group-hover:opacity-90 transition-opacity"
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs py-1 px-2 rounded font-bold shadow-lg">
                            ${height}k
                          </div>
                        </motion.div>
                        <p className="text-xs font-bold text-gray-500 mt-3 pt-3 border-t border-gray-200 w-full text-center">Q{i+1}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Business Updates */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Recent Milestones</h3>
                
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                  {[
                    { date: "Jun 15, 2025", title: "Dividend Distributed", content: "A quarterly dividend of 2.1% has been distributed automatically via smart contract to all token holders.", icon: <DollarSign size={16} className="text-emerald-500" /> },
                    { date: "May 22, 2025", title: "Location Secured", content: "Thanks to community investment, we've signed the lease for our new downtown expansion opening next month.", icon: <Building size={16} className="text-primary-500" /> },
                    { date: "Apr 03, 2025", title: "Upgrade Complete", content: "Completed planned equipment upgrade, increasing daily production capacity by 30%.", icon: <Activity size={16} className="text-accent-500" /> }
                  ].map((update, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-gray-50 text-gray-500 shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                        {update.icon || <Calendar size={16} />}
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-5 rounded-xl border border-gray-100 shadow-sm transition-shadow group-hover:shadow-md">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold uppercase tracking-wider text-primary-600 mb-1">{update.date}</span>
                          <h4 className="text-lg font-bold text-gray-900 mb-2">{update.title}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{update.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Investment Card */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, y: 20, x: 20 }} animate={{ opacity: 1, y: 0, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 sticky top-24 overflow-hidden"
            >
              <div className="p-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500"></div>
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Invest Now</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-500 text-sm font-medium">Current Valuation</span>
                    <span className="font-bold text-gray-900 text-lg">{business.valuation}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-500 text-sm font-medium">Equity Available</span>
                    <span className="font-bold text-gray-900">{business.percentAvailable}%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-500 text-sm font-medium">Min. Investment</span>
                    <span className="font-bold text-gray-900">${business.minimumInvestment}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-500 text-sm font-medium">Expected APY</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-sm">{business.dividendYield}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-500 text-sm font-medium">Token Price</span>
                    <span className="font-bold text-gray-900 flex items-center">${business.tokenPrice} <span className="text-xs text-gray-400 ml-1">USDC</span></span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-2xl mb-8 border border-gray-100">
                  <div className="flex justify-between text-sm font-medium text-gray-900 mb-3">
                    <span>Funding Raised</span>
                    <span className="text-primary-600 font-bold">${business.amountRaised} <span className="text-gray-400 text-xs font-normal">/ ${business.fundingGoal}</span></span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden border border-gray-300 shadow-inner">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${business.fundingProgress}%` }} transition={{ duration: 1, delay: 0.5 }} className="bg-gradient-to-r from-primary-500 to-secondary-500 h-full rounded-full" />
                  </div>
                  <p className="text-right text-xs font-bold text-gray-500 uppercase tracking-widest">{business.fundingProgress}% Complete</p>
                </div>
                
                <button
                  onClick={handleInvestClick}
                  className="w-full py-4 px-4 bg-gray-900 hover:bg-primary-600 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-gray-900/20 hover:shadow-primary-600/30 flex items-center justify-center transform hover:-translate-y-1 focus:ring-4 focus:ring-primary-500/50 focus:outline-none"
                >
                  <DollarSign size={20} className="mr-2 opacity-80" /> Provide Capital
                </button>
                
                <div className="mt-6 flex items-start p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <ShieldCheck className="flex-shrink-0 h-5 w-5 text-orange-400 mr-3 mt-0.5" />
                  <p className="text-xs text-orange-800 leading-relaxed font-medium">
                    Investments are denominated in USDC on Sepolia testnet. Always review the token smart contract and business prospectus before committing capital.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 border-t border-gray-100 p-6 sm:p-8">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Official Documents</h4>
                <ul className="space-y-3">
                  {['Business Plan', 'Audited Financials', 'Token Smart Contract', 'Investor Agreement'].map((doc, i) => (
                    <li key={i}>
                      <a href="#" className="group flex items-center justify-between p-3 rounded-lg hover:bg-white border border-transparent hover:border-gray-200 transition-all shadow-sm hover:shadow">
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">{doc}</span>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl border border-gray-100"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Fund {business.name}</h3>
                <p className="text-sm text-gray-500 font-medium">You are purchasing direct equity tokens.</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-2 font-bold text-gray-900">${business.tokenPrice}/token</div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="investAmount" className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
                Investment Amount <span className="text-gray-400 font-normal">(USDC)</span>
              </label>
              <div className="relative rounded-xl shadow-sm border border-gray-300 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition-all overflow-hidden bg-gray-50 focus-within:bg-white">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <span className="text-gray-500 font-bold">$</span>
                </div>
                <input
                  type="number"
                  name="investAmount"
                  id="investAmount"
                  value={investAmount}
                  onChange={(e) => setInvestAmount(e.target.value)}
                  className="block w-full border-none bg-transparent pl-8 pr-16 py-4 text-gray-900 text-lg font-bold focus:ring-0"
                  placeholder="0.00"
                  min={business.minimumInvestment}
                  step="0.01"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <button onClick={() => setInvestAmount(business.minimumInvestment.toString())} className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded hover:bg-primary-100 transition-colors uppercase tracking-wider">
                    Min
                  </button>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs font-medium text-gray-500">
                <span>Minimum entry: ${business.minimumInvestment}</span>
                <span>Wallet Balance: -- USDC</span>
              </div>
            </div>
            
            {investAmount && parseFloat(investAmount) > 0 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl mb-8 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Estimated Tokens</span>
                  <span className="font-bold text-gray-900">{(parseFloat(investAmount) / parseFloat(business.tokenPrice)).toFixed(2)} {business.type.substring(0,3).toUpperCase()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Projected Annual Dividend</span>
                  <span className="font-bold text-emerald-700">
                    +${(parseFloat(investAmount) * (parseFloat(business.dividendYield) / 100)).toFixed(2)}/yr
                  </span>
                </div>
              </motion.div>
            )}
            
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="w-full sm:w-auto px-6 py-3.5 border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                disabled={!investAmount || parseFloat(investAmount) <= 0}
                className="w-full sm:w-auto px-8 py-3.5 bg-gray-900 hover:bg-primary-600 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-primary-600/30"
              >
                Sign Transaction
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BusinessDetailPage;
