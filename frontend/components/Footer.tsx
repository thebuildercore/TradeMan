import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-md bg-primary-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m2 9 20-5-5 20-4-13L2 9z"></path>
                </svg>
              </div>
              <span className="ml-3 text-xl font-semibold text-white">LocalStock</span>
            </div>
            <p className="mt-4 text-sm text-gray-300">
              Empowering local businesses through blockchain technology. Invest in your community, grow together.
            </p>
            <div className="flex mt-6 space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Platform</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/businesses" className="text-base text-gray-300 hover:text-white">
                  Browse Businesses
                </Link>
              </li>
              <li>
                <Link to="/investor-dashboard" className="text-base text-gray-300 hover:text-white">
                  Investor Dashboard
                </Link>
              </li>
              <li>
                <Link to="/business-dashboard" className="text-base text-gray-300 hover:text-white">
                  Business Dashboard
                </Link>
              </li>
              <li>
                <Link to="/create-listing" className="text-base text-gray-300 hover:text-white">
                  Create Listing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="https://sepolia.etherscan.io/" target="_blank" rel="noopener noreferrer" className="text-base text-gray-300 hover:text-white">
                  Sepolia Testnet
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} LocalStock. All rights reserved. This is a demo application running on Sepolia testnet.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
