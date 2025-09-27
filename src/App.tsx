import React, { useState, useEffect } from 'react';
import { CryptoCurrency, User } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TradingPanel from './components/TradingPanel';
import Portfolio from './components/Portfolio';
import { fetchCryptoData } from './services/api';

function App() {
  const [cryptoData, setCryptoData] = useState<CryptoCurrency[]>([]);
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    balance: 10000,
    portfolio: [],
    trades: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'trading' | 'portfolio'>('dashboard');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCryptoData();
        setCryptoData(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch crypto data:', error);
        setLoading(false);
      }
    };

    loadData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-crypto-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-crypto-green mx-auto"></div>
          <p className="mt-4 text-xl">Loading crypto data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Header user={user} activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard cryptoData={cryptoData} user={user} />
        )}
        {activeTab === 'trading' && (
          <TradingPanel cryptoData={cryptoData} user={user} setUser={setUser} />
        )}
        {activeTab === 'portfolio' && (
          <Portfolio user={user} setUser={setUser} />
        )}
      </main>
    </div>
  );
}

export default App;
