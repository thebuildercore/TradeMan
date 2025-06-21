import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, BarChart2, ShieldCheck, DollarSign } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Invest In Your Local Community
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
              The world's first blockchain-based stock market for local businesses. Buy shares, earn dividends, and help your community thrive.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/businesses" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-100 md:text-lg">
                Browse Businesses
                <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
              </Link>
              <Link to="/create-listing" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-primary-800 md:text-lg">
                List Your Business
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Wave shape divider */}
        <div className="relative h-16 bg-gradient-to-br from-primary-700 to-primary-900">
          <svg className="absolute bottom-0 w-full h-16" preserveAspectRatio="none" viewBox="0 0 1440 54">
            <path fill="#f9fafb" d="M0 22L120 16.7C240 11 480 1 720 1.7C960 2 1200 14 1320 19.3L1440 24V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"></path>
          </svg>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A transparent, blockchain-powered platform connecting local businesses with community investors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Business Creates Listing',
                description: 'Local business defines how much ownership to tokenize (maximum 70%) and sets terms.',
                icon: <Building2 size={32} className="text-primary-600" />,
              },
              {
                step: '02',
                title: 'Tokens Are Generated',
                description: 'Smart contract deploys and mints ERC-20 tokens representing business shares.',
                icon: <BarChart2 size={32} className="text-primary-600" />,
              },
              {
                step: '03',
                title: 'Investors Purchase Tokens',
                description: 'Community members buy ownership tokens through the platform.',
                icon: <DollarSign size={32} className="text-primary-600" />,
              },
              {
                step: '04',
                title: 'Automatic Dividends',
                description: 'Smart contracts distribute profits to token holders based on ownership percentage.',
                icon: <ShieldCheck size={32} className="text-primary-600" />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <span className="text-xs font-semibold uppercase text-primary-600 tracking-wide">{item.step}</span>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Businesses</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Discover thriving local businesses seeking community investment to grow and expand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Green Earth Café",
                type: "Food & Beverage",
                image: "https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg",
                description: "Sustainable, organic café seeking expansion to new locations.",
                percentAvailable: 40,
                valuation: "$450,000",
                dividendYield: "8.5%"
              },
              {
                name: "Bright Smile Dental",
                type: "Healthcare",
                image: "https://images.pexels.com/photos/3881445/pexels-photo-3881445.jpeg",
                description: "Modern dental practice looking to invest in advanced equipment.",
                percentAvailable: 25,
                valuation: "$750,000",
                dividendYield: "7.2%"
              },
              {
                name: "Harbor Bookstore",
                type: "Retail",
                image: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg",
                description: "Independent bookstore expanding its community events program.",
                percentAvailable: 35,
                valuation: "$320,000",
                dividendYield: "6.8%"
              }
            ].map((business, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
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
                  <p className="text-gray-600 mb-4">{business.description}</p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-gray-50 p-2 rounded-md">
                      <p className="text-xs text-gray-500">Available</p>
                      <p className="font-semibold text-gray-900">{business.percentAvailable}%</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-md">
                      <p className="text-xs text-gray-500">Valuation</p>
                      <p className="font-semibold text-gray-900">{business.valuation}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-md">
                      <p className="text-xs text-gray-500">Yield</p>
                      <p className="font-semibold text-green-600">{business.dividendYield}</p>
                    </div>
                  </div>
                  <Link
                    to={`/businesses/${index + 1}`}
                    className="block w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-md font-medium transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/businesses" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
              View All Businesses
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Benefits for Everyone
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Our platform creates a sustainable economy where everyone wins - businesses get funding without losing control, while investors gain access to real-world assets and passive income.
              </p>
              
              <div className="mt-8 space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <Building2 size={24} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">For Businesses</h3>
                    <p className="mt-1 text-gray-600">
                      Access flexible funding without loans or giving up control. Build community support and loyal customers.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary-500 text-white">
                      <DollarSign size={24} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">For Investors</h3>
                    <p className="mt-1 text-gray-600">
                      Invest in real businesses you know and trust. Earn passive income through dividends and support your community.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent-500 text-white">
                      <ShieldCheck size={24} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">For Communities</h3>
                    <p className="mt-1 text-gray-600">
                      Strengthen local economies, create jobs, and build more resilient neighborhoods through local investment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-10 lg:mt-0">
              <img 
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg" 
                alt="Community investment" 
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-primary-300">Join the local investment revolution today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 space-x-4">
            <Link to="/businesses" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-50">
              Explore Businesses
            </Link>
            <Link to="/create-listing" className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-primary-800">
              List Your Business
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
