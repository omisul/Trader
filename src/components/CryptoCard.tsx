import React from 'react';
import { CryptoCurrency } from '../types';

interface CryptoCardProps {
  crypto: CryptoCurrency;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return `$${marketCap.toFixed(2)}`;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-crypto-gray/30 rounded-lg hover:bg-crypto-gray/50 transition-colors">
      <div className="flex items-center space-x-4">
        <img
          src={crypto.image}
          alt={crypto.name}
          className="h-10 w-10 rounded-full"
        />
        <div>
          <h4 className="font-semibold text-white">{crypto.name}</h4>
          <p className="text-sm text-gray-400">{crypto.symbol}</p>
        </div>
      </div>
      
      <div className="text-right">
        <p className="font-semibold text-white">{formatCurrency(crypto.current_price)}</p>
        <p className={`text-sm ${crypto.price_change_percentage_24h >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
          {formatPercentage(crypto.price_change_percentage_24h)}
        </p>
        <p className="text-xs text-gray-400">MCap: {formatMarketCap(crypto.market_cap)}</p>
      </div>
    </div>
  );
};

export default CryptoCard;
