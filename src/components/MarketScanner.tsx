import { motion } from 'framer-motion';
import { useState } from 'react';
import { Zap, Filter, RefreshCw } from 'lucide-react';
import { scannerResults } from '../data/mockData';
import { useStore } from '../store/useStore';

export default function MarketScanner() {
  const [activeScan, setActiveScan] = useState('gainers');
  const { setSelectedSymbol } = useStore();

  const scans = [
    { id: 'gainers', label: 'Top Gainers', icon: '🚀' },
    { id: 'losers', label: 'Top Losers', icon: '📉' },
    { id: 'volume', label: 'High Volume', icon: '📊' },
    { id: 'breakout', label: 'Breakouts', icon: '⚡' },
    { id: 'gap', label: 'Gap Up', icon: '📈' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card p-4 flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Zap size={14} className="text-[#FFD700]" />
          Market Scanner
        </h3>
        <div className="flex items-center gap-1">
          <button className="p-1 rounded hover:bg-white/5 transition-colors">
            <Filter size={12} className="text-[#B0B0B0]" />
          </button>
          <button className="p-1 rounded hover:bg-white/5 transition-colors">
            <RefreshCw size={12} className="text-[#B0B0B0]" />
          </button>
        </div>
      </div>

      <div className="flex gap-1 mb-3 overflow-x-auto pb-1">
        {scans.map((scan) => (
          <button
            key={scan.id}
            onClick={() => setActiveScan(scan.id)}
            className={`px-2 py-1 text-[10px] rounded-md whitespace-nowrap transition-all flex items-center gap-1 ${
              activeScan === scan.id
                ? 'bg-[#D4AF37]/20 text-[#FFD700] border border-[#D4AF37]/40'
                : 'text-[#B0B0B0] hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{scan.icon}</span>
            {scan.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-[#B0B0B0] border-b border-[#2a2a2a]">
              <th className="text-left py-1.5 px-1 font-medium">Symbol</th>
              <th className="text-right py-1.5 px-1 font-medium">Price</th>
              <th className="text-right py-1.5 px-1 font-medium">Chg%</th>
              <th className="text-right py-1.5 px-1 font-medium hidden sm:table-cell">Vol</th>
              <th className="text-right py-1.5 px-1 font-medium hidden md:table-cell">Rel Vol</th>
              <th className="text-center py-1.5 px-1 font-medium">Signal</th>
            </tr>
          </thead>
          <tbody>
            {scannerResults.map((item) => (
              <tr
                key={item.symbol}
                className="border-b border-[#1a1a1a] hover:bg-white/[0.02] transition-colors cursor-pointer"
                onClick={() => setSelectedSymbol(item.symbol)}
              >
                <td className="py-1.5 px-1 font-bold text-white">{item.symbol}</td>
                <td className="text-right py-1.5 px-1 text-white">${item.price.toFixed(2)}</td>
                <td className={`text-right py-1.5 px-1 font-medium ${item.changePercent >= 0 ? 'profit-text' : 'loss-text'}`}>
                  {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                </td>
                <td className="text-right py-1.5 px-1 text-[#B0B0B0] hidden sm:table-cell">
                  {(item.volume / 1000000).toFixed(1)}M
                </td>
                <td className="text-right py-1.5 px-1 hidden md:table-cell">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                    item.relativeVolume > 1.5 ? 'bg-[#FFD700]/20 text-[#FFD700]' : 'text-[#B0B0B0]'
                  }`}>
                    {item.relativeVolume}x
                  </span>
                </td>
                <td className="text-center py-1.5 px-1">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                    item.signal === 'Breakout' ? 'bg-[#00FF88]/20 text-[#00FF88]' :
                    item.signal === 'Breakdown' ? 'bg-[#FF3333]/20 text-[#FF3333]' :
                    'bg-[#FFC107]/20 text-[#FFC107]'
                  }`}>
                    {item.signal}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
