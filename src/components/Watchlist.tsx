import { motion } from 'framer-motion';
import { useState } from 'react';
import { Star, TrendingUp, TrendingDown, Plus, MoreVertical } from 'lucide-react';
import { watchlist } from '../data/mockData';
import { useStore } from '../store/useStore';

export default function Watchlist() {
  const [activeList, setActiveList] = useState('Momentum');
  const { setSelectedSymbol, setOrderModalOpen, setOrderSide } = useStore();

  const lists = ['Momentum', 'Earnings', 'IPOs', 'Crypto', 'My List'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card p-4 flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Star size={14} className="text-[#FFD700]" />
          Watchlist
        </h3>
        <button className="p-1 rounded hover:bg-white/5 transition-colors">
          <Plus size={14} className="text-[#B0B0B0]" />
        </button>
      </div>

      <div className="flex gap-1 mb-3 overflow-x-auto pb-1">
        {lists.map((list) => (
          <button
            key={list}
            onClick={() => setActiveList(list)}
            className={`px-2 py-1 text-[10px] rounded-md whitespace-nowrap transition-all ${
              activeList === list
                ? 'bg-[#D4AF37]/20 text-[#FFD700] border border-[#D4AF37]/40'
                : 'text-[#B0B0B0] hover:text-white hover:bg-white/5'
            }`}
          >
            {list}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-1">
        {watchlist.map((item) => (
          <motion.div
            key={item.symbol}
            whileHover={{ x: 2 }}
            className="flex items-center justify-between p-2 rounded-md hover:bg-white/[0.03] transition-all cursor-pointer group"
            onClick={() => setSelectedSymbol(item.symbol)}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">{item.symbol}</span>
                {item.changePercent >= 0 ? (
                  <TrendingUp size={10} className="text-[#00FF88]" />
                ) : (
                  <TrendingDown size={10} className="text-[#FF3333]" />
                )}
              </div>
              <div className="text-[10px] text-[#B0B0B0] truncate">{item.name}</div>
            </div>

            <div className="text-right">
              <div className="text-sm font-medium text-white">${item.price.toFixed(2)}</div>
              <div className={`text-[10px] font-medium ${item.changePercent >= 0 ? 'profit-text' : 'loss-text'}`}>
                {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
              </div>
            </div>

            <div className="hidden group-hover:flex items-center gap-1 ml-2">
              <button
                onClick={(e) => { e.stopPropagation(); setOrderSide('buy'); setOrderModalOpen(true); }}
                className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-[#00FF88]/20 text-[#00FF88]"
              >B</button>
              <button
                onClick={(e) => { e.stopPropagation(); setOrderSide('sell'); setOrderModalOpen(true); }}
                className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-[#FF3333]/20 text-[#FF3333]"
              >S</button>
            </div>

            {item.preMarketPrice && (
              <div className="absolute right-12 top-1 hidden group-hover:block">
                <span className="text-[9px] text-[#B0B0B0]">
                  PM: ${item.preMarketPrice.toFixed(2)}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-[#2a2a2a]">
        <div className="flex items-center justify-between text-[10px] text-[#B0B0B0]">
          <span>Market Open</span>
          <span className="text-[#00FF88]">● Regular Hours</span>
        </div>
      </div>
    </motion.div>
  );
}
