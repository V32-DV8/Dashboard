import { motion } from 'framer-motion';
import { useState } from 'react';
import { Receipt, Filter } from 'lucide-react';
import { orders } from '../data/mockData';

export default function OrderHistory() {
  const [filter, setFilter] = useState<'all' | 'filled' | 'pending'>('all');

  const filteredOrders = orders.filter((o) => {
    if (filter === 'filled') return o.status === 'filled';
    if (filter === 'pending') return o.status === 'pending';
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'filled': return 'bg-[#00FF88]/20 text-[#00FF88]';
      case 'pending': return 'bg-[#FFC107]/20 text-[#FFC107]';
      case 'cancelled': return 'bg-[#FF3333]/20 text-[#FF3333]';
      default: return 'bg-[#2a2a2a] text-[#B0B0B0]';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card p-4 flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Receipt size={14} className="text-[#FFD700]" />
          Order History
        </h3>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-2 py-0.5 text-[10px] rounded ${filter === 'all' ? 'bg-[#D4AF37]/20 text-[#FFD700]' : 'text-[#B0B0B0]'}`}
          >All</button>
          <button
            onClick={() => setFilter('filled')}
            className={`px-2 py-0.5 text-[10px] rounded ${filter === 'filled' ? 'bg-[#00FF88]/20 text-[#00FF88]' : 'text-[#B0B0B0]'}`}
          >Filled</button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-2 py-0.5 text-[10px] rounded ${filter === 'pending' ? 'bg-[#FFC107]/20 text-[#FFC107]' : 'text-[#B0B0B0]'}`}
          >Pending</button>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-[#B0B0B0] border-b border-[#2a2a2a]">
              <th className="text-left py-1.5 px-1 font-medium">Time</th>
              <th className="text-left py-1.5 px-1 font-medium">Symbol</th>
              <th className="text-center py-1.5 px-1 font-medium">Side</th>
              <th className="text-right py-1.5 px-1 font-medium">Qty</th>
              <th className="text-right py-1.5 px-1 font-medium">Price</th>
              <th className="text-right py-1.5 px-1 font-medium">P&L</th>
              <th className="text-center py-1.5 px-1 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b border-[#1a1a1a] hover:bg-white/[0.02] transition-colors">
                <td className="py-1.5 px-1 text-[#B0B0B0]">{order.time}</td>
                <td className="py-1.5 px-1 font-bold text-white">{order.symbol}</td>
                <td className="py-1.5 px-1 text-center">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    order.side === 'buy' ? 'bg-[#00FF88]/20 text-[#00FF88]' : 'bg-[#FF3333]/20 text-[#FF3333]'
                  }`}>
                    {order.side.toUpperCase()}
                  </span>
                </td>
                <td className="py-1.5 px-1 text-right text-white">{order.quantity}</td>
                <td className="py-1.5 px-1 text-right text-white">${order.price.toFixed(2)}</td>
                <td className={`py-1.5 px-1 text-right font-medium ${
                  order.pnl === undefined ? 'text-[#B0B0B0]' : order.pnl >= 0 ? 'profit-text' : 'loss-text'
                }`}>
                  {order.pnl !== undefined ? `${order.pnl >= 0 ? '+' : ''}$${order.pnl.toLocaleString()}` : '—'}
                </td>
                <td className="py-1.5 px-1 text-center">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] ${getStatusBadge(order.status)}`}>
                    {order.status}
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
