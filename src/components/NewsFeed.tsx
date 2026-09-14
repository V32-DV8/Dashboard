import { motion } from 'framer-motion';
import { Newspaper, TrendingUp, TrendingDown, Minus, ExternalLink } from 'lucide-react';
import { newsItems } from '../data/mockData';

export default function NewsFeed() {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return <TrendingUp size={12} className="text-[#00FF88]" />;
      case 'bearish': return <TrendingDown size={12} className="text-[#FF3333]" />;
      default: return <Minus size={12} className="text-[#B0B0B0]" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'border-l-[#00FF88]';
      case 'bearish': return 'border-l-[#FF3333]';
      default: return 'border-l-[#B0B0B0]';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-card p-4 flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Newspaper size={14} className="text-[#FFD700]" />
          News & Catalysts
        </h3>
        <span className="text-[10px] text-[#00FF88] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse"></span>
          Live
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 max-h-[400px]">
        {newsItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-2.5 rounded-md bg-[#111111] border-l-2 ${getSentimentColor(item.sentiment)} hover:bg-[#1a1a1a] transition-colors cursor-pointer group`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="text-xs text-white font-medium leading-tight group-hover:text-[#FFD700] transition-colors">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] text-[#B0B0B0]">{item.source}</span>
                  <span className="text-[10px] text-[#B0B0B0]">•</span>
                  <span className="text-[10px] text-[#B0B0B0]">{item.time}</span>
                  <span className="text-[10px] text-[#B0B0B0]">•</span>
                  <span className="text-[10px] px-1 py-0.5 rounded bg-[#2a2a2a] text-[#B0B0B0]">{item.category}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                {getSentimentIcon(item.sentiment)}
                <ExternalLink size={10} className="text-[#B0B0B0] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1.5">
              {item.symbols.map((sym) => (
                <span key={sym} className="text-[10px] px-1.5 py-0.5 rounded bg-[#D4AF37]/10 text-[#FFD700] font-medium">
                  ${sym}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
