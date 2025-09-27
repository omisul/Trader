export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface Portfolio {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  profitLoss: number;
  profitLossPercentage: number;
}

export interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  total: number;
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  portfolio: Portfolio[];
  trades: Trade[];
}

export interface PriceData {
  timestamp: number;
  price: number;
}
