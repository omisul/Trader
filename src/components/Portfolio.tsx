import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Wallet, History } from 'lucide-react';
import { User, Trade } from '../types';

interface PortfolioProps {
  user: User;
  setUser: (user: User) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState<'holdings' | 'trades'>('holdings');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const totalPortfolioValue = user.portfolio.reduce((sum, asset) => sum + asset.totalValue, 0);
  const totalProfitLoss = user.portfolio.reduce((sum, asset) => sum + asset.profitLoss, 0);
  const totalProfitLossPercentage = totalPortfolioValue > 0 ? (totalProfitLoss / (totalPortfolioValue - totalProfitLoss)) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Value</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(totalPortfolioValue)}</p>
            </div>
            <Wallet className="h-8 w-8 text-crypto-blue" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total P&L</p>
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
              <p className="text-sm text-gray-400">Assets</p>
              <p className="text-2xl font-bold text-white">{user.portfolio.length}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-crypto-green" />
          </div>
        </div>
      </div>

      {/* Portfolio Tabs */}
      <div className="card">
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setActiveTab('holdings')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'holdings'
                ? 'bg-crypto-green text-black'
                : 'text-gray-300 hover:text-white hover:bg-crypto-gray/50'
            }`}
          >
            <Wallet className="h-5 w-5" />
            <span>Holdings</span>
          </button>
          <button
            onClick={() => setActiveTab('trades')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'trades'
                ? 'bg-crypto-green text-black'
                : 'text-gray-300 hover:text-white hover:bg-crypto-gray/50'
            }`}
          >
            <History className="h-5 w-5" />
            <span>Trade History</span>
          </button>
        </div>

        {activeTab === 'holdings' ? (
          <div className="space-y-4">
            {user.portfolio.length > 0 ? (
              user.portfolio.map((asset) => (
                <div key={asset.id} className="p-6 bg-crypto-gray/30 rounded-lg hover:bg-crypto-gray/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{asset.name}</h4>
                        <p className="text-sm text-gray-400">{asset.symbol}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-semibold text-white">{formatCurrency(asset.totalValue)}</p>
                      <p className="text-sm text-gray-400">
                        {asset.amount.toFixed(6)} {asset.symbol}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Average Price</p>
                      <p className="font-semibold text-white">{formatCurrency(asset.averagePrice)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Current Price</p>
                      <p className="font-semibold text-white">{formatCurrency(asset.currentPrice)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">P&L</p>
                      <p className={`font-semibold ${asset.profitLoss >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                        {formatCurrency(asset.profitLoss)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">P&L %</p>
                      <p className={`font-semibold ${asset.profitLossPercentage >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                        {formatPercentage(asset.profitLossPercentage)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Wallet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No holdings yet. Start trading to build your portfolio!</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {user.trades.length > 0 ? (
              user.trades
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                .map((trade) => (
                  <div key={trade.id} className="p-4 bg-crypto-gray/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${trade.type === 'buy' ? 'bg-crypto-green/20' : 'bg-crypto-red/20'}`}>
                          {trade.type === 'buy' ? (
                            <TrendingUp className="h-5 w-5 text-crypto-green" />
                          ) : (
                            <TrendingDown className="h-5 w-5 text-crypto-red" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">
                            {trade.type === 'buy' ? 'Bought' : 'Sold'} {trade.amount} {trade.symbol}
                          </h4>
                          <p className="text-sm text-gray-400">{formatDate(trade.timestamp)}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-white">{formatCurrency(trade.total)}</p>
                        <p className="text-sm text-gray-400">@{formatCurrency(trade.price)}</p>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-12">
                <History className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No trades yet. Start trading to see your history!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
