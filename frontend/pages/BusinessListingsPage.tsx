import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, TrendingUp, BarChart, MapPin, Building2, ChevronRight, Activity } from 'lucide-react';
import { mockBusinesses } from '../utils/mockData';

const BusinessListingsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [filteredBusinesses, setFilteredBusinesses] = useState(mockBusinesses);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories', icon: <Building2 size={16} /> },
    { id: 'food', name: 'Food & Beverage', icon: <Activity size={16} /> },
    { id: 'retail', name: 'Retail', icon: <TrendingUp size={16} /> },
    { id: 'health', name: 'Healthcare', icon: <Activity size={16} /> },
    { id: 'tech', name: 'Technology', icon: <BarChart size={16} /> },
  ];

  const sortOptions = [
    { id: 'newest', name: 'Newest Additions' },
    { id: 'highest_yield', name: 'Highest Yield' },
    { id: 'lowest_min', name: 'Lowest Min Investment' },
    { id: 'highest_valuation', name: 'Highest Valuation' }
  ];

  useEffect(() => {
    let results = mockBusinesses;
    
    if (searchTerm) {
      results = results.filter(business => 
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      results = results.filter(business => business.category === selectedCategory);
    }
    
    switch (sortBy) {
      case 'highest_yield':
        results = [...results].sort((a, b) => parseFloat(b.dividendYield) - parseFloat(a.dividendYield));
        break;
      case 'lowest_min':
        results = [...results].sort((a, b) => a.minimumInvestment - b.minimumInvestment);
        break;
      case 'highest_valuation':
        results = [...results].sort((a, b) => {
          const aVal = parseFloat(a.valuation.replace(/[^0-9.]/g, ''));
          const bVal = parseFloat(b.valuation.replace(/[^0-9.]/g, ''));
          return bVal - aVal;
        });
        break;
      case 'newest':
      default:
        break;
    }
    
    setFilteredBusinesses(results);
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-gray-900 to-primary-900 pt-16 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
          >
            Explore Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-emerald-300">Opportunities</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto font-light"
          >
            Discover verified local businesses seeking capital. Invest securely and build a portfolio of real-world assets yielding consistent dividends.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        {/* Search and Filter Bar - Glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-200/50 border border-white p-4 mb-10"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-2/5">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-4 py-3.5 border-none bg-gray-50/50 rounded-xl leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-gray-900 shadow-inner"
                placeholder="Search businesses, sectors, or keywords..."
              />
            </div>
            
            <div className="w-full md:w-3/5 flex flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:w-1/2">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Filter size={18} className="text-gray-400" />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full pl-12 pr-10 py-3.5 border border-gray-100 bg-white rounded-xl leading-5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 font-medium appearance-none shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <ChevronRight size={16} className="text-gray-400 rotate-90" />
                </div>
              </div>
              
              <div className="relative w-full sm:w-1/2">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <TrendingUp size={18} className="text-gray-400" />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-full pl-12 pr-10 py-3.5 border border-gray-100 bg-white rounded-xl leading-5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 font-medium appearance-none shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      Sort: {option.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <ChevronRight size={16} className="text-gray-400 rotate-90" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
            {categories.slice(1).map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id === selectedCategory ? 'all' : cat.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center ${
                  selectedCategory === cat.id 
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span className="mr-1.5 opacity-70">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Business Listings Grid */}
        <div className="flex justify-between items-end mb-6">
          <p className="text-gray-600 font-medium">Showing <span className="text-gray-900 font-bold">{filteredBusinesses.length}</span> opportunities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredBusinesses.length > 0 ? (
              filteredBusinesses.map((business, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  key={business.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent z-10"></div>
                    <img 
                      src={business.image} 
                      alt={business.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                       <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wider text-primary-700 rounded-full shadow-sm">
                        {business.type}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary-300 transition-colors drop-shadow-md">{business.name}</h3>
                        <div className="flex items-center text-gray-200 text-sm font-medium">
                          <MapPin size={14} className="mr-1" /> {business.location.split(',')[1] || business.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col bg-white">
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">{business.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6 mt-auto">
                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Min. Invest</p>
                        <p className="text-lg font-bold text-gray-900">${business.minimumInvestment}</p>
                      </div>
                      <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                        <p className="text-xs text-emerald-600 uppercase tracking-wider font-semibold mb-1">Target Yield</p>
                        <p className="text-lg font-bold text-emerald-700 flex items-center">
                          {business.dividendYield} <TrendingUp className="ml-1 w-4 h-4" />
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">Available Equity</span>
                        <span className="font-bold text-gray-900">{business.percentAvailable}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">Current Valuation</span>
                        <span className="font-bold text-gray-900">{business.valuation}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">Active Investors</span>
                        <span className="font-bold flex items-center text-gray-900">
                           <BarChart size={14} className="mr-1 text-primary-500" /> {business.investorCount}
                        </span>
                      </div>
                    </div>
                    
                    <Link
                      to={`/businesses/${business.id}`}
                      className="block w-full py-3.5 px-4 bg-gray-900 hover:bg-primary-600 text-white text-center rounded-xl font-bold transition-all duration-300 shadow-md flex items-center justify-center group-hover:shadow-primary-500/25"
                    >
                      Analyze Opportunity <ChevronRight size={18} className="ml-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm"
              >
                <div className="mx-auto h-24 w-24 text-gray-300 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Search size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No opportunities found</h3>
                <p className="text-gray-500 max-w-md mx-auto">We couldn't find any businesses matching your exact criteria. Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                  className="mt-6 px-6 py-2 bg-primary-50 text-primary-700 font-semibold rounded-full hover:bg-primary-100 transition-colors"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BusinessListingsPage;
