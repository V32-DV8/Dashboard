import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { level2Data, timeAndSales } from '../data/mockData';

export default function Level2Widget() {
  const maxSize = Math.max(
    ...level2Data.bids.map(b => b.size),
    ...level2Data.asks.map(a => a.size)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card p-4 flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Activity size={14} className="text-[#FFD700]" />
          Level 2 & Tape
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1">
        {/* Level 2 */}
        <div className="space-y-0.5">
          <div className="text-[10px] text-[#B0B0B0] mb-1 font-medium">Order Book</div>
          
          {/* Asks (reversed) */}
          <div className="space-y-0.5 mb-2">
            {[...level2Data.asks].reverse().map((ask, i) => (
              <div key={`ask-${i}`} className="flex items-center text-[10px] relative">
                <div
                  className="absolute right-0 top-0 bottom-0 bg-[#FF3333]/10 rounded-sm"
                  style={{ width: `${(ask.size / maxSize) * 100}%` }}
                />
                <span className="relative z-10 w-12 text-[#FF3333] font-mono">{ask.price.toFixed(2)}</span>
                <span className="relative z-10 flex-1 text-right text-white font-mono">{ask.size.toLocaleString()}</span>
                <span className="relative z-10 w-10 text-right text-[#B0B0B0] font-mono text-[9px]">{ask.mm}</span>
              </div>
            ))}
          </div>

          {/* Spread */}
          <div className="text-center py-1 border-y border-[#2a2a2a]">
            <span className="text-[10px] text-[#FFD700] font-bold">
              Spread: $0.10 (0.01%)
            </span>
          </div>

          {/* Bids */}
          <div className="space-y-0.5 mt-2">
            {level2Data.bids.map((bid, i) => (
              <div key={`bid-${i}`} className="flex items-center text-[10px] relative">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-[#00FF88]/10 rounded-sm"
                  style={{ width: `${(bid.size / maxSize) * 100}%` }}
                />
                <span className="relative z-10 w-12 text-[#00FF88] font-mono">{bid.price.toFixed(2)}</span>
                <span className="relative z-10 flex-1 text-right text-white font-mono">{bid.size.toLocaleString()}</span>
                <span className="relative z-10 w-10 text-right text-[#B0B0B0] font-mono text-[9px]">{bid.mm}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Time & Sales */}
        <div>
          <div className="text-[10px] text-[#B0B0B0] mb-1 font-medium">Time & Sales</div>
          <div className="space-y-0.5 max-h-[250px] overflow-y-auto">
            {timeAndSales.map((trade, i) => (
              <div key={i} className="flex items-center text-[10px] py-0.5 hover:bg-white/[0.02]">
                <span className="w-14 text-[#B0B0B0] font-mono">{trade.time}</span>
                <span className={`flex-1 font-mono ${trade.side === 'buy' ? 'text-[#00FF88]' : 'text-[#FF3333]'}`}>
                  {trade.price.toFixed(2)}
                </span>
                <span className="w-10 text-right text-white font-mono">{trade.size}</span>
                <span className={`w-6 text-right text-[9px] ${trade.side === 'buy' ? 'text-[#00FF88]' : 'text-[#FF3333]'}`}>
                  {trade.side === 'buy' ? 'B' : 'S'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
