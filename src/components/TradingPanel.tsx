import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Search } from 'lucide-react';
import { CryptoCurrency, User, Trade } from '../types';
import CryptoCard from './CryptoCard';

interface TradingPanelProps {
  cryptoData: CryptoCurrency[];
  user: User;
  setUser: (user: User) => void;
}

const TradingPanel: React.FC<TradingPanelProps> = ({ cryptoData, user, setUser }) => {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCryptoData = cryptoData.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTrade = () => {
    if (!selectedCrypto || !amount) return;

    const tradeAmount = parseFloat(amount);
    const tradeValue = tradeAmount * selectedCrypto.current_price;

    if (tradeType === 'buy' && tradeValue > user.balance) {
      alert('Insufficient balance');
      return;
    }

    const newTrade: Trade = {
      id: Date.now().toString(),
      symbol: selectedCrypto.symbol,
      type: tradeType,
      amount: tradeAmount,
      price: selectedCrypto.current_price,
      total: tradeValue,
      timestamp: new Date()
    };

    const updatedUser = { ...user };
    
    if (tradeType === 'buy') {
      updatedUser.balance -= tradeValue;
      
      // Update or add to portfolio
      const existingAsset = updatedUser.portfolio.find(p => p.symbol === selectedCrypto.symbol);
      if (existingAsset) {
        const newTotalAmount = existingAsset.amount + tradeAmount;
        const newAveragePrice = ((existingAsset.averagePrice * existingAsset.amount) + (selectedCrypto.current_price * tradeAmount)) / newTotalAmount;
        existingAsset.amount = newTotalAmount;
        existingAsset.averagePrice = newAveragePrice;
        existingAsset.currentPrice = selectedCrypto.current_price;
        existingAsset.totalValue = newTotalAmount * selectedCrypto.current_price;
        existingAsset.profitLoss = existingAsset.totalValue - (existingAsset.averagePrice * existingAsset.amount);
        existingAsset.profitLossPercentage = (existingAsset.profitLoss / (existingAsset.averagePrice * existingAsset.amount)) * 100;
      } else {
        updatedUser.portfolio.push({
          id: selectedCrypto.id,
          symbol: selectedCrypto.symbol,
          name: selectedCrypto.name,
          amount: tradeAmount,
          averagePrice: selectedCrypto.current_price,
          currentPrice: selectedCrypto.current_price,
          totalValue: tradeValue,
          profitLoss: 0,
          profitLossPercentage: 0
        });
      }
    } else {
      // Sell logic
      const existingAsset = updatedUser.portfolio.find(p => p.symbol === selectedCrypto.symbol);
      if (!existingAsset || existingAsset.amount < tradeAmount) {
        alert('Insufficient crypto holdings');
        return;
      }
      
      updatedUser.balance += tradeValue;
      existingAsset.amount -= tradeAmount;
      existingAsset.totalValue = existingAsset.amount * selectedCrypto.current_price;
      existingAsset.profitLoss = existingAsset.totalValue - (existingAsset.averagePrice * existingAsset.amount);
      existingAsset.profitLossPercentage = existingAsset.amount > 0 ? (existingAsset.profitLoss / (existingAsset.averagePrice * existingAsset.amount)) * 100 : 0;
      
      // Remove from portfolio if amount is 0
      if (existingAsset.amount === 0) {
        updatedUser.portfolio = updatedUser.portfolio.filter(p => p.symbol !== selectedCrypto.symbol);
      }
    }

    updatedUser.trades.push(newTrade);
    setUser(updatedUser);
    setAmount('');
    alert(`${tradeType === 'buy' ? 'Bought' : 'Sold'} ${tradeAmount} ${selectedCrypto.symbol} for ${formatCurrency(tradeValue)}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Crypto Selection */}
      <div className="lg:col-span-2">
        <div className="card">
          <h3 className="text-xl font-bold text-white mb-6">Select Cryptocurrency</h3>
          
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-crypto-gray border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-crypto-green"
            />
          </div>

          {/* Crypto List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredCryptoData.map((crypto) => (
              <div
                key={crypto.id}
                onClick={() => setSelectedCrypto(crypto)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedCrypto?.id === crypto.id
                    ? 'bg-crypto-green/20 border-2 border-crypto-green'
                    : 'bg-crypto-gray/30 hover:bg-crypto-gray/50'
                }`}
              >
                <CryptoCard crypto={crypto} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trading Panel */}
      <div className="card">
        <h3 className="text-xl font-bold text-white mb-6">Place Trade</h3>
        
        {selectedCrypto ? (
          <div className="space-y-6">
            {/* Selected Crypto Info */}
            <div className="p-4 bg-crypto-gray/30 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <img src={selectedCrypto.image} alt={selectedCrypto.name} className="h-8 w-8 rounded-full" />
                <div>
                  <h4 className="font-semibold text-white">{selectedCrypto.name}</h4>
                  <p className="text-sm text-gray-400">{selectedCrypto.symbol}</p>
                </div>
              </div>
              <p className="text-lg font-bold text-white">
                {formatCurrency(selectedCrypto.current_price)}
              </p>
              <p className={`text-sm ${selectedCrypto.price_change_percentage_24h >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                {selectedCrypto.price_change_percentage_24h >= 0 ? '+' : ''}{selectedCrypto.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>

            {/* Trade Type */}
            <div className="flex space-x-2">
              <button
                onClick={() => setTradeType('buy')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                  tradeType === 'buy'
                    ? 'bg-crypto-green text-black'
                    : 'bg-crypto-gray text-white hover:bg-crypto-gray/80'
                }`}
              >
                <TrendingUp className="h-5 w-5 inline mr-2" />
                Buy
              </button>
              <button
                onClick={() => setTradeType('sell')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                  tradeType === 'sell'
                    ? 'bg-crypto-red text-white'
                    : 'bg-crypto-gray text-white hover:bg-crypto-gray/80'
                }`}
              >
                <TrendingDown className="h-5 w-5 inline mr-2" />
                Sell
              </button>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Amount ({selectedCrypto.symbol})
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-crypto-gray border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-crypto-green"
              />
            </div>

            {/* Trade Summary */}
            {amount && (
              <div className="p-4 bg-crypto-gray/30 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Trade Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-white">{amount} {selectedCrypto.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price:</span>
                    <span className="text-white">{formatCurrency(selectedCrypto.current_price)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-white">{formatCurrency(parseFloat(amount) * selectedCrypto.current_price)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Execute Trade Button */}
            <button
              onClick={handleTrade}
              disabled={!amount || parseFloat(amount) <= 0}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                tradeType === 'buy'
                  ? 'bg-crypto-green hover:bg-crypto-green/90 text-black'
                  : 'bg-crypto-red hover:bg-crypto-red/90 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedCrypto.symbol}
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">Select a cryptocurrency to start trading</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingPanel;
