import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { BarChart3, Maximize2, Settings } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart } from 'recharts';
import { generateCandlestickData } from '../data/mockData';
import { useStore } from '../store/useStore';

export default function ChartWidget() {
  const { selectedSymbol } = useStore();
  const [timeframe, setTimeframe] = useState('5m');
  const [chartType, setChartType] = useState('area');

  const data = useMemo(() => generateCandlestickData(), [selectedSymbol]);

  const timeframes = ['1m', '5m', '15m', '30m', '1H', '4H', '1D', '1W'];

  const currentPrice = data[data.length - 1]?.close || 0;
  const prevPrice = data[data.length - 2]?.close || 0;
  const priceChange = currentPrice - prevPrice;
  const priceChangePercent = (priceChange / prevPrice) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-4 flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-white">{selectedSymbol}</h3>
          <span className="text-lg font-medium text-white">${currentPrice.toFixed(2)}</span>
          <span className={`text-sm font-medium ${priceChange >= 0 ? 'profit-text' : 'loss-text'}`}>
            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded hover:bg-white/5 transition-colors">
            <BarChart3 size={14} className="text-[#B0B0B0]" />
          </button>
          <button className="p-1.5 rounded hover:bg-white/5 transition-colors">
            <Maximize2 size={14} className="text-[#B0B0B0]" />
          </button>
          <button className="p-1.5 rounded hover:bg-white/5 transition-colors">
            <Settings size={14} className="text-[#B0B0B0]" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-3">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-2 py-1 text-[10px] rounded transition-all ${
              timeframe === tf
                ? 'bg-[#D4AF37]/20 text-[#FFD700] border border-[#D4AF37]/40'
                : 'text-[#B0B0B0] hover:text-white hover:bg-white/5'
            }`}
          >
            {tf}
          </button>
        ))}
        <div className="ml-auto flex gap-1">
          <button
            onClick={() => setChartType('area')}
            className={`px-2 py-1 text-[10px] rounded ${chartType === 'area' ? 'bg-[#D4AF37]/20 text-[#FFD700]' : 'text-[#B0B0B0]'}`}
          >Area</button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-2 py-1 text-[10px] rounded ${chartType === 'bar' ? 'bg-[#D4AF37]/20 text-[#FFD700]' : 'text-[#B0B0B0]'}`}
          >Volume</button>
        </div>
      </div>

      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <defs>
              <linearGradient id="chartGold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFD700" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#FFD700" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#B0B0B0', fontSize: 10 }}
              interval={Math.floor(data.length / 6)}
            />
            <YAxis
              domain={['auto', 'auto']}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#B0B0B0', fontSize: 10 }}
              orientation="right"
            />
            <Tooltip
              contentStyle={{
                background: '#1a1a1a',
                border: '1px solid #D4AF37',
                borderRadius: '6px',
                fontSize: '11px',
              }}
              labelStyle={{ color: '#FFD700' }}
              itemStyle={{ color: '#FFFFFF' }}
            />
            <Area
              type="monotone"
              dataKey="close"
              stroke="#FFD700"
              fill="url(#chartGold)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#FFD700', stroke: '#000', strokeWidth: 2 }}
            />
            <Bar dataKey="volume" fill="rgba(212, 175, 55, 0.15)" yAxisId="right" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-4 mt-2 pt-2 border-t border-[#2a2a2a]">
        <div className="flex items-center gap-4 text-[10px] text-[#B0B0B0]">
          <span>O: <span className="text-white">{data[data.length - 1]?.open.toFixed(2)}</span></span>
          <span>H: <span className="text-white">{data[data.length - 1]?.high.toFixed(2)}</span></span>
          <span>L: <span className="text-white">{data[data.length - 1]?.low.toFixed(2)}</span></span>
          <span>C: <span className="text-white">{data[data.length - 1]?.close.toFixed(2)}</span></span>
          <span>Vol: <span className="text-white">{(data[data.length - 1]?.volume / 1000).toFixed(0)}K</span></span>
        </div>
        <div className="ml-auto flex items-center gap-2 text-[10px]">
          <span className="text-[#D4AF37]">EMA 9</span>
          <span className="text-[#FFC107]">EMA 20</span>
          <span className="text-[#B0B0B0]">VWAP</span>
        </div>
      </div>
    </motion.div>
  );
}
