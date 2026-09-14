import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Calculator, AlertTriangle } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function OrderTicket() {
  const { orderModalOpen, setOrderModalOpen, orderSide, setOrderSide, selectedSymbol } = useStore();
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop'>('market');
  const [quantity, setQuantity] = useState('100');
  const [price, setPrice] = useState('');
  const [timeInForce, setTimeInForce] = useState('DAY');

  const qty = parseInt(quantity) || 0;
  const estimatedCost = qty * (parseFloat(price) || 924.30);

  const quickQtys = [10, 25, 50, 100, 250, 500];

  if (!orderModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={() => setOrderModalOpen(false)}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative glass-card p-6 w-full max-w-md border border-[#D4AF37]/30"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Order Entry</h3>
            <button onClick={() => setOrderModalOpen(false)} className="p-1 rounded hover:bg-white/5">
              <X size={18} className="text-[#B0B0B0]" />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold gold-text">{selectedSymbol}</span>
            <span className="text-sm text-[#B0B0B0]">$924.30</span>
          </div>

          {/* Buy/Sell Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setOrderSide('buy')}
              className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${
                orderSide === 'buy'
                  ? 'bg-[#00FF88] text-black shadow-lg shadow-[#00FF88]/20'
                  : 'bg-[#1a1a1a] text-[#B0B0B0] border border-[#2a2a2a]'
              }`}
            >
              BUY
            </button>
            <button
              onClick={() => setOrderSide('sell')}
              className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${
                orderSide === 'sell'
                  ? 'bg-[#FF3333] text-white shadow-lg shadow-[#FF3333]/20'
                  : 'bg-[#1a1a1a] text-[#B0B0B0] border border-[#2a2a2a]'
              }`}
            >
              SELL
            </button>
          </div>

          {/* Order Type */}
          <div className="mb-4">
            <label className="text-xs text-[#B0B0B0] mb-1 block">Order Type</label>
            <div className="flex gap-1">
              {(['market', 'limit', 'stop'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setOrderType(type)}
                  className={`flex-1 py-1.5 rounded text-xs font-medium transition-all ${
                    orderType === type
                      ? 'bg-[#D4AF37]/20 text-[#FFD700] border border-[#D4AF37]/40'
                      : 'bg-[#1a1a1a] text-[#B0B0B0] border border-[#2a2a2a]'
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label className="text-xs text-[#B0B0B0] mb-1 block">Quantity (Shares)</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#D4AF37]/50"
            />
            <div className="flex gap-1 mt-2">
              {quickQtys.map((q) => (
                <button
                  key={q}
                  onClick={() => setQuantity(q.toString())}
                  className="flex-1 py-1 rounded text-[10px] bg-[#1a1a1a] text-[#B0B0B0] hover:text-[#FFD700] hover:bg-[#D4AF37]/10 transition-colors border border-[#2a2a2a]"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Price (for limit/stop) */}
          {orderType !== 'market' && (
            <div className="mb-4">
              <label className="text-xs text-[#B0B0B0] mb-1 block">
                {orderType === 'limit' ? 'Limit Price' : 'Stop Price'}
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="924.30"
                className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#D4AF37]/50"
              />
            </div>
          )}

          {/* Time in Force */}
          <div className="mb-4">
            <label className="text-xs text-[#B0B0B0] mb-1 block">Time in Force</label>
            <select
              value={timeInForce}
              onChange={(e) => setTimeInForce(e.target.value)}
              className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#D4AF37]/50"
            >
              <option value="DAY">Day</option>
              <option value="GTC">Good Till Cancelled</option>
              <option value="IOC">Immediate or Cancel</option>
              <option value="FOK">Fill or Kill</option>
            </select>
          </div>

          {/* Estimate */}
          <div className="bg-[#111111] rounded-lg p-3 mb-4 border border-[#2a2a2a]">
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#B0B0B0]">Estimated Cost</span>
              <span className="text-sm font-bold text-white">${estimatedCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-[#B0B0B0]">Commission</span>
              <span className="text-xs text-[#00FF88]">$0.00</span>
            </div>
          </div>

          {/* Risk Warning */}
          <div className="flex items-center gap-2 mb-4 p-2 rounded bg-[#FFC107]/10 border border-[#FFC107]/20">
            <AlertTriangle size={12} className="text-[#FFC107]" />
            <span className="text-[10px] text-[#FFC107]">
              This order represents {((estimatedCost / 253847) * 100).toFixed(1)}% of your buying power
            </span>
          </div>

          {/* Submit */}
          <div className="flex gap-2">
            <button
              onClick={() => setOrderModalOpen(false)}
              className="flex-1 py-2.5 rounded-lg font-medium text-sm bg-[#1a1a1a] text-[#B0B0B0] border border-[#2a2a2a] hover:bg-[#2a2a2a] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setOrderModalOpen(false)}
              className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${
                orderSide === 'buy'
                  ? 'bg-[#00FF88] text-black hover:shadow-lg hover:shadow-[#00FF88]/30'
                  : 'bg-[#FF3333] text-white hover:shadow-lg hover:shadow-[#FF3333]/30'
              }`}
            >
              {orderSide === 'buy' ? 'BUY' : 'SELL'} {qty} SHARES
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-3">
            <Calculator size={10} className="text-[#B0B0B0]" />
            <span className="text-[10px] text-[#B0B0B0]">Position Size Calculator</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
