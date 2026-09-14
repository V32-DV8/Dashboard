import { watchlist } from '../data/mockData';

export default function Ticker() {
  const items = [...watchlist, ...watchlist]; // Duplicate for seamless scroll

  return (
    <div className="glass-card border-b border-[#D4AF37]/10 py-1.5 overflow-hidden">
      <div className="animate-ticker flex items-center gap-6 whitespace-nowrap">
        {items.map((item, i) => (
          <div key={`${item.symbol}-${i}`} className="flex items-center gap-2 text-xs">
            <span className="font-bold text-white">{item.symbol}</span>
            <span className="text-white">${item.price.toFixed(2)}</span>
            <span className={`font-medium ${item.changePercent >= 0 ? 'profit-text' : 'loss-text'}`}>
              {item.changePercent >= 0 ? '▲' : '▼'} {Math.abs(item.changePercent).toFixed(2)}%
            </span>
            <span className="text-[#2a2a2a]">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
