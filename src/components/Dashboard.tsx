import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { CryptoCurrency, User } from '../types';
import CryptoCard from './CryptoCard';
import PriceChart from './PriceChart';

interface DashboardProps {
  cryptoData: CryptoCurrency[];
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ cryptoData, user }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const totalPortfolioValue = user.portfolio.reduce((sum, asset) => sum + asset.totalValue, 0);
  const totalProfitLoss = user.portfolio.reduce((sum, asset) => sum + asset.profitLoss, 0);
  const totalProfitLossPercentage = totalPortfolioValue > 0 ? (totalProfitLoss / (totalPortfolioValue - totalProfitLoss)) * 100 : 0;

  const topGainers = cryptoData
    .filter(coin => coin.price_change_percentage_24h > 0)
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 5);

  const topLosers = cryptoData
    .filter(coin => coin.price_change_percentage_24h < 0)
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Balance</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(user.balance)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-crypto-green" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Portfolio Value</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(totalPortfolioValue)}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-crypto-blue" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">24h P&L</p>
              <p className={`text-2xl font-bold ${totalProfitLoss >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                {formatCurrency(totalProfitLoss)}
              </p>
              <p className={`text-sm ${totalProfitLossPercentage >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                {formatPercentage(totalProfitLossPercentage)}
              </p>
            </div>
            {totalProfitLoss >= 0 ? (
              <TrendingUp className="h-8 w-8 text-crypto-green" />
            ) : (
              <TrendingDown className="h-8 w-8 text-crypto-red" />
            )}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Assets</p>
              <p className="text-2xl font-bold text-white">{user.portfolio.length}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-crypto-green" />
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Gainers */}
        <div className="card">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 text-crypto-green mr-2" />
            Top Gainers (24h)
          </h3>
          <div className="space-y-4">
            {topGainers.map((coin) => (
              <CryptoCard key={coin.id} crypto={coin} />
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className="card">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <TrendingDown className="h-6 w-6 text-crypto-red mr-2" />
            Top Losers (24h)
          </h3>
          <div className="space-y-4">
            {topLosers.map((coin) => (
              <CryptoCard key={coin.id} crypto={coin} />
            ))}
          </div>
        </div>
      </div>

      {/* Price Chart */}
      {cryptoData.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-bold text-white mb-6">Market Overview</h3>
          <PriceChart data={cryptoData.slice(0, 10)} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
