import React from 'react';
import { TrendingUp, Wallet, BarChart3 } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  activeTab: 'dashboard' | 'trading' | 'portfolio';
  onTabChange: (tab: 'dashboard' | 'trading' | 'portfolio') => void;
}

const Header: React.FC<HeaderProps> = ({ user, activeTab, onTabChange }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <header className="bg-crypto-gray/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-crypto-green" />
            <h1 className="text-2xl font-bold text-white">CryptoTrader Pro</h1>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-1">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-crypto-green text-black'
                  : 'text-gray-300 hover:text-white hover:bg-crypto-gray/50'
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => onTabChange('trading')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'trading'
                  ? 'bg-crypto-green text-black'
                  : 'text-gray-300 hover:text-white hover:bg-crypto-gray/50'
              }`}
            >
              <TrendingUp className="h-5 w-5" />
              <span>Trading</span>
            </button>
            <button
              onClick={() => onTabChange('portfolio')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'portfolio'
                  ? 'bg-crypto-green text-black'
                  : 'text-gray-300 hover:text-white hover:bg-crypto-gray/50'
              }`}
            >
              <Wallet className="h-5 w-5" />
              <span>Portfolio</span>
            </button>
          </nav>

          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Balance</p>
              <p className="text-lg font-semibold text-white">
                {formatCurrency(user.balance)}
              </p>
            </div>
            <div className="h-8 w-8 bg-crypto-green rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">
                {user.name.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
