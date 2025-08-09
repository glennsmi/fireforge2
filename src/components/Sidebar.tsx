import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart3, LayoutGrid, Database, Building2, User, Menu, ChevronRight, ChevronLeft } from 'lucide-react';

type SidebarProps = { onOpenMobile: () => void };

export default function Sidebar({ onOpenMobile }: SidebarProps) {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try { return JSON.parse(localStorage.getItem('ff.sidebar.collapsed') || 'false'); } catch { return false; }
  });

  useEffect(() => {
    localStorage.setItem('ff.sidebar.collapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  const navItems = [
    { to: '/', label: 'Home', icon: <Home size={18} /> },
    { to: '/charts', label: 'Charts', icon: <BarChart3 size={18} /> },
    { to: '/dashboards', label: 'Dashboards', icon: <LayoutGrid size={18} /> },
    { to: '/sources', label: 'Data Sources', icon: <Database size={18} /> },
    { to: '/organization', label: 'Organization', icon: <Building2 size={18} /> },
    { to: '/profile', label: 'Profile', icon: <User size={18} /> },
  ];

  return (
    <aside className={`hidden md:flex flex-col border-r ${collapsed ? 'w-16' : 'w-60'} transition-[width] duration-200 bg-[rgb(var(--bg))]` }>
      <div className="h-14 border-b flex items-center px-3 gap-2">
        <button className="md:hidden" onClick={onOpenMobile}><Menu /></button>
        {!collapsed && (
          <>
            <img src="/logo/fireforge-logo.svg" className="h-6 dark:hidden" />
            <img src="/logo/fireforge-logo-dark.svg" className="h-6 hidden dark:block" />
          </>
        )}
        {collapsed && (
          <img src="/logo/favicon.svg" className="h-5 mx-auto" />
        )}
        {!collapsed && (
          <div className="ml-auto">
            <button className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5" onClick={() => setCollapsed(true)}>
              <ChevronLeft size={16} />
            </button>
          </div>
        )}
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `group relative flex items-center gap-3 px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/5 ${isActive ? 'bg-black/5 dark:bg-white/5 font-medium' : ''}`}
          >
            <span className="shrink-0">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
            {collapsed && (
              <span className="pointer-events-none absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-black/80 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>
      {collapsed && (
        <div className="p-2 border-t">
          <button className="w-full p-2 rounded hover:bg-black/5 dark:hover:bg-white/5" onClick={() => setCollapsed(false)}>
            <ChevronRight size={16} className="mx-auto" />
          </button>
        </div>
      )}
    </aside>
  );
}


