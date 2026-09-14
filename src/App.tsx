import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Ticker from './components/Ticker';
import PortfolioSummary from './components/PortfolioSummary';
import PositionsTable from './components/PositionsTable';
import Watchlist from './components/Watchlist';
import ChartWidget from './components/ChartWidget';
import MarketScanner from './components/MarketScanner';
import NewsFeed from './components/NewsFeed';
import OrderTicket from './components/OrderTicket';
import Level2Widget from './components/Level2Widget';
import Analytics from './components/Analytics';
import RiskMetrics from './components/RiskMetrics';
import OrderHistory from './components/OrderHistory';
import BrokerStatus from './components/BrokerStatus';
import { useStore } from './store/useStore';

function App() {
  const { activeTab } = useStore();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col">
      <Header />
      <Ticker />
      
      <main className="flex-1 p-3 overflow-auto">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'charts' && <ChartsView />}
        {activeTab === 'orders' && <OrdersView />}
        {activeTab === 'analytics' && <AnalyticsView />}
        {activeTab === 'scanner' && <ScannerView />}
        {activeTab === 'settings' && <SettingsView />}
      </main>

      <OrderTicket />
    </div>
  );
}

function DashboardView() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-3">
      {/* Top Row - Portfolio Summary */}
      <div className="xl:col-span-12">
        <PortfolioSummary />
      </div>

      {/* Main Content Area */}
      <div className="xl:col-span-8 grid grid-rows-[auto_auto] gap-3">
        {/* Chart */}
        <ChartWidget />
        
        {/* Positions & Scanner */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <PositionsTable />
          <MarketScanner />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="xl:col-span-4 grid grid-rows-[auto_auto_auto] gap-3">
        <Watchlist />
        <Level2Widget />
        <RiskMetrics />
      </div>

      {/* Bottom Row */}
      <div className="xl:col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-3">
        <OrderHistory />
        <NewsFeed />
        <div className="grid grid-rows-2 gap-3">
          <BrokerStatus />
          <QuickTradePanel />
        </div>
      </div>
    </div>
  );
}

function QuickTradePanel() {
  const { setOrderModalOpen, setOrderSide, setSelectedSymbol } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="glass-card p-4"
    >
      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse"></span>
        Quick Trade
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => { setOrderSide('buy'); setOrderModalOpen(true); }}
          className="py-3 rounded-lg font-bold text-sm bg-[#00FF88] text-black hover:shadow-lg hover:shadow-[#00FF88]/30 transition-all"
        >
          BUY
        </button>
        <button
          onClick={() => { setOrderSide('sell'); setOrderModalOpen(true); }}
          className="py-3 rounded-lg font-bold text-sm bg-[#FF3333] text-white hover:shadow-lg hover:shadow-[#FF3333]/30 transition-all"
        >
          SELL
        </button>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1">
        {['NVDA', 'TSLA', 'AAPL', 'AMD', 'META', 'COIN'].map((sym) => (
          <button
            key={sym}
            onClick={() => setSelectedSymbol(sym)}
            className="py-1.5 rounded text-[10px] font-bold bg-[#111111] text-[#B0B0B0] hover:text-[#FFD700] hover:bg-[#D4AF37]/10 border border-[#2a2a2a] hover:border-[#D4AF37]/40 transition-all"
          >
            {sym}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function ChartsView() {
  return (
    <div className="grid grid-cols-1 gap-3">
      <ChartWidget />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Level2Widget />
        <Analytics />
      </div>
    </div>
  );
}

function OrdersView() {
  return (
    <div className="grid grid-cols-1 gap-3">
      <OrderHistory />
      <PositionsTable />
    </div>
  );
}

function AnalyticsView() {
  return (
    <div className="grid grid-cols-1 gap-3">
      <Analytics />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <RiskMetrics />
        <BrokerStatus />
      </div>
    </div>
  );
}

function ScannerView() {
  return (
    <div className="grid grid-cols-1 gap-3">
      <MarketScanner />
      <NewsFeed />
    </div>
  );
}

function SettingsView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 max-w-2xl mx-auto"
    >
      <h2 className="text-xl font-bold gold-text mb-6">Settings</h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-[#111111] rounded-lg border border-[#2a2a2a]">
          <h3 className="text-sm font-bold text-white mb-3">Broker Connections</h3>
          <BrokerStatus />
        </div>

        <div className="p-4 bg-[#111111] rounded-lg border border-[#2a2a2a]">
          <h3 className="text-sm font-bold text-white mb-3">Trading Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#B0B0B0]">Default Order Type</span>
              <select className="bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1 text-xs text-white">
                <option>Market</option>
                <option>Limit</option>
                <option>Stop</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#B0B0B0]">Daily Loss Limit</span>
              <input type="text" defaultValue="$5,000" className="bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1 text-xs text-white w-24 text-right" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#B0B0B0]">Confirm Orders</span>
              <div className="w-10 h-5 bg-[#D4AF37] rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#B0B0B0]">Sound Alerts</span>
              <div className="w-10 h-5 bg-[#D4AF37] rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#111111] rounded-lg border border-[#2a2a2a]">
          <h3 className="text-sm font-bold text-white mb-3">Keyboard Shortcuts</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#B0B0B0]">Buy Order</span>
              <kbd className="px-2 py-0.5 bg-[#2a2a2a] rounded text-[#FFD700]">Ctrl+B</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-[#B0B0B0]">Sell Order</span>
              <kbd className="px-2 py-0.5 bg-[#2a2a2a] rounded text-[#FFD700]">Ctrl+S</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-[#B0B0B0]">Add to Watchlist</span>
              <kbd className="px-2 py-0.5 bg-[#2a2a2a] rounded text-[#FFD700]">Ctrl+W</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-[#B0B0B0]">Search Symbols</span>
              <kbd className="px-2 py-0.5 bg-[#2a2a2a] rounded text-[#FFD700]">Ctrl+F</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-[#B0B0B0]">Close Modal</span>
              <kbd className="px-2 py-0.5 bg-[#2a2a2a] rounded text-[#FFD700]">Esc</kbd>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default App;
