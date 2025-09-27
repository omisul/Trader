# CryptoTrader Pro

A modern, professional cryptocurrency trading application built with React, TypeScript, and Tailwind CSS.

## Features

### 🚀 Core Functionality
- **Real-time Crypto Data**: Live price updates from CoinGecko API
- **Portfolio Management**: Track your holdings and performance
- **Trading Interface**: Buy and sell cryptocurrencies with ease
- **Interactive Charts**: Visualize market data with beautiful charts
- **Responsive Design**: Works perfectly on desktop and mobile

### 📊 Dashboard
- Market overview with top gainers and losers
- Portfolio performance metrics
- Real-time price charts
- Balance and asset tracking

### 💼 Trading
- Search and select from 50+ cryptocurrencies
- Buy/sell interface with real-time pricing
- Trade history and portfolio tracking
- Profit/loss calculations

### 📈 Portfolio
- Detailed holdings view
- Performance analytics
- Trade history
- Profit/loss tracking

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **API**: CoinGecko API
- **Build Tool**: Create React App

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd crypto-trading-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Dashboard.tsx   # Main dashboard
│   ├── TradingPanel.tsx # Trading interface
│   ├── Portfolio.tsx   # Portfolio management
│   ├── CryptoCard.tsx  # Crypto display card
│   └── PriceChart.tsx  # Price visualization
├── services/           # API services
│   └── api.ts         # CoinGecko API integration
├── types/             # TypeScript type definitions
│   └── index.ts       # Type definitions
├── App.tsx            # Main application component
├── index.tsx          # Application entry point
└── index.css          # Global styles
```

## API Integration

The app integrates with the CoinGecko API to provide:
- Real-time cryptocurrency prices
- Market data and statistics
- Historical price data
- Market cap and volume information

## Features in Detail

### Real-time Updates
- Prices update every 30 seconds
- Live portfolio value calculations
- Real-time profit/loss tracking

### Trading System
- Simulated trading environment
- Portfolio balance management
- Trade history tracking
- Average price calculations

### Responsive Design
- Mobile-first approach
- Dark theme optimized for trading
- Smooth animations and transitions
- Professional trading interface

## Customization

### Styling
The app uses Tailwind CSS with custom color scheme:
- `crypto-green`: #00D4AA
- `crypto-red`: #FF6B6B
- `crypto-blue`: #4A90E2
- `crypto-dark`: #1A1A1A
- `crypto-gray`: #2D2D2D

### Adding New Features
1. Create new components in `src/components/`
2. Add API endpoints in `src/services/api.ts`
3. Update types in `src/types/index.ts`
4. Integrate with main App component

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Disclaimer

This is a demo application for educational purposes. It does not connect to real trading exchanges and uses simulated data. Always do your own research before investing in cryptocurrencies.