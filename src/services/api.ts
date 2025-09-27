import axios from 'axios';
import { CryptoCurrency } from '../types';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const fetchCryptoData = async (): Promise<CryptoCurrency[]> => {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h`
    );
    
    return response.data.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      current_price: coin.current_price,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      market_cap: coin.market_cap,
      total_volume: coin.total_volume,
      image: coin.image,
      sparkline_in_7d: coin.sparkline_in_7d
    }));
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw error;
  }
};

export const fetchCryptoPrice = async (coinId: string): Promise<number> => {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/simple/price?ids=${coinId}&vs_currencies=usd`
    );
    return response.data[coinId].usd;
  } catch (error) {
    console.error('Error fetching crypto price:', error);
    throw error;
  }
};

export const fetchHistoricalData = async (coinId: string, days: number = 7): Promise<{ timestamp: number; price: number }[]> => {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
    );
    
    return response.data.prices.map(([timestamp, price]: [number, number]) => ({
      timestamp,
      price
    }));
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
};
