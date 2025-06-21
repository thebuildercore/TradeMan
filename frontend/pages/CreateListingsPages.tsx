import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronRight, DollarSign, Image as ImageIcon, Info, HelpCircle, Building, Calendar, ArrowLeft, PieChart } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import toast from 'react-hot-toast';

type FormData = {
  // Step 1: Business Information
  name: string;
  category: string;
  type: string;
  location: string;
  description: string;
  imageUrl: string;
  founded: string;
  employees: string;
  
  // Step 2: Financial Information
  revenue: string;
  profitMargin: string;
  valuation: string;
  fundingGoal: string;
  
  // Step 3: Tokenization Settings
  percentToTokenize: number;
  tokenPrice: string;
  totalTokens: number;
  minimumInvestment: string;
  
  // Step 4: Dividend Policy
  dividendYield: string;
  dividendFrequency: 'monthly' | 'quarterly' | 'biannually' | 'annually';
  profitSharingPercentage: number;
  nextDividendDate: string;
};

const CreateListingPage: React.FC = () => {
  const { currentAccount, connectWallet, isCorrectNetwork, switchToCorrectNetwork } = useWallet();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  
  const [formData, setFormData] = useState<FormData>({
    // Step 1: Business Information
    name: '',
    category: 'food',
    type: '',
    location: '',
    description: '',
    imageUrl: '',
    founded: '',
    employees: '',
    
    // Step 2: Financial Information
    revenue: '',
    profitMargin: '',
    valuation: '',
    fundingGoal: '',
    
    // Step 3: Tokenization Settings
    percentToTokenize: 40, // Default to 40%
    tokenPrice: '',
    totalTokens: 0,
    minimumInvestment: '',
    
    // Step 4: Dividend Policy
    dividendYield: '',
    dividendFrequency: 'quarterly',
    profitSharingPercentage: 45, // Default to 45%
    nextDividendDate: '',
  });
  
  // Categories
  const categories = [
    { id: 'food', name: 'Food & Beverage' },
    { id: 'retail', name: 'Retail' },
    { id: 'health', name: 'Healthcare' },
    { id: 'tech', name: 'Technology' },
    { id: 'service', name: 'Services' },
    { id: 'manufacturing', name: 'Manufacturing' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'other', name: 'Other' }
  ];
  
  // Calculate total tokens when valuation or percentToTokenize changes
  React.useEffect(() => {
    if (formData.valuation && formData.tokenPrice && parseFloat(formData.tokenPrice) > 0) {
      const valuationAmount = parseFloat(formData.valuation.replace(/[^0-9.]/g, ''));
      const tokenizedValue = valuationAmount * (formData.percentToTokenize / 100);
      const totalTokens = Math.floor(tokenizedValue / parseFloat(formData.tokenPrice));
      setFormData(prev => ({ ...prev, totalTokens }));
    }
  }, [formData.valuation, formData.percentToTokenize, formData.tokenPrice]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
  };
  
  const handleCurrencyInput = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    setFormData(prev => ({ 
      ...prev, 
      [field]: numericValue ? `${numericValue}` : '' 
    }));
  };
  
  const formatCurrency = (value: string) => {
    if (!value) return '';
    return `$${value}`;
  };
  
  const handleSubmit = () => {
    if (!isCorrectNetwork) {
      toast.error('Please switch to the Sepolia testnet');
      switchToCorrectNetwork();
      return;
    }
    
    // In a real app, this would create a smart contract transaction
    toast.success('Your business has been successfully listed!');
    // Redirect to business dashboard after successful listing
    // history.push('/business-dashboard');
  };
  
  const handleNext = () => {
    let canProceed = true;
    
    // Validation logic for each step
    if (currentStep === 1) {
      if (!formData.name || !formData.type || !formData.location || !formData.description) {
        toast.error('Please fill in all required fields');
        canProceed = false;
      }
    } else if (currentStep === 2) {
      if (!formData.revenue || !formData.profitMargin || !formData.valuation || !formData.fundingGoal) {
        toast.error('Please fill in all financial information');
        canProceed = false;
      }
    } else if (currentStep === 3) {
      if (!formData.tokenPrice || !formData.minimumInvestment) {
        toast.error('Please set token price and minimum investment');
        canProceed = false;
      }
      
      if (formData.percentToTokenize > 70) {
        toast.error('You cannot tokenize more than 70% of your business');
        canProceed = false;
      }
    } else if (currentStep === 4) {
      if (!formData.dividendYield || !formData.nextDividendDate) {
        toast.error('Please complete dividend policy information');
        canProceed = false;
      }
    }
    
    if (canProceed) {
      if (currentStep === 4) {
        setShowPreview(true);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };
  
  const handleBack = () => {
    if (showPreview) {
      setShowPreview(false);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
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
            <Building size={28} className="text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6">
            Please connect your wallet to create a listing for your business on the Sepolia testnet.
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

  // Display warning if not on correct network
  if (!isCorrectNetwork) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center"
        >
          <div className="w-16 h-16 rounded-full bg-warning-100 flex items-center justify-center mx-auto mb-4">
            <Info size={28} className="text-warning-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Wrong Network</h2>
          <p className="text-gray-600 mb-6">
            Please switch to the Sepolia testnet to create a listing for your business.
          </p>
          <button
            onClick={switchToCorrectNetwork}
            className="w-full py-3 px-4 bg-warning-600 hover:bg-warning-700 text-white rounded-md font-medium transition-colors"
          >
            Switch to Sepolia
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Create Business Listing</h1>
          <p className="mt-2 text-lg text-gray-600">
            Tokenize your business and raise funding from your community
          </p>
        </div>
        
        {!showPreview ? (
          <>
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex flex-col items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step < currentStep 
                          ? 'bg-primary-600 text-white' 
                          : step === currentStep 
                            ? 'bg-primary-100 border-2 border-primary-600 text-primary-600' 
                            : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {step < currentStep ? (
                        <Check size={18} />
                      ) : (
                        <span>{step}</span>
                      )}
                    </div>
                    <div className="text-xs mt-2 text-gray-500">
                      {step === 1 && 'Business Info'}
                      {step === 2 && 'Financials'}
                      {step === 3 && 'Tokenization'}
                      {step === 4 && 'Dividends'}
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-between">
                  {[1, 2, 3, 4].map((step, index) => (
                    <div 
                      key={step} 
                      className={`w-1/4 ${
                        index < currentStep - 1 ? 'bg-primary-600' : 'bg-gray-200'
                      } h-1`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 1: Business Information */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: currentStep === 1 ? 1 : 0, x: currentStep === 1 ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              className={`bg-white rounded-lg shadow-md p-6 mb-6 ${currentStep !== 1 ? 'hidden' : ''}`}
            >
              <h2 className="text-xl font-semibold mb-6">Business Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., Green Earth Café"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category*
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Type*
                  </label>
                  <input
                    type="text"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., Café, Restaurant, Retail Shop"
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location*
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., Austin, TX"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Describe your business, its mission, and why people should invest..."
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Image URL*
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="https://example.com/your-business-image.jpg"
                  />
                  <div className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 rounded-r-md">
                    <ImageIcon size={20} />
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Provide a URL to your business image. Recommended size: 1200×800px.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="founded" className="block text-sm font-medium text-gray-700 mb-1">
                    Year Founded
                  </label>
                  <input
                    type="text"
                    id="founded"
                    name="founded"
                    value={formData.founded}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., 2020"
                  />
                </div>
                
                <div>
                  <label htmlFor="employees" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Employees
                  </label>
                  <input
                    type="text"
                    id="employees"
                    name="employees"
                    value={formData.employees}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., 12"
                  />
                </div>
              </div>
            </motion.div>

            {/* Step 2: Financial Information */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: currentStep === 2 ? 1 : 0, x: currentStep === 2 ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              className={`bg-white rounded-lg shadow-md p-6 mb-6 ${currentStep !== 2 ? 'hidden' : ''}`}
            >
              <h2 className="text-xl font-semibold mb-6">Financial Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="revenue" className="block text-sm font-medium text-gray-700 mb-1">
                    Annual Revenue*
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      id="revenue"
                      name="revenue"
                      value={formData.revenue}
                      onChange={(e) => handleCurrencyInput(e, 'revenue')}
                      className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="profitMargin" className="block text-sm font-medium text-gray-700 mb-1">
                    Profit Margin*
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="text"
                      id="profitMargin"
                      name="profitMargin"
                      value={formData.profitMargin}
                      onChange={handleChange}
                      className="block w-full pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g., 25%"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm">%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="valuation" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Valuation*
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      id="valuation"
                      name="valuation"
                      value={formData.valuation}
                      onChange={(e) => handleCurrencyInput(e, 'valuation')}
                      className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="0.00"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500 flex items-center">
                    <Info size={14} className="mr-1" /> Approximate value of your business
                  </p>
                </div>
                
                <div>
                  <label htmlFor="fundingGoal" className="block text-sm font-medium text-gray-700 mb-1">
                    Funding Goal*
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      id="fundingGoal"
                      name="fundingGoal"
                      value={formData.fundingGoal}
                      onChange={(e) => handleCurrencyInput(e, 'fundingGoal')}
                      className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="0.00"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500 flex items-center">
                    <Info size={14} className="mr-1" /> Amount you want to raise through token sales
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Info className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Important</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        Your financial information will be publicly visible to potential investors. Ensure all information is accurate and can be verified. Consider consulting with a financial advisor before proceeding.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-900">Financial Documentation</h3>
                <p className="text-sm text-gray-500 mt-1">
                  We recommend having the following documents ready for investors to review:
                </p>
                <ul className="mt-2 text-sm text-gray-500 list-disc pl-5 space-y-1">
                  <li>Financial statements for the past 2-3 years</li>
                  <li>Business plan and growth projections</li>
                  <li>Tax returns or proof of revenue</li>
                  <li>Ownership documentation</li>
                </ul>
                <p className="text-sm text-gray-500 mt-3">
                  You'll be able to add these documents after creating your listing.
                </p>
              </div>
            </motion.div>

            {/* Step 3: Tokenization Settings */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: currentStep === 3 ? 1 : 0, x: currentStep === 3 ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              className={`bg-white rounded-lg shadow-md p-6 mb-6 ${currentStep !== 3 ? 'hidden' : ''}`}
            >
              <h2 className="text-xl font-semibold mb-6">Tokenization Settings</h2>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="percentToTokenize" className="block text-sm font-medium text-gray-700">
                    Percentage to Tokenize: <span className="font-bold text-primary-700">{formData.percentToTokenize}%</span>
                  </label>
                  <div className="flex items-center text-sm text-gray-500">
                    <HelpCircle size={14} className="mr-1" />
                    <span>Max 70%</span>
                  </div>
                </div>
                <input
                  type="range"
                  id="percentToTokenize"
                  name="percentToTokenize"
                  min="1"
                  max="70"
                  value={formData.percentToTokenize}
                  onChange={handleRangeChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1%</span>
                  <span>35%</span>
                  <span>70%</span>
                </div>
              </div>
              
              <div className="bg-primary-50 border border-primary-200 rounded-md p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Info className="h-5 w-5 text-primary-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-primary-800">Ownership Protection</h3>
                    <div className="mt-2 text-sm text-primary-700">
                      <p>
                        You'll maintain at least {100 - formData.percentToTokenize}% ownership of your business. This ensures you retain decision-making control while still raising community funding.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="tokenPrice" className="block text-sm font-medium text-gray-700 mb-1">
                    Token Price (USDC)*
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      id="tokenPrice"
                      name="tokenPrice"
                      value={formData.tokenPrice}
                      onChange={(e) => handleCurrencyInput(e, 'tokenPrice')}
                      className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="0.00"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Recommended: $1-$50 per token
                  </p>
                </div>
                
                <div>
                  <label htmlFor="totalTokens" className="block text-sm font-medium text-gray-700 mb-1">
                    Total Tokens (Generated Automatically)
                  </label>
                  <input
                    type="text"
                    id="totalTokens"
                    name="totalTokens"
                    value={formData.totalTokens}
                    disabled
                    className="block w-full py-2 px-3 border border-gray-300 bg-gray-50 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Based on valuation and tokenization percentage
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="minimumInvestment" className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Investment Amount (USDC)*
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    id="minimumInvestment"
                    name="minimumInvestment"
                    value={formData.minimumInvestment}
                    onChange={(e) => handleCurrencyInput(e, 'minimumInvestment')}
                    className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="0.00"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Recommended: $50-$500 to allow for diverse community participation
                </p>
              </div>
              
              <div className="rounded-md bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                  <PieChart size={16} className="mr-1 text-primary-600" />
                  Ownership Breakdown
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="text-sm text-gray-500">You will retain</p>
                    <p className="text-xl font-bold text-primary-700">{100 - formData.percentToTokenize}%</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="text-sm text-gray-500">Community investors</p>
                    <p className="text-xl font-bold text-accent-600">{formData.percentToTokenize}%</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 4: Dividend Policy */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: currentStep === 4 ? 1 : 0, x: currentStep === 4 ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              className={`bg-white rounded-lg shadow-md p-6 mb-6 ${currentStep !== 4 ? 'hidden' : ''}`}
            >
              <h2 className="text-xl font-semibold mb-6">Dividend Policy</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="dividendYield" className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Annual Dividend Yield*
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="text"
                      id="dividendYield"
                      name="dividendYield"
                      value={formData.dividendYield}
                      onChange={handleChange}
                      className="block w-full pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g., 7.5%"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm">%</span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Projected annual return for investors
                  </p>
                </div>
                
                <div>
                  <label htmlFor="dividendFrequency" className="block text-sm font-medium text-gray-700 mb-1">
                    Dividend Frequency*
                  </label>
                  <select
                    id="dividendFrequency"
                    name="dividendFrequency"
                    value={formData.dividendFrequency}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="biannually">Biannually</option>
                    <option value="annually">Annually</option>
                  </select>
                  <p className="mt-1 text-sm text-gray-500">
                    How often dividends will be distributed
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="profitSharingPercentage" className="block text-sm font-medium text-gray-700">
                    Profit Sharing Percentage: <span className="font-bold text-primary-700">{formData.profitSharingPercentage}%</span>
                  </label>
                </div>
                <input
                  type="range"
                  id="profitSharingPercentage"
                  name="profitSharingPercentage"
                  min="10"
                  max="90"
                  value={formData.profitSharingPercentage}
                  onChange={handleRangeChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10%</span>
                  <span>50%</span>
                  <span>90%</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Percentage of profits that will be distributed to token holders. The remaining profits will be reinvested into the business.
                </p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="nextDividendDate" className="block text-sm font-medium text-gray-700 mb-1">
                  First Dividend Distribution Date*
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="nextDividendDate"
                    name="nextDividendDate"
                    value={formData.nextDividendDate}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <DollarSign className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Automated Dividend Distributions</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        Dividends will be automatically distributed to token holders via our smart contracts based on the policy you define. You'll need to deposit the dividend amount before each distribution date.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-900">Dividend Simulation</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Based on your inputs, here's how dividends would be distributed for a $100,000 profit:
                </p>
                <div className="mt-3 grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="text-xs text-gray-500">To token holders</p>
                    <p className="text-lg font-semibold text-green-600">
                      ${(100000 * (formData.profitSharingPercentage / 100) * (formData.percentToTokenize / 100)).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">({formData.profitSharingPercentage}% of profits × {formData.percentToTokenize}% tokens)</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="text-xs text-gray-500">You retain</p>
                    <p className="text-lg font-semibold text-primary-600">
                      ${(100000 - (100000 * (formData.profitSharingPercentage / 100) * (formData.percentToTokenize / 100))).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">(Remaining profits + your tokens' share)</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          // Preview before submission
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
          >
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt={formData.name}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-block px-2 py-1 bg-white/90 backdrop-blur-sm text-primary-700 rounded-full text-xs font-medium mb-2">
                  Preview
                </div>
                <h2 className="text-white text-2xl font-bold">{formData.name || "Your Business Name"}</h2>
                <p className="text-white/90">{formData.location || "Location"}</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Business Information</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category</span>
                      <span className="font-medium">{categories.find(c => c.id === formData.category)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type</span>
                      <span className="font-medium">{formData.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Founded</span>
                      <span className="font-medium">{formData.founded || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Employees</span>
                      <span className="font-medium">{formData.employees || "Not specified"}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-4 mt-6">Tokenization</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available Ownership</span>
                      <span className="font-medium text-primary-700">{formData.percentToTokenize}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Token Price</span>
                      <span className="font-medium">${formData.tokenPrice} USDC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Tokens</span>
                      <span className="font-medium">{formData.totalTokens}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Minimum Investment</span>
                      <span className="font-medium">${formData.minimumInvestment} USDC</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Financial Information</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valuation</span>
                      <span className="font-medium">${formData.valuation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Revenue</span>
                      <span className="font-medium">${formData.revenue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Profit Margin</span>
                      <span className="font-medium">{formData.profitMargin}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Funding Goal</span>
                      <span className="font-medium">${formData.fundingGoal}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-4 mt-6">Dividend Policy</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expected Yield</span>
                      <span className="font-medium text-green-600">{formData.dividendYield}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frequency</span>
                      <span className="font-medium capitalize">{formData.dividendFrequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Profit Sharing</span>
                      <span className="font-medium">{formData.profitSharingPercentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">First Distribution</span>
                      <span className="font-medium">
                        {formData.nextDividendDate ? new Date(formData.nextDividendDate).toLocaleDateString() : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-3">Business Description</h3>
                <p className="text-gray-600 mb-6">{formData.description}</p>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Info className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Important</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        Creating a listing will deploy a smart contract on the Sepolia testnet and mint ERC-20 tokens representing ownership in your business. This requires a transaction fee paid in testnet ETH.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div className="flex justify-between">
          {currentStep > 1 || showPreview ? (
            <button
              onClick={handleBack}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <div className="flex items-center">
                <ArrowLeft size={16} className="mr-2" />
                Back
              </div>
            </button>
          ) : (
            <div></div> // Empty div to maintain flex spacing
          )}
          
          {!showPreview ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <div className="flex items-center">
                {currentStep < 4 ? 'Next' : 'Preview Listing'}
                <ChevronRight size={16} className="ml-2" />
              </div>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <div className="flex items-center">
                Create Listing
                <ChevronRight size={16} className="ml-2" />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateListingPage;
