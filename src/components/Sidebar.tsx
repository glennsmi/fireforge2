import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart3, LayoutGrid, Database, Building2, User, Menu } from 'lucide-react';

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
    <aside className={`hidden md:flex flex-col border-r ${collapsed ? 'w-16' : 'w-56'} transition-all` }>
      <div className="h-14 border-b flex items-center px-3 gap-2">
        <button className="md:hidden" onClick={onOpenMobile}><Menu /></button>
        <div className="font-bold text-orange-600">FireForge</div>
        <div className="ml-auto">
          <button className="text-sm px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setCollapsed(!collapsed)}>{collapsed ? '»' : '«'}</button>
        </div>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive ? 'bg-gray-100 dark:bg-gray-800 font-medium' : ''}`}
          >
            <span className="shrink-0">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}


