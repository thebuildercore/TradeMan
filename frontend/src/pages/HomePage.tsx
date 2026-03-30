import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  ShieldCheck,
  DollarSign,
  TrendingUp,
  Zap,
} from "lucide-react";
import { mockBusinesses } from "../utils/mockData";

const HomePage: React.FC = () => {
  const featuredBusinesses = mockBusinesses.slice(0, 3);

  return (
    <div className="bg-gray-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 text-white z-0" />
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary-500/20 blur-3xl z-0" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-secondary-500/20 blur-3xl z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-secondary-400 mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-white tracking-wide uppercase">
                The Future of Local Investment
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-400">
              Own a Piece of Your <br className="hidden md:block" /> Community
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed font-light">
              The world's first blockchain-powered stock market for local
              businesses. Buy shares, earn dividends, and directly fuel the
              growth of your neighborhood.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link
                to="/businesses"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-primary-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-1"
              >
                Explore Opportunities
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/create-listing"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 hover:shadow-lg hover:-translate-y-1"
              >
                List Your Business
                <Building2 className="ml-2 w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10">
              {[
                { label: "Total Volume", value: "$2.4M+" },
                { label: "Asset Tokenized", value: "45+" },
                { label: "Active Investors", value: "12k+" },
                { label: "Avg. Yield", value: "8.2%" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent z-10"></div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-3">
              Seamless Process
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Democratizing Local Finance
            </h3>
            <p className="text-lg text-gray-600">
              Our blockchain infrastructure removes the middlemen, allowing
              direct, transparent, and fractional ownership of real-world
              businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary-100 via-primary-300 to-primary-100 z-0"></div>

            {[
              {
                step: "01",
                title: "Tokenization",
                description:
                  "Businesses convert equity into secure ERC-20 tokens via our automated smart contracts.",
                icon: <Zap size={28} className="text-primary-600" />,
              },
              {
                step: "02",
                title: "Discovery",
                description:
                  "Investors browse curated local businesses backed by verifiable real-world assets.",
                icon: <SearchIcon size={28} className="text-primary-600" />,
              },
              {
                step: "03",
                title: "Investment",
                description:
                  "Purchase fractional shares using USDC with immediate, gas-optimized settlement.",
                icon: <DollarSign size={28} className="text-primary-600" />,
              },
              {
                step: "04",
                title: "Earn & Grow",
                description:
                  "Receive automated dividend payouts directly to your wallet as the business succeeds.",
                icon: <TrendingUp size={28} className="text-primary-600" />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative z-10 flex flex-col items-center bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-6 rotate-3 shadow-inner">
                  {item.icon}
                </div>
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-gray-900 text-white font-bold text-lg rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-white relative border-y border-gray-100">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50/50 rounded-l-[100px] z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Trending Opportunities
              </h2>
              <p className="text-lg text-gray-600">
                Discover top-performing local businesses currently accepting
                community investment rounds.
              </p>
            </div>
            <Link
              to="/businesses"
              className="hidden md:flex items-center text-primary-600 font-semibold hover:text-primary-700 hover:underline mt-4 md:mt-0"
            >
              View All Marketplace <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBusinesses.map((business, index) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                  <img
                    src={business.image}
                    alt={business.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wider text-gray-900 rounded-full shadow-sm">
                      {business.type}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 z-20">
                    <div className="flex items-center px-3 py-1.5 bg-gray-900/80 backdrop-blur-md rounded-full border border-white/20">
                      <div className="w-2 h-2 rounded-full bg-secondary-400 mr-2 animate-pulse"></div>
                      <span className="text-xs font-semibold text-white">
                        Funding Active
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {business.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                    {business.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6 mt-auto">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
                        Valuation
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {business.valuation}
                      </p>
                    </div>
                    <div className="bg-secondary-50 p-3 rounded-xl border border-secondary-100">
                      <p className="text-xs text-secondary-600 uppercase tracking-wider font-semibold mb-1">
                        Target Yield
                      </p>
                      <p className="text-lg font-bold text-secondary-700 flex items-center">
                        {business.dividendYield}{" "}
                        <TrendingUp className="ml-1 w-4 h-4" />
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">
                        Funding Progress
                      </span>
                      <span className="font-bold text-primary-600">
                        {business.fundingProgress}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${business.fundingProgress}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                      />
                    </div>
                  </div>

                  <Link
                    to={`/businesses/${business.id}`}
                    className="block w-full py-3 px-4 bg-gray-900 hover:bg-primary-600 text-white text-center rounded-xl font-bold transition-colors duration-300 shadow-md"
                  >
                    Invest Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              to="/businesses"
              className="inline-flex items-center text-primary-600 font-bold hover:underline"
            >
              View All Marketplace <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gray-900"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f3299?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <ShieldCheck className="w-16 h-16 text-secondary-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Build Wealth Locally?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto font-light">
            Join thousands of investors already earning passive income while
            directly supporting the small businesses that make their communities
            unique.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/businesses"
              className="w-full sm:w-auto px-8 py-4 bg-secondary-500 hover:bg-secondary-400 text-gray-900 font-bold rounded-xl text-lg transition-transform hover:-translate-y-1 shadow-lg shadow-secondary-500/25"
            >
              Start Investing
            </Link>
            <span className="text-gray-400 font-medium">or</span>
            <Link
              to="/create-listing"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold rounded-xl text-lg transition-all backdrop-blur-md hover:-translate-y-1"
            >
              Tokenize Your Business
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// SearchIcon component since it wasn't imported from lucide
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

export default HomePage;
