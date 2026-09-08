import { create } from 'zustand';
import type { NavKey, ProductCategorySlug } from '@/src/types';

export interface DashboardStore {
  activeNav: NavKey;
  sidebarOpen: boolean;
  catalogFilter: ProductCategorySlug | 'all';
  setActiveNav: (nav: NavKey) => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  setCatalogFilter: (filter: ProductCategorySlug | 'all') => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  activeNav: 'dashboard',
  sidebarOpen: false,
  catalogFilter: 'all',
  setActiveNav: (nav) => set({ activeNav: nav, sidebarOpen: false }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  closeSidebar: () => set({ sidebarOpen: false }),
  setCatalogFilter: (filter) => set({ catalogFilter: filter }),
}));
