import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CryptoCurrency } from '../types';

interface PriceChartProps {
  data: CryptoCurrency[];
}

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  // Create chart data from crypto data
  const chartData = data.map((crypto, index) => ({
    name: crypto.symbol,
    price: crypto.current_price,
    change: crypto.price_change_percentage_24h,
    marketCap: crypto.market_cap
  }));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-crypto-gray border border-gray-700 rounded-lg p-3">
          <p className="text-white font-semibold">{label}</p>
          <p className="text-crypto-green">
            Price: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-crypto-blue">
            Change: {payload[0].payload.change.toFixed(2)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="name" 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <YAxis 
            stroke="#9CA3AF"
            fontSize={12}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#00D4AA" 
            strokeWidth={2}
            dot={{ fill: '#00D4AA', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#00D4AA', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
