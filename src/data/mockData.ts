export interface Position {
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  marketValue: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  positionSize: number;
  entryTime: string;
  stopLoss: number;
  takeProfit: number;
}

export interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  dayHigh: number;
  dayLow: number;
  preMarketPrice?: number;
  preMarketChange?: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  symbols: string[];
  category: string;
}

export interface Order {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit' | 'stop';
  quantity: number;
  price: number;
  status: 'filled' | 'pending' | 'cancelled';
  time: string;
  pnl?: number;
}

export interface ScannerResult {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  avgVolume: number;
  relativeVolume: number;
  marketCap: string;
  signal: string;
}

export const positions: Position[] = [
  { symbol: 'NVDA', quantity: 50, avgPrice: 875.50, currentPrice: 924.30, marketValue: 46215, unrealizedPnL: 2440, unrealizedPnLPercent: 5.57, positionSize: 18.2, entryTime: '09:35 AM', stopLoss: 860, takeProfit: 950 },
  { symbol: 'TSLA', quantity: 100, avgPrice: 245.80, currentPrice: 238.45, marketValue: 23845, unrealizedPnL: -735, unrealizedPnLPercent: -3.0, positionSize: 9.4, entryTime: '10:15 AM', stopLoss: 230, takeProfit: 260 },
  { symbol: 'AAPL', quantity: 75, avgPrice: 189.20, currentPrice: 193.85, marketValue: 14538.75, unrealizedPnL: 348.75, unrealizedPnLPercent: 2.46, positionSize: 5.7, entryTime: '09:42 AM', stopLoss: 185, takeProfit: 198 },
  { symbol: 'AMD', quantity: 200, avgPrice: 168.40, currentPrice: 175.20, marketValue: 35040, unrealizedPnL: 1360, unrealizedPnLPercent: 4.04, positionSize: 13.8, entryTime: '09:31 AM', stopLoss: 162, takeProfit: 185 },
  { symbol: 'META', quantity: 30, avgPrice: 502.10, currentPrice: 518.75, marketValue: 15562.50, unrealizedPnL: 499.50, unrealizedPnLPercent: 3.32, positionSize: 6.1, entryTime: '10:02 AM', stopLoss: 490, takeProfit: 535 },
  { symbol: 'AMZN', quantity: 40, avgPrice: 185.60, currentPrice: 182.30, marketValue: 7292, unrealizedPnL: -132, unrealizedPnLPercent: -1.78, positionSize: 2.9, entryTime: '11:15 AM', stopLoss: 178, takeProfit: 195 },
  { symbol: 'MSFT', quantity: 25, avgPrice: 420.50, currentPrice: 428.90, marketValue: 10722.50, unrealizedPnL: 210, unrealizedPnLPercent: 2.0, positionSize: 4.2, entryTime: '09:55 AM', stopLoss: 410, takeProfit: 440 },
];

export const watchlist: WatchlistItem[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 924.30, change: 18.45, changePercent: 2.04, volume: 45200000, marketCap: '2.28T', dayHigh: 930.50, dayLow: 905.20, preMarketPrice: 928.00, preMarketChange: 0.4 },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 238.45, change: -7.35, changePercent: -3.0, volume: 82100000, marketCap: '758B', dayHigh: 248.90, dayLow: 236.10, preMarketPrice: 235.80, preMarketChange: -1.1 },
  { symbol: 'AAPL', name: 'Apple Inc', price: 193.85, change: 4.65, changePercent: 2.46, volume: 52300000, marketCap: '3.01T', dayHigh: 195.20, dayLow: 189.80, preMarketPrice: 194.50, preMarketChange: 0.34 },
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: 175.20, change: 6.80, changePercent: 4.04, volume: 38900000, marketCap: '283B', dayHigh: 177.40, dayLow: 168.90, preMarketPrice: 176.80, preMarketChange: 0.91 },
  { symbol: 'META', name: 'Meta Platforms', price: 518.75, change: 16.65, changePercent: 3.32, volume: 21400000, marketCap: '1.33T', dayHigh: 522.10, dayLow: 502.80, preMarketPrice: 520.50, preMarketChange: 0.34 },
  { symbol: 'AMZN', name: 'Amazon.com', price: 182.30, change: -3.30, changePercent: -1.78, volume: 41200000, marketCap: '1.90T', dayHigh: 186.50, dayLow: 181.20, preMarketPrice: 181.80, preMarketChange: -0.27 },
  { symbol: 'MSFT', name: 'Microsoft Corp', price: 428.90, change: 8.40, changePercent: 2.0, volume: 19800000, marketCap: '3.19T', dayHigh: 431.20, dayLow: 420.50, preMarketPrice: 430.10, preMarketChange: 0.28 },
  { symbol: 'GOOGL', name: 'Alphabet Inc', price: 176.40, change: 3.20, changePercent: 1.85, volume: 28500000, marketCap: '2.18T', dayHigh: 178.10, dayLow: 173.50, preMarketPrice: 177.20, preMarketChange: 0.45 },
  { symbol: 'NFLX', name: 'Netflix Inc', price: 628.50, change: -12.30, changePercent: -1.92, volume: 8900000, marketCap: '271B', dayHigh: 642.80, dayLow: 625.10, preMarketPrice: 625.40, preMarketChange: -0.49 },
  { symbol: 'COIN', name: 'Coinbase Global', price: 245.80, change: 18.90, changePercent: 8.34, volume: 15600000, marketCap: '60.2B', dayHigh: 248.50, dayLow: 226.30, preMarketPrice: 250.20, preMarketChange: 1.79 },
];

