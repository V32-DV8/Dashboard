import { motion } from 'framer-motion';
import { TrendingUp, Bell, Settings, User, Search, Wifi } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Header() {
  const { paperTrading, setPaperTrading, setActiveTab, activeTab } = useStore();

  const tabs = ['Dashboard', 'Charts', 'Orders', 'Analytics', 'Scanner', 'Settings'];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-card border-b border-[#D4AF37]/20 px-4 py-2 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 gold-gradient rounded-lg flex items-center justify-center">
            <TrendingUp size={18} className="text-black" />
          </div>
          <span className="text-lg font-bold gold-text">ProTrade</span>
        </div>

        <nav className="hidden md:flex items-center gap-1 ml-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${
                activeTab === tab.toLowerCase()
                  ? 'gold-gradient text-black'
                  : 'text-[#B0B0B0] hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 bg-[#1a1a1a] rounded-lg px-3 py-1.5 border border-[#2a2a2a]">
          <Search size={14} className="text-[#B0B0B0]" />
          <input
            type="text"
            placeholder="Search symbols..."
            className="bg-transparent text-sm text-white placeholder-[#B0B0B0] outline-none w-40"
          />
        </div>

        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#1a1a1a] border border-[#2a2a2a]">
          <Wifi size={12} className="text-[#00FF88]" />
          <span className="text-xs text-[#00FF88]">LIVE</span>
        </div>

        <button
          onClick={() => setPaperTrading(!paperTrading)}
          className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-300 ${
            paperTrading
              ? 'bg-[#FFC107]/20 text-[#FFC107] border border-[#FFC107]/40'
              : 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/40'
          }`}
        >
          {paperTrading ? 'PAPER' : 'LIVE'}
        </button>

        <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
          <Bell size={18} className="text-[#B0B0B0]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF3333] rounded-full"></span>
        </button>

        <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
          <Settings size={18} className="text-[#B0B0B0]" />
        </button>

        <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center">
          <User size={14} className="text-black" />
        </div>
      </div>
    </motion.header>
  );
}
