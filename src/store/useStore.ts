import { create } from 'zustand';

interface AppState {
  activeTab: string;
  selectedSymbol: string;
  orderModalOpen: boolean;
  orderSide: 'buy' | 'sell';
  paperTrading: boolean;
  layout: string;
  setActiveTab: (tab: string) => void;
  setSelectedSymbol: (symbol: string) => void;
  setOrderModalOpen: (open: boolean) => void;
  setOrderSide: (side: 'buy' | 'sell') => void;
  setPaperTrading: (mode: boolean) => void;
  setLayout: (layout: string) => void;
}

export const useStore = create<AppState>((set) => ({
  activeTab: 'dashboard',
  selectedSymbol: 'NVDA',
  orderModalOpen: false,
  orderSide: 'buy',
  paperTrading: true,
  layout: 'default',
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedSymbol: (symbol) => set({ selectedSymbol: symbol }),
  setOrderModalOpen: (open) => set({ orderModalOpen: open }),
  setOrderSide: (side) => set({ orderSide: side }),
  setPaperTrading: (mode) => set({ paperTrading: mode }),
  setLayout: (layout) => set({ layout }),
}));
