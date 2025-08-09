import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

export default function Shell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50 flex">
      <Sidebar onOpenMobile={() => setMobileOpen(true)} />
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-20 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute left-0 top-0 bottom-0 w-56 bg-white dark:bg-gray-900 p-2">{/* simple mobile menu */}
            <button className="mb-2 text-sm" onClick={() => setMobileOpen(false)}>Close</button>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onOpenSidebar={() => setMobileOpen(true)} />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