export const newsItems: NewsItem[] = [
  { id: '1', title: 'NVIDIA beats Q4 earnings expectations, revenue up 265% YoY', source: 'Bloomberg', time: '2 min ago', sentiment: 'bullish', symbols: ['NVDA'], category: 'Earnings' },
  { id: '2', title: 'Fed signals potential rate cuts in September meeting minutes', source: 'Reuters', time: '8 min ago', sentiment: 'bullish', symbols: ['SPY', 'QQQ'], category: 'Macro' },
  { id: '3', title: 'Tesla recalls 2M vehicles over autopilot safety concerns', source: 'CNBC', time: '15 min ago', sentiment: 'bearish', symbols: ['TSLA'], category: 'Company' },
  { id: '4', title: 'Apple Vision Pro sales exceed expectations in first month', source: 'WSJ', time: '22 min ago', sentiment: 'bullish', symbols: ['AAPL'], category: 'Company' },
  { id: '5', title: 'AMD announces new AI chip partnership with Microsoft Azure', source: 'TechCrunch', time: '35 min ago', sentiment: 'bullish', symbols: ['AMD', 'MSFT'], category: 'Tech' },
  { id: '6', title: 'Crypto market surges as Bitcoin ETF inflows hit record $1.2B', source: 'CoinDesk', time: '42 min ago', sentiment: 'bullish', symbols: ['COIN', 'MSTR'], category: 'Crypto' },
  { id: '7', title: 'Amazon AWS faces outage affecting multiple enterprise clients', source: 'Downdetector', time: '1 hr ago', sentiment: 'bearish', symbols: ['AMZN'], category: 'Tech' },
  { id: '8', title: 'Meta launches new AI model, competing with OpenAI GPT-5', source: 'The Verge', time: '1.5 hr ago', sentiment: 'neutral', symbols: ['META'], category: 'AI' },
];

export const orders: Order[] = [
  { id: '1', symbol: 'NVDA', side: 'buy', type: 'market', quantity: 25, price: 905.85, status: 'filled', time: '09:35 AM', pnl: 461.25 },
  { id: '2', symbol: 'TSLA', side: 'buy', type: 'limit', quantity: 100, price: 245.80, status: 'filled', time: '10:15 AM', pnl: -735 },
  { id: '3', symbol: 'AAPL', side: 'buy', type: 'market', quantity: 50, price: 189.20, status: 'filled', time: '09:42 AM', pnl: 232.50 },
  { id: '4', symbol: 'AMD', side: 'buy', type: 'market', quantity: 200, price: 168.40, status: 'filled', time: '09:31 AM', pnl: 1360 },
  { id: '5', symbol: 'META', side: 'buy', type: 'limit', quantity: 30, price: 502.10, status: 'filled', time: '10:02 AM', pnl: 499.50 },
  { id: '6', symbol: 'AMZN', side: 'buy', type: 'limit', quantity: 40, price: 185.60, status: 'filled', time: '11:15 AM', pnl: -132 },
  { id: '7', symbol: 'COIN', side: 'sell', type: 'market', quantity: 50, price: 228.40, status: 'filled', time: '11:45 AM', pnl: 1890 },
  { id: '8', symbol: 'NFLX', side: 'buy', type: 'limit', quantity: 10, price: 640.80, status: 'pending', time: '12:02 PM' },
];

export const scannerResults: ScannerResult[] = [
  { symbol: 'COIN', price: 245.80, change: 18.90, changePercent: 8.34, volume: 15600000, avgVolume: 8200000, relativeVolume: 1.9, marketCap: '60.2B', signal: 'Breakout' },
  { symbol: 'SMCI', price: 892.40, change: 62.30, changePercent: 7.51, volume: 9800000, avgVolume: 5100000, relativeVolume: 1.92, marketCap: '52.1B', signal: 'Momentum' },
  { symbol: 'MSTR', price: 1245.60, change: 78.40, changePercent: 6.71, volume: 4200000, avgVolume: 2800000, relativeVolume: 1.5, marketCap: '28.5B', signal: 'Breakout' },
  { symbol: 'PLTR', price: 24.85, change: 1.42, changePercent: 6.06, volume: 42100000, avgVolume: 28500000, relativeVolume: 1.48, marketCap: '52.8B', signal: 'Volume Spike' },
  { symbol: 'ARM', price: 148.90, change: 7.80, changePercent: 5.54, volume: 18200000, avgVolume: 12400000, relativeVolume: 1.47, marketCap: '155B', signal: 'Momentum' },
  { symbol: 'SOFI', price: 8.92, change: 0.44, changePercent: 5.19, volume: 35600000, avgVolume: 22100000, relativeVolume: 1.61, marketCap: '8.9B', signal: 'Gap Up' },
  { symbol: 'RIVN', price: 12.45, change: -0.85, changePercent: -6.39, volume: 28900000, avgVolume: 18200000, relativeVolume: 1.59, marketCap: '13.2B', signal: 'Breakdown' },
  { symbol: 'LCID', price: 5.82, change: -0.52, changePercent: -8.20, volume: 45200000, avgVolume: 25800000, relativeVolume: 1.75, marketCap: '6.1B', signal: 'Breakdown' },
];

