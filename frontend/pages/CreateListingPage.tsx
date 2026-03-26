import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, DollarSign, Image as ImageIcon, Info, HelpCircle, Building, Calendar, ArrowLeft, PieChart, UploadCloud, Link as LinkIcon } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import toast from 'react-hot-toast';

type FormData = {
  name: string;
  category: string;
  type: string;
  location: string;
  description: string;
  imageUrl: string;
  founded: string;
  employees: string;
  revenue: string;
  profitMargin: string;
  valuation: string;
  fundingGoal: string;
  percentToTokenize: number;
  tokenPrice: string;
  totalTokens: number;
  minimumInvestment: string;
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
    name: '', category: 'food', type: '', location: '', description: '', imageUrl: '', founded: '', employees: '',
    revenue: '', profitMargin: '', valuation: '', fundingGoal: '',
    percentToTokenize: 40, tokenPrice: '', totalTokens: 0, minimumInvestment: '',
    dividendYield: '', dividendFrequency: 'quarterly', profitSharingPercentage: 45, nextDividendDate: '',
  });
  
  const categories = [
    { id: 'food', name: 'Food & Beverage' }, { id: 'retail', name: 'Retail' }, { id: 'health', name: 'Healthcare' },
    { id: 'tech', name: 'Technology' }, { id: 'service', name: 'Services' }, { id: 'manufacturing', name: 'Manufacturing' },
    { id: 'entertainment', name: 'Entertainment' }, { id: 'other', name: 'Other' }
  ];
  
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
    const numericValue = value.replace(/[^0-9.]/g, '');
    setFormData(prev => ({ ...prev, [field]: numericValue ? `${numericValue}` : '' }));
  };
  
  const handleSubmit = () => {
    if (!isCorrectNetwork) {
      toast.error('Please switch to the Sepolia testnet');
      switchToCorrectNetwork();
      return;
    }
    toast.success('Your business has been successfully listed!');
  };
  
  const handleNext = () => {
    let canProceed = true;
    if (currentStep === 1) {
      if (!formData.name || !formData.type || !formData.location || !formData.description) {
        toast.error('Please fill in all required fields'); canProceed = false;
      }
    } else if (currentStep === 2) {
      if (!formData.revenue || !formData.profitMargin || !formData.valuation || !formData.fundingGoal) {
        toast.error('Please fill in all financial information'); canProceed = false;
      }
    } else if (currentStep === 3) {
      if (!formData.tokenPrice || !formData.minimumInvestment) {
        toast.error('Please set token price and minimum investment'); canProceed = false;
      }
      if (formData.percentToTokenize > 70) {
        toast.error('You cannot tokenize more than 70% of your business'); canProceed = false;
      }
    } else if (currentStep === 4) {
      if (!formData.dividendYield || !formData.nextDividendDate) {
        toast.error('Please complete dividend policy information'); canProceed = false;
      }
    }
    
    if (canProceed) {
      if (currentStep === 4) setShowPreview(true);
      else setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (showPreview) setShowPreview(false);
    else if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const currentYear = new Date().getFullYear();

  if (!currentAccount) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl z-0" />
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-md w-full bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white relative z-10 text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 flex items-center justify-center mx-auto mb-6 rotate-3 shadow-inner">
            <Building size={36} className="text-primary-600 drop-shadow-sm" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Connect Setup</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">Please connect your Web3 wallet to securely list and tokenize your business on the Sepolia network.</p>
          <button onClick={connectWallet} className="w-full py-4 px-4 bg-gray-900 hover:bg-primary-600 text-white rounded-xl font-bold transition-all duration-300 shadow-lg transform hover:-translate-y-1">Connect Wallet</button>
        </motion.div>
      </div>
    );
  }

  if (!isCorrectNetwork) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-3xl z-0" />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white relative z-10 text-center">
          <div className="w-20 h-20 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-6 rotate-3">
            <Info size={36} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Wrong Network</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">Please switch your wallet to the Sepolia testnet to safely construct your tokenized listing.</p>
          <button onClick={switchToCorrectNetwork} className="w-full py-4 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-red-600/30">Switch to Sepolia</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 pt-16 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl mix-blend-screen" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="bg-white/10 text-primary-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block backdrop-blur-md border border-white/10">Creator Studio</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Construct Offering</h1>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto font-medium">Digitalize your equity, specify dividend parameters, and open doors to community ownership.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        
        {!showPreview ? (
          <>
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white p-6 md:p-8 mb-8">
              {/* Stepper */}
              <div className="mb-10 relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 rounded-full z-0 overflow-hidden">
                  <div className="h-full bg-primary-500 transition-all duration-500 ease-in-out" style={{ width: `${((currentStep - 1) / 3) * 100}%` }}></div>
                </div>
                <div className="flex justify-between relative z-10">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex flex-col items-center">
                      <motion.div 
                        initial={false} animate={{ scale: currentStep === step ? 1.1 : 1 }}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm shadow-md transition-colors duration-300 ${
                          step < currentStep ? 'bg-primary-500 text-white' : step === currentStep ? 'bg-gray-900 text-white border-2 border-primary-500' : 'bg-white text-gray-400 border border-gray-200'
                        }`}
                      >
                        {step < currentStep ? <Check size={20} /> : step}
                      </motion.div>
                      <span className={`text-xs font-bold mt-3 uppercase tracking-wider ${step <= currentStep ? 'text-gray-900' : 'text-gray-400'}`}>
                        {['Entity', 'Financials', 'Tokenomics', 'Yield'][step - 1]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content Wrapper */}
              <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Legal/Brand Name <span className="text-red-500">*</span></label>
                          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-medium transition-all" placeholder="e.g. Acme Corp" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Sector <span className="text-red-500">*</span></label>
                          <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-medium appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22m7%2010%205%205%205-5H7z%22%20fill%3D%22%236B7280%22%2F%3E%3C%2Fsvg%3E')] bg-[length:24px_24px] bg-no-repeat bg-[right_12px_center]">
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Business Type <span className="text-red-500">*</span></label>
                          <input type="text" name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-medium" placeholder="Café, SaaS, Retail" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">HQ Region <span className="text-red-500">*</span></label>
                          <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-medium" placeholder="City, State / Country" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Pitch / Description <span className="text-red-500">*</span></label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-medium" placeholder="Explain the vision, operations, and catalyst for this raise..."></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Cover Asset URL <span className="text-red-500">*</span></label>
                        <div className="flex">
                          <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="flex-grow px-4 py-3 bg-gray-50 border border-gray-200 rounded-l-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-medium" placeholder="https://.../image.jpg" />
                          <div className="flex items-center justify-center px-4 bg-gray-100 border-y border-r border-gray-200 rounded-r-xl text-gray-400">
                            <LinkIcon size={20} />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Founding Year</label>
                          <input type="number" name="founded" value={formData.founded} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-medium" placeholder={currentYear.toString()} />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Headcount</label>
                          <input type="number" name="employees" value={formData.employees} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-medium" placeholder="e.g. 15" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">TTM Revenue (USDC) <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input type="text" name="revenue" value={formData.revenue} onChange={(e) => handleCurrencyInput(e, 'revenue')} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-extrabold text-gray-900" placeholder="0" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">EBITDA Margin <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <input type="number" name="profitMargin" value={formData.profitMargin} onChange={handleChange} className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-extrabold text-gray-900" placeholder="0" />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Target Enterprise Value <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input type="text" name="valuation" value={formData.valuation} onChange={(e) => handleCurrencyInput(e, 'valuation')} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-extrabold text-gray-900" placeholder="0" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Raise Target <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input type="text" name="fundingGoal" value={formData.fundingGoal} onChange={(e) => handleCurrencyInput(e, 'fundingGoal')} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-extrabold text-gray-900" placeholder="0" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5 flex gap-4 mt-8">
                        <Info className="flex-shrink-0 text-primary-500 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-bold text-primary-900 mb-1">Due Diligence Audit</h4>
                          <p className="text-sm font-medium text-primary-700">Financials are encoded on-chain during issuance. Fraudulent representations may result in administrative delisting and slashing.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8">
                        <div className="flex justify-between items-center mb-6">
                          <label className="text-sm font-bold text-gray-900">Equity Pool to Tokenize</label>
                          <span className="text-2xl font-extrabold text-primary-600 px-3 py-1 bg-white rounded-lg shadow-sm">{formData.percentToTokenize}%</span>
                        </div>
                        <input type="range" name="percentToTokenize" min="1" max="70" value={formData.percentToTokenize} onChange={handleRangeChange} className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary-600" />
                        <div className="flex justify-between text-xs font-bold text-gray-400 mt-2">
                          <span>1%</span>
                          <span>Soft Cap (70%)</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6 border-t border-gray-200">
                          <div className="flex-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Retained Equity</p>
                            <p className="text-2xl font-extrabold text-gray-900">{100 - formData.percentToTokenize}%</p>
                          </div>
                          <div className="flex-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Public Float</p>
                            <p className="text-2xl font-extrabold text-primary-600">{formData.percentToTokenize}%</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Token Issue Price (USDC) <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input type="text" name="tokenPrice" value={formData.tokenPrice} onChange={(e) => handleCurrencyInput(e, 'tokenPrice')} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-extrabold text-gray-900" placeholder="10.00" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Total Supply (Auto) <span className="text-gray-400">Fixed</span></label>
                          <input type="text" value={formData.totalTokens.toLocaleString()} disabled className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl font-extrabold text-gray-500 cursor-not-allowed" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold text-gray-700 mb-2">Minimum Entry (USDC) <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input type="text" name="minimumInvestment" value={formData.minimumInvestment} onChange={(e) => handleCurrencyInput(e, 'minimumInvestment')} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-extrabold text-gray-900" placeholder="100.00" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Target Yield (APY) <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <input type="number" name="dividendYield" value={formData.dividendYield} onChange={handleChange} className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-extrabold text-gray-900" placeholder="0.0" />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Distribution Interval <span className="text-red-500">*</span></label>
                          <select name="dividendFrequency" value={formData.dividendFrequency} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-bold appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22m7%2010%205%205%205-5H7z%22%20fill%3D%22%236B7280%22%2F%3E%3C%2Fsvg%3E')] bg-[length:24px_24px] bg-no-repeat bg-[right_12px_center]">
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="biannually">Biannually</option>
                            <option value="annually">Annually</option>
                          </select>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                          <label className="text-sm font-bold text-gray-900">Profit Allocation to Pool</label>
                          <span className="text-2xl font-extrabold text-emerald-600 px-3 py-1 bg-white rounded-lg shadow-sm">{formData.profitSharingPercentage}%</span>
                        </div>
                        <input type="range" name="profitSharingPercentage" min="10" max="90" value={formData.profitSharingPercentage} onChange={handleRangeChange} className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-emerald-500" />
                        <div className="flex justify-between text-xs font-bold text-gray-400 mt-2"><span>10%</span><span>90%</span></div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Genesis Distribution Date <span className="text-red-500">*</span></label>
                        <input type="date" name="nextDividendDate" value={formData.nextDividendDate} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-bold text-gray-600" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Bar */}
              <div className="flex justify-between items-center pt-8 mt-4 border-t border-gray-100">
                <button 
                  onClick={handleBack} 
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-xl font-bold flex items-center transition-colors ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'}`}
                >
                  <ArrowLeft size={18} className="mr-2" /> Back
                </button>
                <button 
                  onClick={handleNext} 
                  className="px-8 py-3 bg-gray-900 hover:bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-gray-900/20 transform hover:-translate-y-0.5 transition-all flex items-center"
                >
                  {currentStep === 4 ? 'Review Offering' : 'Continue'} <ChevronRight size={18} className="ml-2" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 border border-gray-100">
            <div className="h-64 sm:h-80 relative overflow-hidden group">
              {formData.imageUrl ? (
                <img src={formData.imageUrl} alt={formData.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-gray-200 to-gray-300 flex items-center justify-center"><ImageIcon size={48} className="text-gray-400" /></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
              <div className="absolute top-6 left-6 inline-flex px-3 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-lg text-xs font-bold border border-white/20">
                DRAFT PREVIEW
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="text-white text-4xl font-extrabold tracking-tight mb-2">{formData.name || "Untitled Asset"}</h2>
                <div className="flex items-center text-gray-300 text-sm font-medium">
                  <span className="bg-primary-500/20 text-primary-300 px-2.5 py-1 rounded border border-primary-500/30 uppercase tracking-widest text-[10px] mr-3">{categories.find(c => c.id === formData.category)?.name || 'Sector'}</span>
                  <span>{formData.location || "Location TBD"}</span>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 mb-8 text-gray-700 leading-relaxed font-medium">
                {formData.description || "No description provided."}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3 flex items-center"><PieChart size={20} className="mr-2 text-primary-500" /> Offering Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl"><span className="text-sm font-bold text-gray-500">Float</span><span className="font-extrabold text-gray-900">{formData.percentToTokenize}%</span></div>
                    <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl"><span className="text-sm font-bold text-gray-500">Price/Token</span><span className="font-extrabold text-gray-900">${formData.tokenPrice} USDC</span></div>
                    <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl"><span className="text-sm font-bold text-gray-500">Supply</span><span className="font-extrabold text-gray-900">{formData.totalTokens.toLocaleString()} TKN</span></div>
                    <div className="flex justify-between items-center border border-gray-100 px-4 py-3 rounded-xl"><span className="text-sm font-bold text-gray-500">Target Raise</span><span className="font-extrabold text-primary-600">${parseFloat(formData.fundingGoal || '0').toLocaleString()}</span></div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3 flex items-center"><DollarSign size={20} className="mr-2 text-emerald-500" /> Yield Protocol</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl"><span className="text-sm font-bold text-gray-500">Est. APY</span><span className="font-extrabold text-emerald-600">{formData.dividendYield}%</span></div>
                    <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl"><span className="text-sm font-bold text-gray-500">Schedule</span><span className="font-bold text-gray-900 capitalize">{formData.dividendFrequency}</span></div>
                    <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl"><span className="text-sm font-bold text-gray-500">Profit Share</span><span className="font-extrabold text-gray-900">{formData.profitSharingPercentage}%</span></div>
                    <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl"><span className="text-sm font-bold text-gray-500">Genesis Payout</span><span className="font-bold text-gray-900">{formData.nextDividendDate || '--'}</span></div>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-primary-50 border border-primary-100 rounded-2xl flex items-start gap-4">
                <UploadCloud size={24} className="text-primary-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-extrabold text-primary-900 mb-1">Blockchain Deployment Ready</h4>
                  <p className="font-medium text-primary-700 text-sm">Submitting will deploy a fresh ERC-20 token contract onto the Sepolia testnet representing {formData.percentToTokenize}% of {formData.name || 'your entity'}. Standard gas fees will apply.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border-t border-gray-100 p-6 flex justify-between items-center">
              <button onClick={() => setShowPreview(false)} className="px-6 py-3 rounded-xl font-bold flex items-center text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm">
                <ArrowLeft size={18} className="mr-2" /> Modify
              </button>
              <button onClick={handleSubmit} className="px-8 py-3 bg-gray-900 hover:bg-primary-600 text-white rounded-xl font-bold shadow-xl shadow-gray-900/20 transform hover:-translate-y-0.5 transition-all flex items-center">
                Sign & Deploy <ChevronRight size={18} className="ml-2" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CreateListingPage;
