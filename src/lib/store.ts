import { create } from 'zustand';

export interface DashboardStore {
  selectedPeriod: 'today' | '7days' | '30days' | '90days' | 'ytd' | 'custom';
  customStartDate: string | null;
  customEndDate: string | null;
  activePage: string;
  sidebarOpen: boolean;
  setPeriod: (period: DashboardStore['selectedPeriod']) => void;
  setCustomDateRange: (startDate: string, endDate: string) => void;
  setActivePage: (page: string) => void;
  toggleSidebar: () => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  selectedPeriod: '30days',
  customStartDate: null,
  customEndDate: null,
  activePage: 'overview',
  sidebarOpen: true,
  setPeriod: (period) => set({ selectedPeriod: period, customStartDate: null, customEndDate: null }),
  setCustomDateRange: (startDate, endDate) => set({ 
    selectedPeriod: 'custom', 
    customStartDate: startDate, 
    customEndDate: endDate 
  }),
  setActivePage: (page) => set({ activePage: page }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
