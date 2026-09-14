import { motion } from 'framer-motion';
import { Shield, AlertCircle, TrendingDown } from 'lucide-react';

export default function RiskMetrics() {
  const dailyLoss = 1245;
  const dailyLossLimit = 5000;
  const dailyLossPercent = (dailyLoss / dailyLossLimit) * 100;

  const metrics = [
    { label: 'Portfolio Beta', value: '1.24', status: 'moderate' },
    { label: 'Max Position Size', value: '18.2%', status: 'warning' },
    { label: 'Correlation Risk', value: '0.72', status: 'high' },
    { label: 'Margin Usage', value: '66.7%', status: 'moderate' },
    { label: 'Long/Short Ratio', value: '85/15', status: 'low' },
    { label: 'Volatility (VIX)', value: '18.4', status: 'low' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high': return 'text-[#FF3333]';
      case 'warning': return 'text-[#FFC107]';
      case 'moderate': return 'text-[#FFD700]';
      default: return 'text-[#00FF88]';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-card p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Shield size={14} className="text-[#FFD700]" />
          Risk Management
        </h3>
      </div>

      {/* Daily Loss Limit */}
      <div className="mb-4 p-3 bg-[#111111] rounded-lg border border-[#2a2a2a]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#B0B0B0]">Daily Loss Limit</span>
          <span className="text-xs text-white font-medium">${dailyLoss.toLocaleString()} / ${dailyLossLimit.toLocaleString()}</span>
        </div>
        <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              dailyLossPercent > 75 ? 'bg-[#FF3333]' : dailyLossPercent > 50 ? 'bg-[#FFC107]' : 'bg-[#00FF88]'
            }`}
            style={{ width: `${dailyLossPercent}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-[#B0B0B0]">{dailyLossPercent.toFixed(0)}% used</span>
          <span className="text-[10px] text-[#B0B0B0]">${(dailyLossLimit - dailyLoss).toLocaleString()} remaining</span>
        </div>
      </div>

      {/* Risk Metrics Grid */}
      <div className="grid grid-cols-2 gap-2">
        {metrics.map((metric) => (
          <div key={metric.label} className="p-2 bg-[#111111] rounded-lg border border-[#2a2a2a]">
            <div className="text-[10px] text-[#B0B0B0] mb-0.5">{metric.label}</div>
            <div className={`text-sm font-bold ${getStatusColor(metric.status)}`}>{metric.value}</div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <div className="mt-3 pt-3 border-t border-[#2a2a2a]">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle size={12} className="text-[#FFC107]" />
          <span className="text-xs text-[#FFC107] font-medium">Active Alerts</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 p-1.5 rounded bg-[#FFC107]/5 border border-[#FFC107]/20">
            <TrendingDown size={10} className="text-[#FFC107]" />
            <span className="text-[10px] text-[#FFC107]">NVDA approaching stop loss ($860)</span>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded bg-[#FF3333]/5 border border-[#FF3333]/20">
            <AlertCircle size={10} className="text-[#FF3333]" />
            <span className="text-[10px] text-[#FF3333]">High correlation in tech positions</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
