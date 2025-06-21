import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, BarChart } from 'lucide-react';
import { mockBusinesses } from '../utils/mockData';

const BusinessListingsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [filteredBusinesses, setFilteredBusinesses] = useState(mockBusinesses);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'food', name: 'Food & Beverage' },
    { id: 'retail', name: 'Retail' },
    { id: 'health', name: 'Healthcare' },
    { id: 'tech', name: 'Technology' },
    { id: 'service', name: 'Services' }
  ];

  const sortOptions = [
    { id: 'newest', name: 'Newest' },
    { id: 'highest_yield', name: 'Highest Yield' },
    { id: 'lowest_min', name: 'Lowest Min Investment' },
    { id: 'highest_valuation', name: 'Highest Valuation' }
  ];

  useEffect(() => {
    let results = mockBusinesses;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(business => 
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      results = results.filter(business => business.category === selectedCategory);
    }
    
    // Sort results
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
        // Assume they're already sorted by newest
        break;
    }
    
    setFilteredBusinesses(results);
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse Business Listings</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover local businesses seeking community investment. Filter by category, sort by performance, and find your next investment opportunity.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search businesses..."
              />
            </div>
            
            <div>
              <label htmlFor="category" className="sr-only">Category</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter size={20} className="text-gray-400" />
                </div>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="sort" className="sr-only">Sort by</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <TrendingUp size={20} className="text-gray-400" />
                </div>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Business Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.length > 0 ? (
            filteredBusinesses.map((business, index) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={business.image} 
                    alt={business.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{business.name}</h3>
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{business.type}</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{business.description}</p>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-gray-50 p-2 rounded-md text-center">
                      <p className="text-xs text-gray-500">Available</p>
                      <p className="font-semibold text-gray-900">{business.percentAvailable}%</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-md text-center">
                      <p className="text-xs text-gray-500">Valuation</p>
                      <p className="font-semibold text-gray-900">{business.valuation}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-md text-center">
                      <p className="text-xs text-gray-500">Yield</p>
                      <p className="font-semibold text-green-600">{business.dividendYield}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <BarChart size={16} className="mr-1" />
                      <span>{business.investorCount} investors</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Min: </span>
                      <span className="font-medium">${business.minimumInvestment}</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/businesses/${business.id}`}
                    className="block w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-md font-medium transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 py-12 text-center">
              <div className="mx-auto h-20 w-20 text-gray-400">
                <Search size={80} strokeWidth={1} />
              </div>
              <h3 className="mt-2 text-xl font-medium text-gray-900">No businesses found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessListingsPage;
