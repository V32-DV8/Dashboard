import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { TrendingUp, Award, Target, Clock } from 'lucide-react';
import { equityCurveData, sectorAllocation, performanceStats } from '../data/mockData';

const hourlyData = [
  { hour: '9:30', trades: 12, pnl: 450 },
  { hour: '10:00', trades: 18, pnl: 820 },
  { hour: '10:30', trades: 15, pnl: 340 },
  { hour: '11:00', trades: 8, pnl: -120 },
  { hour: '11:30', trades: 5, pnl: -280 },
  { hour: '12:00', trades: 3, pnl: -150 },
  { hour: '12:30', trades: 6, pnl: 220 },
  { hour: '13:00', trades: 10, pnl: 580 },
  { hour: '13:30', trades: 14, pnl: 920 },
  { hour: '14:00', trades: 11, pnl: 410 },
  { hour: '14:30', trades: 9, pnl: 280 },
  { hour: '15:00', trades: 16, pnl: 1100 },
  { hour: '15:30', trades: 20, pnl: 1450 },
  { hour: '16:00', trades: 8, pnl: 380 },
];

export default function Analytics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Award size={14} className="text-[#FFD700]" />
          Performance Analytics
        </h3>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="bg-[#111111] rounded-lg p-2.5 border border-[#2a2a2a]">
          <div className="text-[10px] text-[#B0B0B0] mb-0.5">Win Rate</div>
          <div className="text-lg font-bold text-[#00FF88]">{performanceStats.winRate}%</div>
        </div>
        <div className="bg-[#111111] rounded-lg p-2.5 border border-[#2a2a2a]">
          <div className="text-[10px] text-[#B0B0B0] mb-0.5">Profit Factor</div>
          <div className="text-lg font-bold text-[#FFD700]">{performanceStats.profitFactor}</div>
        </div>
        <div className="bg-[#111111] rounded-lg p-2.5 border border-[#2a2a2a]">
          <div className="text-[10px] text-[#B0B0B0] mb-0.5">Sharpe Ratio</div>
          <div className="text-lg font-bold text-[#FFD700]">{performanceStats.sharpeRatio}</div>
        </div>
        <div className="bg-[#111111] rounded-lg p-2.5 border border-[#2a2a2a]">
          <div className="text-[10px] text-[#B0B0B0] mb-0.5">Max Drawdown</div>
          <div className="text-lg font-bold text-[#FF3333]">{performanceStats.maxDrawdown}%</div>
        </div>
      </div>

      {/* Equity Curve */}
      <div className="mb-4">
        <div className="text-xs text-[#B0B0B0] mb-2 font-medium">Equity Curve vs SPY</div>
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={equityCurveData}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#B0B0B0', fontSize: 9 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#B0B0B0', fontSize: 9 }} orientation="right" />
              <Tooltip
                contentStyle={{ background: '#1a1a1a', border: '1px solid #D4AF37', borderRadius: '6px', fontSize: '10px' }}
                labelStyle={{ color: '#FFD700' }}
              />
              <Line type="monotone" dataKey="value" stroke="#FFD700" strokeWidth={2} dot={false} name="Portfolio" />
              <Line type="monotone" dataKey="spy" stroke="#B0B0B0" strokeWidth={1} dot={false} strokeDasharray="4 4" name="SPY" />
              <Legend wrapperStyle={{ fontSize: '10px', color: '#B0B0B0' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Trading Hours Heatmap */}
        <div>
          <div className="text-xs text-[#B0B0B0] mb-2 font-medium flex items-center gap-1">
            <Clock size={10} /> P&L by Hour
          </div>
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: '#B0B0B0', fontSize: 8 }} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: '#1a1a1a', border: '1px solid #D4AF37', borderRadius: '6px', fontSize: '10px' }}
                />
                <Bar dataKey="pnl" radius={[2, 2, 0, 0]}>
                  {hourlyData.map((entry, index) => (
                    <Cell key={index} fill={entry.pnl >= 0 ? '#00FF88' : '#FF3333'} fillOpacity={0.7} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Allocation */}
        <div>
          <div className="text-xs text-[#B0B0B0] mb-2 font-medium flex items-center gap-1">
            <Target size={10} /> Sector Allocation
          </div>
          <div className="h-[120px] flex items-center">
            <div className="w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    dataKey="value"
                    stroke="none"
                  >
                    {sectorAllocation.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-1">
              {sectorAllocation.map((sector) => (
                <div key={sector.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: sector.color }} />
                  <span className="text-[9px] text-[#B0B0B0] flex-1">{sector.name}</span>
                  <span className="text-[9px] text-white font-medium">{sector.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 pt-3 border-t border-[#2a2a2a]">
        <div className="text-center">
          <div className="text-[10px] text-[#B0B0B0]">Total Trades</div>
          <div className="text-sm font-bold text-white">{performanceStats.totalTrades}</div>
        </div>
        <div className="text-center">
          <div className="text-[10px] text-[#B0B0B0]">Avg Win</div>
          <div className="text-sm font-bold profit-text">${performanceStats.avgWin}</div>
        </div>
        <div className="text-center">
          <div className="text-[10px] text-[#B0B0B0]">Avg Loss</div>
          <div className="text-sm font-bold loss-text">${Math.abs(performanceStats.avgLoss)}</div>
        </div>
        <div className="text-center">
          <div className="text-[10px] text-[#B0B0B0]">Avg Hold</div>
          <div className="text-sm font-bold text-white">{performanceStats.avgHoldTime}</div>
        </div>
      </div>
    </motion.div>
  );
}