export const generateCandlestickData = () => {
  const data = [];
  let price = 900;
  const now = new Date();
  for (let i = 60; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 5 * 60000);
    const open = price + (Math.random() - 0.48) * 5;
    const close = open + (Math.random() - 0.45) * 8;
    const high = Math.max(open, close) + Math.random() * 3;
    const low = Math.min(open, close) - Math.random() * 3;
    const volume = Math.floor(Math.random() * 500000) + 100000;
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      open: +open.toFixed(2),
      close: +close.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      volume,
    });
    price = close;
  }
  return data;
};

export const equityCurveData = [
  { date: 'Jan', value: 200000, spy: 200000 },
  { date: 'Feb', value: 208500, spy: 204200 },
  { date: 'Mar', value: 215200, spy: 206800 },
  { date: 'Apr', value: 222800, spy: 209100 },
  { date: 'May', value: 218400, spy: 207500 },
  { date: 'Jun', value: 231600, spy: 212400 },
  { date: 'Jul', value: 242100, spy: 218900 },
  { date: 'Aug', value: 238500, spy: 215200 },
  { date: 'Sep', value: 248900, spy: 220100 },
  { date: 'Oct', value: 255200, spy: 224800 },
  { date: 'Nov', value: 262800, spy: 228500 },
  { date: 'Dec', value: 253800, spy: 225100 },
  { date: 'Jan', value: 268400, spy: 231200 },
  { date: 'Feb', value: 275100, spy: 235800 },
];

export const sectorAllocation = [
  { name: 'Technology', value: 42, color: '#FFD700' },
  { name: 'Communication', value: 18, color: '#D4AF37' },
  { name: 'Consumer', value: 15, color: '#FFC107' },
  { name: 'Healthcare', value: 10, color: '#FFEB3B' },
  { name: 'Financial', value: 8, color: '#B8860B' },
  { name: 'Other', value: 7, color: '#8B6914' },
];

export const level2Data = {
  bids: [
    { price: 924.25, size: 500, mm: 'GSCO' },
    { price: 924.20, size: 1200, mm: 'MSFT' },
    { price: 924.15, size: 800, mm: 'UBSS' },
    { price: 924.10, size: 2500, mm: 'NITE' },
    { price: 924.05, size: 1500, mm: 'GSCO' },
    { price: 924.00, size: 3200, mm: 'MSFT' },
    { price: 923.95, size: 900, mm: 'ARCA' },
    { price: 923.90, size: 1800, mm: 'NSDQ' },
  ],
  asks: [
    { price: 924.35, size: 300, mm: 'NSDQ' },
    { price: 924.40, size: 800, mm: 'GSCO' },
    { price: 924.45, size: 1500, mm: 'MSFT' },
    { price: 924.50, size: 600, mm: 'ARCA' },
    { price: 924.55, size: 2200, mm: 'NITE' },
    { price: 924.60, size: 1100, mm: 'UBSS' },
    { price: 924.65, size: 4500, mm: 'GSCO' },
    { price: 924.70, size: 700, mm: 'MSFT' },
  ],
};

export const timeAndSales = [
  { time: '12:45:32', price: 924.30, size: 100, side: 'buy' as const },
  { time: '12:45:31', price: 924.25, size: 250, side: 'sell' as const },
  { time: '12:45:30', price: 924.30, size: 50, side: 'buy' as const },
  { time: '12:45:29', price: 924.35, size: 500, side: 'buy' as const },
  { time: '12:45:28', price: 924.28, size: 150, side: 'sell' as const },
  { time: '12:45:27', price: 924.32, size: 300, side: 'buy' as const },
  { time: '12:45:26', price: 924.25, size: 75, side: 'sell' as const },
  { time: '12:45:25', price: 924.30, size: 200, side: 'buy' as const },
  { time: '12:45:24', price: 924.35, size: 1000, side: 'buy' as const },
  { time: '12:45:23', price: 924.28, size: 125, side: 'sell' as const },
  { time: '12:45:22', price: 924.32, size: 400, side: 'buy' as const },
  { time: '12:45:21', price: 924.30, size: 80, side: 'sell' as const },
];

export const performanceStats = {
  winRate: 68.5,
  avgWin: 485.20,
  avgLoss: -215.80,
  profitFactor: 2.84,
  maxDrawdown: -4.2,
  sharpeRatio: 2.15,
  totalTrades: 247,
  bestTrade: 3420,
  worstTrade: -1250,
  avgHoldTime: '2h 15m',
};
