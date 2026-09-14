import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowUpDown, X, Search } from 'lucide-react';
import { positions } from '../data/mockData';
import { useStore } from '../store/useStore';

export default function PositionsTable() {
  const [filter, setFilter] = useState<'all' | 'profit' | 'loss'>('all');
  const [search, setSearch] = useState('');
  const { setSelectedSymbol, setOrderModalOpen, setOrderSide } = useStore();

  const filteredPositions = positions.filter((p) => {
    if (filter === 'profit' && p.unrealizedPnL < 0) return false;
    if (filter === 'loss' && p.unrealizedPnL >= 0) return false;
    if (search && !p.symbol.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleTrade = (symbol: string, side: 'buy' | 'sell') => {
    setSelectedSymbol(symbol);
    setOrderSide(side);
    setOrderModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-4 flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FFD700]"></span>
          Live Positions
          <span className="text-xs text-[#B0B0B0] font-normal">({filteredPositions.length})</span>
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#111111] rounded-md border border-[#2a2a2a]">
            <button
              onClick={() => setFilter('all')}
              className={`px-2 py-1 text-xs rounded-l-md ${filter === 'all' ? 'bg-[#D4AF37]/20 text-[#FFD700]' : 'text-[#B0B0B0]'}`}
            >All</button>
            <button
              onClick={() => setFilter('profit')}
              className={`px-2 py-1 text-xs ${filter === 'profit' ? 'bg-[#00FF88]/20 text-[#00FF88]' : 'text-[#B0B0B0]'}`}
            >Gainers</button>
            <button
              onClick={() => setFilter('loss')}
              className={`px-2 py-1 text-xs rounded-r-md ${filter === 'loss' ? 'bg-[#FF3333]/20 text-[#FF3333]' : 'text-[#B0B0B0]'}`}
            >Losers</button>
          </div>
        </div>
      </div>

      <div className="relative mb-3">
        <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#B0B0B0]" />
        <input
          type="text"
          placeholder="Filter symbols..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#111111] border border-[#2a2a2a] rounded-md pl-7 pr-3 py-1.5 text-xs text-white placeholder-[#B0B0B0] outline-none focus:border-[#D4AF37]/50"
        />
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-[#B0B0B0] border-b border-[#2a2a2a]">
              <th className="text-left py-2 px-1 font-medium cursor-pointer hover:text-[#FFD700]">
                <span className="flex items-center gap-1">Symbol <ArrowUpDown size={10} /></span>
              </th>
              <th className="text-right py-2 px-1 font-medium">Qty</th>
              <th className="text-right py-2 px-1 font-medium">Avg</th>
              <th className="text-right py-2 px-1 font-medium">Current</th>
              <th className="text-right py-2 px-1 font-medium">Mkt Val</th>
              <th className="text-right py-2 px-1 font-medium">P&L</th>
              <th className="text-right py-2 px-1 font-medium">%</th>
              <th className="text-center py-2 px-1 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPositions.map((pos) => (
              <tr
                key={pos.symbol}
                className="border-b border-[#1a1a1a] hover:bg-white/[0.02] transition-colors cursor-pointer"
                onClick={() => setSelectedSymbol(pos.symbol)}
              >
                <td className="py-2 px-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{pos.symbol}</span>
                    <span className="text-[10px] text-[#B0B0B0]">{pos.positionSize}%</span>
                  </div>
                </td>
                <td className="text-right py-2 px-1 text-white">{pos.quantity}</td>
                <td className="text-right py-2 px-1 text-[#B0B0B0]">${pos.avgPrice.toFixed(2)}</td>
                <td className="text-right py-2 px-1 text-white font-medium">${pos.currentPrice.toFixed(2)}</td>
                <td className="text-right py-2 px-1 text-white">${pos.marketValue.toLocaleString()}</td>
                <td className={`text-right py-2 px-1 font-medium ${pos.unrealizedPnL >= 0 ? 'profit-text' : 'loss-text'}`}>
                  {pos.unrealizedPnL >= 0 ? '+' : ''}${pos.unrealizedPnL.toLocaleString()}
                </td>
                <td className={`text-right py-2 px-1 ${pos.unrealizedPnLPercent >= 0 ? 'profit-text' : 'loss-text'}`}>
                  {pos.unrealizedPnLPercent >= 0 ? '+' : ''}{pos.unrealizedPnLPercent}%
                </td>
                <td className="text-center py-2 px-1">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleTrade(pos.symbol, 'buy'); }}
                      className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-[#00FF88]/20 text-[#00FF88] hover:bg-[#00FF88]/30 transition-colors"
                    >+</button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleTrade(pos.symbol, 'sell'); }}
                      className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-[#FF3333]/20 text-[#FF3333] hover:bg-[#FF3333]/30 transition-colors"
                    >−</button>
                    <button
                      onClick={(e) => { e.stopPropagation(); }}
                      className="p-0.5 rounded hover:bg-white/10 transition-colors"
                    >
                      <X size={10} className="text-[#B0B0B0]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
