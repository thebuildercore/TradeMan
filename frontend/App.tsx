import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BusinessListingsPage from './pages/BusinessListingsPage';
import BusinessDetailPage from './pages/BusinessDetailPage';
import InvestorDashboardPage from './pages/InvestorDashboardPage';
import BusinessDashboardPage from './pages/BusinessDashboardPage';
import CreateListingPage from './pages/CreateListingPage';
import { useWallet } from './context/WalletContext';

function App() {
  const { checkIfWalletIsConnected } = useWallet();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/businesses" element={<BusinessListingsPage />} />
          <Route path="/businesses/:id" element={<BusinessDetailPage />} />
          <Route path="/investor-dashboard" element={<InvestorDashboardPage />} />
          <Route path="/business-dashboard" element={<BusinessDashboardPage />} />
          <Route path="/create-listing" element={<CreateListingPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
