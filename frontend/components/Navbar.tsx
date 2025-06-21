import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { Menu, X, Wallet, AlertCircle } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentAccount, connectWallet, isConnecting, isCorrectNetwork, switchToCorrectNetwork } = useWallet();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-primary-700 font-medium' : 'text-gray-600 hover:text-primary-600';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 rounded-md bg-primary-700 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m2 9 20-5-5 20-4-13L2 9z"></path>
                </svg>
              </div>
              <span className="ml-3 text-xl font-semibold text-primary-700">LocalStock</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className={`px-3 py-2 text-sm ${isActive('/')}`}>Home</Link>
            <Link to="/businesses" className={`px-3 py-2 text-sm ${isActive('/businesses')}`}>Businesses</Link>
            {currentAccount && (
              <>
                <Link to="/investor-dashboard" className={`px-3 py-2 text-sm ${isActive('/investor-dashboard')}`}>Investor Dashboard</Link>
                <Link to="/business-dashboard" className={`px-3 py-2 text-sm ${isActive('/business-dashboard')}`}>Business Dashboard</Link>
                <Link to="/create-listing" className={`px-3 py-2 text-sm ${isActive('/create-listing')}`}>Create Listing</Link>
              </>
            )}
            
            {!isCorrectNetwork && currentAccount && (
              <button
                onClick={switchToCorrectNetwork}
                className="inline-flex items-center px-3 py-1.5 border border-warning-500 text-warning-700 rounded-md text-sm font-medium bg-warning-50 hover:bg-warning-100 transition-colors"
              >
                <AlertCircle size={16} className="mr-1" />
                Switch to Sepolia
              </button>
            )}
            
            {currentAccount ? (
              <div className="bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-800">
                {formatAddress(currentAccount)}
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                {isConnecting ? (
                  'Connecting...'
                ) : (
                  <>
                    <Wallet size={18} className="mr-2" />
                    Connect Wallet
                  </>
                )}
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'}`}>Home</Link>
            <Link to="/businesses" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/businesses') ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'}`}>Businesses</Link>
            {currentAccount && (
              <>
                <Link to="/investor-dashboard" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/investor-dashboard') ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'}`}>Investor Dashboard</Link>
                <Link to="/business-dashboard" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/business-dashboard') ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'}`}>Business Dashboard</Link>
                <Link to="/create-listing" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/create-listing') ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'}`}>Create Listing</Link>
              </>
            )}
            
            {!isCorrectNetwork && currentAccount && (
              <button
                onClick={switchToCorrectNetwork}
                className="block w-full text-left px-3 py-2 text-base font-medium text-warning-700 bg-warning-50 rounded-md hover:bg-warning-100 flex items-center"
              >
                <AlertCircle size={16} className="mr-2" />
                Switch to Sepolia
              </button>
            )}
            
            {!currentAccount && (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="block w-full mt-4 px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
