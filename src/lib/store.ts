import { create } from 'zustand';
import type { NavKey, ProductCategorySlug } from '@/src/types';

export interface DashboardStore {
  activeNav: NavKey;
  sidebarOpen: boolean;
  catalogFilter: ProductCategorySlug | 'all';
  searchQuery: string;
  toast: string | null;
  videoModalUrl: string | null;
  videoModalTitle: string | null;
  profileOpen: boolean;
  setActiveNav: (nav: NavKey) => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  setCatalogFilter: (filter: ProductCategorySlug | 'all') => void;
  setSearchQuery: (query: string) => void;
  showToast: (message: string) => void;
  clearToast: () => void;
  openVideo: (url: string, title: string) => void;
  closeVideo: () => void;
  openProfile: () => void;
  closeProfile: () => void;
}

let toastTimer: ReturnType<typeof setTimeout> | null = null;

export const useDashboardStore = create<DashboardStore>((set) => ({
  activeNav: 'dashboard',
  sidebarOpen: false,
  catalogFilter: 'all',
  searchQuery: '',
  toast: null,
  videoModalUrl: null,
  videoModalTitle: null,
  profileOpen: false,
  setActiveNav: (nav) => set({ activeNav: nav, sidebarOpen: false }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  closeSidebar: () => set({ sidebarOpen: false }),
  setCatalogFilter: (filter) => set({ catalogFilter: filter }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  showToast: (message) => {
    if (toastTimer) clearTimeout(toastTimer);
    set({ toast: message });
    toastTimer = setTimeout(() => set({ toast: null }), 3000);
  },
  clearToast: () => set({ toast: null }),
  openVideo: (url, title) => set({ videoModalUrl: url, videoModalTitle: title }),
  closeVideo: () => set({ videoModalUrl: null, videoModalTitle: null }),
  openProfile: () => set({ profileOpen: true }),
  closeProfile: () => set({ profileOpen: false }),
}));
