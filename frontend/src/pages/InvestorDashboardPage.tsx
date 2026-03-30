import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  PieChart,
  TrendingUp,
  Calendar,
  DollarSign,
  ArrowDown,
  ArrowUp,
  RefreshCw,
  Layers,
  Wallet,
  Building2,
  ChevronRight,
  Download,
} from "lucide-react";
import { useWallet } from "../context/WalletContext";

const InvestorDashboardPage: React.FC = () => {
  const { currentAccount, connectWallet } = useWallet();
  const [activeTab, setActiveTab] = useState<
    "portfolio" | "dividends" | "transactions"
  >("portfolio");

  const mockPortfolio = [
    {
      id: 1,
      name: "Green Earth Café",
      image:
        "https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg",
      tokenAmount: 250,
      tokenValue: 2500,
      percentChange: 5.2,
      percentOwned: 0.8,
      tokenPrice: 10,
    },
    {
      id: 2,
      name: "Harbor Bookstore",
      image:
        "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg",
      tokenAmount: 100,
      tokenValue: 1200,
      percentChange: -1.5,
      percentOwned: 0.3,
      tokenPrice: 12,
    },
    {
      id: 3,
      name: "Bright Smile Dental",
      image:
        "https://images.pexels.com/photos/3881445/pexels-photo-3881445.jpeg",
      tokenAmount: 50,
      tokenValue: 750,
      percentChange: 2.1,
      percentOwned: 0.15,
      tokenPrice: 15,
    },
  ];

  const mockDividends = [
    {
      id: 1,
      businessName: "Green Earth Café",
      amount: 62.5,
      date: "2025-06-15",
      status: "Paid",
      txHash: "0x42ab...7def",
      quarter: "Q2 2025",
    },
    {
      id: 2,
      businessName: "Harbor Bookstore",
      amount: 36,
      date: "2025-06-10",
      status: "Paid",
      txHash: "0x89cd...3efa",
      quarter: "Q2 2025",
    },
    {
      id: 3,
      businessName: "Green Earth Café",
      amount: 62.5,
      date: "2025-03-15",
      status: "Paid",
      txHash: "0x91ab...5cde",
      quarter: "Q1 2025",
    },
    {
      id: 4,
      businessName: "Harbor Bookstore",
      amount: 36,
      date: "2025-03-10",
      status: "Paid",
      txHash: "0x72fe...9abc",
      quarter: "Q1 2025",
    },
  ];

  const mockTransactions = [
    {
      id: 1,
      type: "Buy",
      businessName: "Green Earth Café",
      amount: 150,
      tokens: 15,
      date: "2025-06-01",
      txHash: "0x32fe...9bcd",
    },
    {
      id: 2,
      type: "Sell",
      businessName: "Bright Smile Dental",
      amount: 300,
      tokens: 20,
      date: "2025-05-20",
      txHash: "0x72ac...3def",
    },
    {
      id: 3,
      type: "Buy",
      businessName: "Harbor Bookstore",
      amount: 600,
      tokens: 50,
      date: "2025-05-15",
      txHash: "0x91fe...7abc",
    },
    {
      id: 4,
      type: "Dividend",
      businessName: "Green Earth Café",
      amount: 62.5,
      tokens: 0,
      date: "2025-03-15",
      txHash: "0x91ab...5cde",
    },
  ];

  const totalPortfolioValue = mockPortfolio.reduce(
    (sum, investment) => sum + investment.tokenValue,
    0,
  );

  if (!currentAccount) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl z-0" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white relative z-10 text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 shadow-inner flex items-center justify-center mx-auto mb-6 rotate-3">
            <Wallet size={36} className="text-primary-600 drop-shadow-sm" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Access Dashboard
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Connect your Web3 wallet to manage your fractional ownership
            portfolio, view dividends, and track real-world asset performance.
          </p>
          <button
            onClick={connectWallet}
            className="w-full py-4 px-4 bg-gray-900 hover:bg-primary-600 text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-primary-600/30 transform hover:-translate-y-1"
          >
            Connect Wallet to Continue
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Premium Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 pt-16 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl mix-blend-screen" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                Investor Portfolio
              </h1>
              <p className="text-primary-200 text-lg flex items-center">
                <Wallet size={18} className="mr-2 opacity-70" />
                <span className="font-mono bg-black/20 px-2 py-0.5 rounded text-sm">
                  {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                </span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <Link
                to="/businesses"
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 rounded-lg font-bold text-sm transition-all flex items-center shadow-lg"
              >
                <Building2 size={16} className="mr-2 opacity-70" /> Market
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              label: "Total Asset Value",
              value: `$${totalPortfolioValue.toFixed(2)}`,
              change: "+3.2%",
              positive: true,
              icon: <Layers size={24} className="text-primary-500" />,
            },
            {
              label: "Active Investments",
              value: mockPortfolio.length.toString(),
              subtitle: "Local businesses",
              icon: <Building2 size={24} className="text-secondary-500" />,
            },
            {
              label: "YTD Dividends",
              value: "$197.50",
              change: "+12.5%",
              positive: true,
              icon: <DollarSign size={24} className="text-emerald-500" />,
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
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shadow-sm">
                  {stat.icon}
                </div>
                {stat.change && (
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center ${stat.positive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}
                  >
                    {stat.positive ? (
                      <ArrowUp size={12} className="mr-1" />
                    ) : (
                      <ArrowDown size={12} className="mr-1" />
                    )}
                    {stat.change}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">
                  {stat.label}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-gray-900">
                    {stat.value}
                  </span>
                  {stat.subtitle && (
                    <span className="text-sm font-medium text-gray-400">
                      {stat.subtitle}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation Glassmorphism */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-2 mb-8 inline-flex space-x-2 border border-white shadow-sm">
          {[
            {
              id: "portfolio",
              label: "My Portfolio",
              icon: <PieChart size={16} />,
            },
            {
              id: "dividends",
              label: "Dividend Yields",
              icon: <DollarSign size={16} />,
            },
            {
              id: "transactions",
              label: "Tx History",
              icon: <RefreshCw size={16} />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-4 py-2.5 rounded-lg font-bold text-sm transition-all ${
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
            className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
          >
            {activeTab === "portfolio" && (
              <div>
                <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center">
                    <Layers size={18} className="mr-2 text-primary-500" />{" "}
                    Active Holdings
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {mockPortfolio.map((investment) => (
                    <div
                      key={investment.id}
                      className="p-6 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center">
                          <div className="h-16 w-16 rounded-xl overflow-hidden shadow-sm shrink-0 relative group-hover:shadow-md transition-shadow">
                            <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors z-10" />
                            <img
                              src={investment.image}
                              alt={investment.name}
                              className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="ml-5">
                            <Link
                              to={`/businesses/${investment.id}`}
                              className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors flex items-center"
                            >
                              {investment.name}
                              <ChevronRight
                                size={16}
                                className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                              />
                            </Link>
                            <div className="flex items-center mt-1 space-x-3 text-sm">
                              <span className="font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                {investment.tokenAmount} Tokens
                              </span>
                              <span className="text-primary-600 font-bold">
                                {investment.percentOwned}% Equity
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between md:justify-end md:w-1/2 gap-8 border-t border-gray-100 pt-4 md:border-none md:pt-0">
                          <div className="text-left md:text-right">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                              Position Value
                            </p>
                            <p className="text-2xl font-extrabold text-gray-900">
                              ${investment.tokenValue.toLocaleString()}
                            </p>
                            <p
                              className={`text-sm font-bold flex items-center md:justify-end ${investment.percentChange >= 0 ? "text-emerald-600" : "text-red-600"}`}
                            >
                              {investment.percentChange >= 0 ? (
                                <TrendingUp size={14} className="mr-1" />
                              ) : (
                                <TrendingUp
                                  size={14}
                                  className="mr-1 rotate-180"
                                />
                              )}
                              {Math.abs(investment.percentChange)}% Unrealized
                            </p>
                          </div>

                          <div className="flex flex-col gap-2 shrink-0">
                            <Link
                              to={`/businesses/${investment.id}`}
                              className="px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-primary-600 transition-colors text-center shadow"
                            >
                              Trade
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 px-6 py-5 border-t border-gray-100 text-center md:text-left">
                  <Link
                    to="/businesses"
                    className="inline-flex items-center text-primary-600 hover:text-primary-800 font-bold text-sm"
                  >
                    <SearchIcon size={16} className="mr-2" /> Discover New
                    Offerings
                  </Link>
                </div>
              </div>
            )}

            {activeTab === "dividends" && (
              <div>
                <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center">
                    <DollarSign size={18} className="mr-2 text-emerald-500" />{" "}
                    Yield History
                  </h3>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                    Automatically Paid via USDC
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100 text-sm">
                    <thead className="bg-white">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider text-xs"
                        >
                          Asset
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
                          Payout
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider text-xs"
                        >
                          Settled On
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider text-xs"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-50">
                      {mockDividends.map((dividend) => (
                        <tr
                          key={dividend.id}
                          className="hover:bg-gray-50/50 transition-colors group"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                              {dividend.businessName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-600 font-medium bg-gray-100 inline-block px-2 py-0.5 rounded">
                              {dividend.quarter}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-extrabold text-emerald-600">
                              +${dividend.amount.toFixed(2)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-500 flex items-center">
                              <Calendar
                                size={14}
                                className="mr-1.5 opacity-50"
                              />
                              {new Date(dividend.date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2.5 py-1 inline-flex text-xs font-bold rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 mt-1 animate-pulse"></span>
                              {dividend.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "transactions" && (
              <div>
                <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center">
                    <RefreshCw size={18} className="mr-2 text-primary-500" />{" "}
                    On-Chain Activity
                  </h3>
                  <button className="text-xs font-bold text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center shadow-sm">
                    <Download size={14} className="mr-1" /> Export CSV
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
                          Action
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider text-xs"
                        >
                          Asset
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider text-xs"
                        >
                          Value
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider text-xs"
                        >
                          Qty
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider text-xs"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-right font-bold text-gray-500 uppercase tracking-wider text-xs"
                        >
                          TxHash
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-50">
                      {mockTransactions.map((tx) => (
                        <tr
                          key={tx.id}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2.5 py-1 inline-flex text-xs font-bold uppercase tracking-wider rounded-md border ${
                                tx.type === "Buy"
                                  ? "bg-primary-50 border-primary-100 text-primary-700"
                                  : tx.type === "Sell"
                                    ? "bg-orange-50 border-orange-100 text-orange-700"
                                    : "bg-emerald-50 border-emerald-100 text-emerald-700"
                              }`}
                            >
                              {tx.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-bold text-gray-900">
                              {tx.businessName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div
                              className={`font-extrabold ${
                                tx.type === "Buy"
                                  ? "text-gray-900"
                                  : "text-emerald-600"
                              }`}
                            >
                              {tx.type === "Buy" ? "-" : "+"} ${tx.amount}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded text-xs select-all">
                              {tx.tokens > 0
                                ? tx.type === "Buy"
                                  ? `+${tx.tokens} TKN`
                                  : `-${tx.tokens} TKN`
                                : "--"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {new Date(tx.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-gray-500 font-mono text-xs">
                            <a
                              href={`https://sepolia.etherscan.io/tx/${tx.txHash}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary-600 hover:text-primary-800 hover:underline"
                            >
                              {tx.txHash}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// SearchIcon component
function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export default InvestorDashboardPage;
