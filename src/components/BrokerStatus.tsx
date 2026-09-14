import { motion } from 'framer-motion';
import { useState } from 'react';
import { Building2, ChevronDown, Check, AlertCircle } from 'lucide-react';

const brokers = [
  { id: 'ibkr', name: 'Interactive Brokers', status: 'connected', balance: 142500 },
  { id: 'td', name: 'TD Ameritrade', status: 'connected', balance: 68200 },
  { id: 'robinhood', name: 'Robinhood', status: 'connected', balance: 43147 },
  { id: 'webull', name: 'Webull', status: 'disconnected', balance: 0 },
  { id: 'etrade', name: 'E*TRADE', status: 'error', balance: 0 },
];

export default function BrokerStatus() {
  const [expanded, setExpanded] = useState(false);
  const connectedBrokers = brokers.filter(b => b.status === 'connected');
  const totalBalance = connectedBrokers.reduce((sum, b) => sum + b.balance, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="glass-card p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Building2 size={14} className="text-[#FFD700]" />
          Broker Accounts
        </h3>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1 rounded hover:bg-white/5 transition-colors"
        >
          <ChevronDown size={14} className={`text-[#B0B0B0] transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-[#B0B0B0]">Total Connected</span>
        <span className="text-sm font-bold text-white">${totalBalance.toLocaleString()}</span>
      </div>

      <div className="space-y-1.5">
        {brokers.slice(0, expanded ? undefined : 3).map((broker) => (
          <div
            key={broker.id}
            className="flex items-center justify-between p-2 rounded-md bg-[#111111] border border-[#2a2a2a] hover:border-[#D4AF37]/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                broker.status === 'connected' ? 'bg-[#00FF88]' :
                broker.status === 'error' ? 'bg-[#FF3333]' : 'bg-[#B0B0B0]'
              }`} />
              <span className="text-xs text-white font-medium">{broker.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {broker.status === 'connected' && (
                <span className="text-xs text-white">${broker.balance.toLocaleString()}</span>
              )}
              {broker.status === 'connected' && <Check size={12} className="text-[#00FF88]" />}
              {broker.status === 'error' && <AlertCircle size={12} className="text-[#FF3333]" />}
              {broker.status === 'disconnected' && (
                <button className="text-[10px] px-2 py-0.5 rounded btn-outline-gold">Connect</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {!expanded && brokers.length > 3 && (
        <button
          onClick={() => setExpanded(true)}
          className="w-full mt-2 text-[10px] text-[#B0B0B0] hover:text-[#FFD700] transition-colors"
        >
          +{brokers.length - 3} more accounts
        </button>
      )}
    </motion.div>
  );
}
