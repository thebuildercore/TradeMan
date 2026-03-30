import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { Menu, X, Wallet, AlertCircle, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { currentAccount, connectWallet, isConnecting, isCorrectNetwork, switchToCorrectNetwork } = useWallet();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Businesses', path: '/businesses' },
    ...(currentAccount ? [
      { name: 'Investor Dashboard', path: '/investor-dashboard' },
      { name: 'Business Dashboard', path: '/business-dashboard' },
      { name: 'Create Listing', path: '/create-listing' }
    ] : [])
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-md py-2' : 'bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-sm py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-300">
                <TrendingUp className="text-white" size={20} strokeWidth={2.5} />
              </div>
              <span className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
                TradeMan
              </span>
            </Link>
          </motion.div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <div className="flex items-center space-x-1 bg-gray-50/50 p-1 rounded-full backdrop-blur-md border border-gray-100/50 mr-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive(link.path)
                      ? 'text-emerald-700 bg-white shadow-sm'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-100/50'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div 
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full mx-3"
                    />
                  )}
                </Link>
              ))}
            </div>
            
            {!isCorrectNetwork && currentAccount && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={switchToCorrectNetwork}
                className="inline-flex items-center px-4 py-2 bg-rose-50 border border-rose-200 text-rose-600 rounded-full text-sm font-medium hover:bg-rose-100 transition-colors shadow-sm"
              >
                <AlertCircle size={16} className="mr-1.5" />
                Wrong Network
              </motion.button>
            )}
            
            {currentAccount ? (
              <div className="bg-white border border-gray-200 shadow-sm rounded-full px-5 py-2 text-sm font-semibold text-gray-800 flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
                {formatAddress(currentAccount)}
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={connectWallet}
                disabled={isConnecting}
                className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full shadow-lg shadow-emerald-500/30 text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300"
              >
                {isConnecting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connecting
                  </div>
                ) : (
                  <>
                    <Wallet size={18} className="mr-2" />
                    Connect Wallet
                  </>
                )}
              </motion.button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex justify-end items-center md:hidden h-14">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    isActive(link.path) 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 mt-2 border-t border-gray-100">
                {!isCorrectNetwork && currentAccount && (
                  <button
                    onClick={switchToCorrectNetwork}
                    className="w-full text-left px-4 py-3 text-base font-semibold text-rose-700 bg-rose-50 rounded-xl hover:bg-rose-100 flex items-center mb-3"
                  >
                    <AlertCircle size={18} className="mr-2" />
                    Switch to Sepolia Network
                  </button>
                )}
                
                {currentAccount ? (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800 font-medium flex items-center justify-center">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                    {formatAddress(currentAccount)}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      connectWallet();
                      setIsOpen(false);
                    }}
                    disabled={isConnecting}
                    className="w-full flex justify-center items-center px-4 py-3 rounded-xl shadow-lg shadow-emerald-500/20 text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 font-semibold"
                  >
                    <Wallet size={18} className="mr-2" />
                    {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
