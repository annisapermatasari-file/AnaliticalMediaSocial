'use client';

import { useState } from 'react';
import Sidebar from '@/src/components/layout/Sidebar';
import Header from '@/src/components/layout/Header';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-light-gray">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-navy mb-2">Overview Dashboard</h1>
            <p className="text-navy-lighter mb-6">Monitoring, Analisis, dan Evaluasi Komunikasi Digital</p>
            
            {/* Content will be loaded here */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-navy-lighter">Loading dashboard...</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
