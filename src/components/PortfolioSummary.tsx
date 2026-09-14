import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Wallet, Shield, BarChart3 } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const miniChartData = [
  { v: 248000 }, { v: 249200 }, { v: 248800 }, { v: 250100 }, { v: 251400 },
  { v: 250800 }, { v: 252200 }, { v: 253100 }, { v: 252600 }, { v: 253800 },
  { v: 254200 }, { v: 253500 }, { v: 254800 }, { v: 255200 }, { v: 253800 },
];

export default function PortfolioSummary() {
  const portfolioValue = 253847.75;
  const dayPnL = 3991.25;
  const dayPnLPercent = 1.60;
  const totalPnL = 53847.75;
  const totalPnLPercent = 26.92;
  const buyingPower = 84520.00;
  const cashBalance = 42260.00;
  const marginUsed = 169327.75;
  const marginPercent = 66.7;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-4 relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#B0B0B0] uppercase tracking-wider">Portfolio Value</span>
          <DollarSign size={14} className="text-[#D4AF37]" />
        </div>
        <div className="text-2xl font-bold text-white">${portfolioValue.toLocaleString()}</div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-sm font-medium ${dayPnL >= 0 ? 'profit-text' : 'loss-text'}`}>
            {dayPnL >= 0 ? '+' : ''}${dayPnL.toLocaleString()}
          </span>
          <span className={`text-xs px-1.5 py-0.5 rounded ${dayPnL >= 0 ? 'profit-bg profit-text' : 'loss-bg loss-text'}`}>
            {dayPnL >= 0 ? '+' : ''}{dayPnLPercent}%
          </span>
        </div>
        <div className="absolute bottom-0 right-0 w-24 h-12 opacity-30">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={miniChartData}>
              <Area type="monotone" dataKey="v" stroke="#FFD700" fill="url(#goldGrad)" strokeWidth={1.5} />
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFD700" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#FFD700" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-4"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#B0B0B0] uppercase tracking-wider">Total P&L</span>
          {totalPnL >= 0 ? <TrendingUp size={14} className="text-[#00FF88]" /> : <TrendingDown size={14} className="text-[#FF3333]" />}
        </div>
        <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'profit-text' : 'loss-text'}`}>
          +${totalPnL.toLocaleString()}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-[#B0B0B0]">All time</span>
          <span className="text-xs px-1.5 py-0.5 rounded profit-bg profit-text">+{totalPnLPercent}%</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-4"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#B0B0B0] uppercase tracking-wider">Buying Power</span>
          <Wallet size={14} className="text-[#D4AF37]" />
        </div>
        <div className="text-2xl font-bold text-white">${buyingPower.toLocaleString()}</div>
        <div className="mt-2">
          <div className="flex justify-between text-xs text-[#B0B0B0] mb-1">
            <span>Cash: ${cashBalance.toLocaleString()}</span>
            <span>Margin: {marginPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
            <div
              className="h-full gold-gradient rounded-full transition-all duration-500"
              style={{ width: `${marginPercent}%` }}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-4"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#B0B0B0] uppercase tracking-wider">Risk Metrics</span>
          <Shield size={14} className="text-[#D4AF37]" />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div>
            <div className="text-xs text-[#B0B0B0]">Daily Loss</div>
            <div className="text-sm font-bold text-white">$1,245</div>
            <div className="text-xs text-[#FFC107]">of $5,000 limit</div>
          </div>
          <div>
            <div className="text-xs text-[#B0B0B0]">Exposure</div>
            <div className="text-sm font-bold text-white">
              <BarChart3 size={12} className="inline mr-1" />67%
            </div>
            <div className="text-xs text-[#00FF88]">Moderate</div>
          </div>
        </div>
        <div className="mt-2 w-full h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
          <div className="h-full bg-[#FFC107] rounded-full" style={{ width: '25%' }} />
        </div>
      </motion.div>
    </div>
  );
}
