import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router';
import { Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Shell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50 flex">
      <Sidebar onOpenMobile={() => setMobileOpen(true)} />
      {mobileOpen && (
        <div className="fixed inset-0 z-20 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-[rgb(var(--bg))] border-r p-3 space-y-2">
            <button className="text-sm px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/5" onClick={() => setMobileOpen(false)}>Close</button>
            <nav className="flex flex-col gap-1">
              {[
                { to: '/', label: 'Home' },
                { to: '/charts', label: 'Charts' },
                { to: '/dashboards', label: 'Dashboards' },
                { to: '/sources', label: 'Data Sources' },
                { to: '/organization', label: 'Organization' },
                { to: '/profile', label: 'Profile' },
              ].map(i => (
                <NavLink key={i.to} to={i.to} className={({isActive}) => `px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/5 ${isActive ? 'bg-black/5 dark:bg-white/5' : ''}`} onClick={() => setMobileOpen(false)}>
                  {i.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col min-w-0">
        <button className="md:hidden m-2 p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 w-10" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
          <Menu />
        </button>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


