import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  Plus,
  Building,
  Share2,
  Award,
  Zap,
} from "lucide-react";
import { useWallet } from "../context/WalletContext";
import toast from "react-hot-toast";

const BusinessDashboardPage: React.FC = () => {
  const { currentAccount, connectWallet } = useWallet();
  const [activeTab, setActiveTab] = useState<
    "overview" | "investors" | "dividends"
  >("overview");
  const [showDividendModal, setShowDividendModal] = useState(false);
  const [dividendAmount, setDividendAmount] = useState<string>("");
  const [, setDividendNote] = useState<string>("");

  const businessData = {
    name: "Green Earth Café",
    tokenized: 40,
    valuation: "$450,000",
    investors: 32,
    tokensIssued: 18000,
    tokenPrice: 10,
    tokensSold: 12500,
    revenue: { current: 280000, previous: 230000, percentChange: 21.7 },
    dividendsPaid: { total: 24000, lastQuarter: 6500 },
    ownerTokens: 5500,
    image: "https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg",
  };

  const mockInvestors = [
    {
      address: "0x1234...5678",
      tokens: 2500,
      ownership: "5.56%",
      since: "2025-01-15",
    },
    {
      address: "0x8765...4321",
      tokens: 1800,
      ownership: "4.00%",
      since: "2025-02-03",
    },
    {
      address: "0x9876...1234",
      tokens: 1500,
      ownership: "3.33%",
      since: "2025-02-10",
    },
    {
      address: "0x4567...8901",
      tokens: 1200,
      ownership: "2.67%",
      since: "2025-03-05",
    },
    {
      address: "0x2345...6789",
      tokens: 1000,
      ownership: "2.22%",
      since: "2025-03-20",
    },
  ];

  const mockDividendHistory = [
    {
      date: "2025-06-15",
      amount: 6500,
      quarter: "Q2 2025",
      investorCount: 32,
      status: "Distributed",
    },
    {
      date: "2025-03-15",
      amount: 6000,
      quarter: "Q1 2025",
      investorCount: 28,
      status: "Distributed",
    },
    {
      date: "2024-12-15",
      amount: 5500,
      quarter: "Q4 2024",
      investorCount: 25,
      status: "Distributed",
    },
  ];

  const handleDistributeDividends = () => {
    if (!dividendAmount || parseFloat(dividendAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    toast.success(
      `Successfully distributed $${dividendAmount} to ${businessData.investors} investors`,
    );
    setShowDividendModal(false);
    setDividendAmount("");
    setDividendNote("");
  };

  if (!currentAccount) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl z-0" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white relative z-10 text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 shadow-inner flex items-center justify-center mx-auto mb-6 rotate-3">
            <Building size={36} className="text-primary-600 drop-shadow-sm" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Business Portal
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Connect your Web3 wallet to manage your tokenized business,
            distribute dividends, and engage with your investors.
          </p>
          <button
            onClick={connectWallet}
            className="w-full py-4 px-4 bg-gray-900 hover:bg-primary-600 text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-primary-600/30 transform hover:-translate-y-1"
          >
            Connect Wallet Setup
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Premium Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 pt-16 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl mix-blend-screen" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-6"
            >
              <div className="h-24 w-24 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 shrink-0">
                <img
                  src={businessData.image}
                  alt={businessData.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <span className="bg-white/10 text-primary-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block backdrop-blur-md border border-white/10">
                  Verified Business
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                  {businessData.name}
                </h1>
                <p className="text-primary-200 text-lg flex items-center">
                  <Building size={18} className="mr-2 opacity-70" />
                  <span className="font-mono bg-black/20 px-2 py-0.5 rounded text-sm">
                    {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                  </span>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <button
                onClick={() => setShowDividendModal(true)}
                className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary-500/30 flex items-center"
              >
                <DollarSign size={16} className="mr-2" /> Pay Dividends
              </button>
              <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 rounded-lg font-bold text-sm transition-all flex items-center shadow-lg">
                <Share2 size={16} className="mr-2 opacity-70" /> Share
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Business Valuation",
              value: businessData.valuation,
              bg: "bg-blue-500",
              icon: <DollarSign size={24} className="text-white" />,
            },
            {
              label: "Community Investors",
              value: businessData.investors.toString(),
              bg: "bg-purple-500",
              icon: <Users size={24} className="text-white" />,
            },
            {
              label: "Tokens Issued",
              value: `${businessData.tokensSold} / ${businessData.tokensIssued}`,
              bg: "bg-primary-500",
              icon: <Award size={24} className="text-white" />,
            },
            {
              label: "Total Dividends",
              value: `$${businessData.dividendsPaid.total}`,
              bg: "bg-emerald-500",
              icon: <Zap size={24} className="text-white" />,
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-200/50 border border-white p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-lg ${stat.bg}`}
                >
                  {stat.icon}
                </div>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">
                  {stat.label}
                </h3>
                <span className="text-2xl font-extrabold text-gray-900">
                  {stat.value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation Glassmorphism */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-2 mb-8 inline-flex space-x-2 border border-white shadow-sm overflow-x-auto max-w-full">
          {[
            { id: "overview", label: "Overview", icon: <BarChart size={16} /> },
            { id: "investors", label: "Investors", icon: <Users size={16} /> },
            {
              id: "dividends",
              label: "Dividends",
              icon: <DollarSign size={16} />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-4 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gray-900 text-white shadow-md"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <span
                className={`mr-2 ${activeTab === tab.id ? "opacity-100" : "opacity-70"}`}
              >
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Panel */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center">
                        <TrendingUp
                          size={18}
                          className="mr-2 text-primary-500"
                        />{" "}
                        Revenue Growth
                      </h3>
                      <button className="text-xs font-bold text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                        View Detailed Report
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                            YTD Revenue
                          </p>
                          <p className="text-4xl font-extrabold text-gray-900">
                            ${businessData.revenue.current.toLocaleString()}
                          </p>
                          <div className="flex items-center mt-2 text-sm font-bold text-emerald-600 bg-emerald-50 inline-flex px-2 py-1 rounded-md">
                            <TrendingUp size={14} className="mr-1" />+
                            {businessData.revenue.percentChange}% vs last year
                          </div>
                        </div>
                      </div>

                      <div className="h-64 bg-gray-50/50 rounded-xl p-4 flex items-end justify-between border border-gray-100">
                        {/* Mock Chart */}
                        {[35, 45, 38, 55, 60, 58, 65, 70, 68, 75, 80, 85].map(
                          (height, i) => (
                            <div
                              key={i}
                              className="w-1/12 px-1 group cursor-pointer relative"
                            >
                              <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs font-bold py-1 px-2 rounded-md transition-opacity pointer-events-none whitespace-nowrap z-10">
                                +${Math.floor(height * 1.5)}k
                              </div>
                              <div
                                className={`rounded-t-md transition-all duration-300 w-full group-hover:bg-primary-500 ${i === 11 ? "bg-primary-600" : "bg-primary-200"}`}
                                style={{ height: `${height}%` }}
                              />
                              <p className="text-xs font-bold text-gray-400 text-center mt-2">
                                {
                                  [
                                    "J",
                                    "F",
                                    "M",
                                    "A",
                                    "M",
                                    "J",
                                    "J",
                                    "A",
                                    "S",
                                    "O",
                                    "N",
                                    "D",
                                  ][i]
                                }
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side Panel */}
                <div className="space-y-8">
                  <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center">
                        <Award size={18} className="mr-2 text-secondary-500" />{" "}
                        Ownership Equity
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="relative w-48 h-48 mx-auto mb-6 transform hover:scale-105 transition-transform duration-500">
                        <svg
                          viewBox="0 0 36 36"
                          className="w-full h-full drop-shadow-md"
                        >
                          <path
                            className="text-gray-100"
                            strokeWidth="3"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="text-primary-500"
                            strokeWidth="3"
                            strokeDasharray="60, 100"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-extrabold text-gray-900">
                            60%
                          </span>
                          <span className="text-xs font-bold text-gray-500 uppercase">
                            You Retained
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-primary-50 rounded-xl border border-primary-100">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-primary-500 rounded-full shadow-sm"></div>
                            <span className="text-sm font-bold text-primary-900 ml-3">
                              You (Owner)
                            </span>
                          </div>
                          <span className="text-sm font-extrabold text-primary-700">
                            60%
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-gray-300 rounded-full shadow-sm"></div>
                            <span className="text-sm font-bold text-gray-700 ml-3">
                              Retail Investors
                            </span>
                          </div>
                          <span className="text-sm font-extrabold text-gray-900">
                            40%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center">
                        <Zap size={18} className="mr-2 text-yellow-500" /> Token
                        Parameters
                      </h3>
                    </div>
                    <div className="p-6 divide-y divide-gray-100">
                      <div className="py-3 flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-500">
                          Max Supply
                        </span>
                        <span className="font-extrabold text-gray-900">
                          {businessData.tokensIssued.toLocaleString()}
                        </span>
                      </div>
                      <div className="py-3 flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-500">
                          Circulating
                        </span>
                        <span className="font-extrabold text-primary-600">
                          {businessData.tokensSold.toLocaleString()}
                        </span>
                      </div>
                      <div className="py-3 flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-500">
                          Spot Price
                        </span>
                        <span className="font-extrabold text-emerald-600">
                          ${businessData.tokenPrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="py-3 flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-500">
                          Smart Contract
                        </span>
                        <a
                          href="#"
                          className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-primary-600 hover:text-primary-800 transition-colors"
                        >
                          0xab...def
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "investors" && (
              <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center">
                    <Users size={18} className="mr-2 text-primary-500" />{" "}
                    Shareholder Ledger
                  </h3>
                  <div className="relative w-full sm:w-64">
                    <input
                      type="text"
                      placeholder="Search addresses..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm text-sm"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100 text-sm">
                    <thead className="bg-white">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider text-xs"
                        >
                          Wallet ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider text-xs"
                        >
                          Holdings
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider text-xs"
                        >
                          Equity %
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider text-xs"
                        >
                          Joined
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-right font-bold text-gray-500 uppercase tracking-wider text-xs"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-50">
                      {mockInvestors.map((investor, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded text-xs select-all">
                              {investor.address}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-extrabold text-gray-900">
                              {investor.tokens.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-primary-50 text-primary-700">
                              {investor.ownership}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-medium">
                            {new Date(investor.since).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <button className="text-primary-600 hover:text-primary-800 font-bold hover:underline">
                              Message
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "dividends" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center">
                        <DollarSign
                          size={18}
                          className="mr-2 text-emerald-500"
                        />{" "}
                        Payment History
                      </h3>
                      <button
                        onClick={() => setShowDividendModal(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-lg text-white bg-primary-600 hover:bg-primary-700 shadow-md"
                      >
                        <Plus size={16} className="mr-1" /> Distribute New
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-100 text-sm">
                        <thead className="bg-white">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider text-xs"
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider text-xs"
                            >
                              Period
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider text-xs"
                            >
                              Gross Output
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider text-xs"
                            >
                              Recipients
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider text-xs"
                            >
                              Network Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50">
                          {mockDividendHistory.map((dividend, index) => (
                            <tr
                              key={index}
                              className="hover:bg-gray-50/50 transition-colors group"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-medium">
                                {new Date(dividend.date).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="bg-gray-100 px-2 py-0.5 rounded font-bold text-gray-700">
                                  {dividend.quarter}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-extrabold text-emerald-600">
                                  ${dividend.amount.toLocaleString()}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-bold text-gray-700">
                                  {dividend.investorCount} Wallets
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2.5 py-1 inline-flex text-xs font-bold rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 mt-1"></span>
                                  {dividend.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center">
                        <Calendar size={18} className="mr-2 text-primary-500" />{" "}
                        Treasury Stats
                      </h3>
                    </div>
                    <div className="p-6 space-y-6">
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Lifetime Distributed
                        </h4>
                        <p className="text-3xl font-extrabold text-gray-900">
                          ${businessData.dividendsPaid.total.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Yield Per Token (Avg)
                        </h4>
                        <p className="text-3xl font-extrabold text-primary-600">
                          $0.52
                        </p>
                      </div>

                      <div className="pt-6 border-t border-gray-100">
                        <h4 className="text-sm font-bold text-gray-900 mb-4">
                          Payout Schedule
                        </h4>
                        <div className="space-y-4">
                          {["Q1", "Q2", "Q3", "Q4"].map((quarter, idx) => (
                            <div key={idx} className="flex items-center">
                              <div
                                className={`h-8 w-8 rounded-xl flex items-center justify-center shadow-sm ${idx < 2 ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-400"}`}
                              >
                                <Calendar size={14} />
                              </div>
                              <span className="ml-3 text-sm font-bold text-gray-700">
                                {quarter} {new Date().getFullYear()}
                              </span>
                              {idx < 2 && (
                                <span className="ml-auto text-xs px-2 py-1 rounded border border-emerald-200 bg-emerald-50 text-emerald-700 font-bold shadow-sm">
                                  Settled
                                </span>
                              )}
                              {idx === 2 && (
                                <span className="ml-auto text-xs px-2 py-1 rounded border border-yellow-200 bg-yellow-50 text-yellow-700 font-bold shadow-sm">
                                  Upcoming
                                </span>
                              )}
                              {idx > 2 && (
                                <span className="ml-auto text-xs px-2 py-1 rounded border border-gray-200 bg-gray-50 text-gray-600 font-bold">
                                  Planned
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modern Modal */}
      <AnimatePresence>
        {showDividendModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              onClick={() => setShowDividendModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative z-10"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                <DollarSign size={32} />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                Automate Yield Payout
              </h3>
              <p className="text-gray-500 font-medium mb-8">
                Distribute stablecoins securely to all {businessData.investors}{" "}
                token holders via smart contract.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Total Yield (USDC)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 font-bold">$</span>
                    </div>
                    <input
                      type="number"
                      value={dividendAmount}
                      onChange={(e) => setDividendAmount(e.target.value)}
                      className="block w-full rounded-xl border-gray-200 pl-8 pr-4 py-3 bg-gray-50 focus:bg-white border-2 focus:ring-0 focus:border-primary-500 font-bold text-gray-900 transition-colors"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {dividendAmount && parseFloat(dividendAmount) > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-emerald-50 rounded-xl p-4 border border-emerald-100"
                  >
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-emerald-700 font-medium">
                        Estimated Per Token:
                      </span>
                      <span className="font-extrabold text-emerald-800">
                        $
                        {(
                          parseFloat(dividendAmount) / businessData.tokensSold
                        ).toFixed(4)}{" "}
                        USDC
                      </span>
                    </div>
                  </motion.div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowDividendModal(false)}
                    className="px-5 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDistributeDividends}
                    className="px-5 py-3 bg-gray-900 hover:bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-gray-900/20 transform hover:-translate-y-0.5 transition-all"
                  >
                    Sign Transaction
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BusinessDashboardPage;
