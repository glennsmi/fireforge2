import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, BarChart3, LayoutGrid, Database, Building2, User, Menu, ChevronRight, ChevronsLeft, Moon, Sun, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type SidebarProps = { onOpenMobile: () => void };

export default function Sidebar({ onOpenMobile }: SidebarProps) {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try { return JSON.parse(localStorage.getItem('ff.sidebar.collapsed') || 'false'); } catch { return false; }
  });
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    localStorage.setItem('ff.sidebar.collapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/charts', label: 'Charts', icon: BarChart3 },
    { to: '/dashboards', label: 'Dashboards', icon: LayoutGrid },
    { to: '/sources', label: 'Data Sources', icon: Database },
    { to: '/organization', label: 'Organization', icon: Building2 },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className={`hidden md:flex flex-col ${collapsed ? 'w-[70px]' : 'w-[180px]'} transition-[width] duration-200 bg-[#222327] text-white`}>
      <div className="h-14 flex items-center px-4 gap-2">
        <button className="md:hidden" onClick={onOpenMobile}><Menu /></button>
        {!collapsed && (
          <img src="/logo/fireforge-logo-dark.svg" className="h-7" alt="FireForge" />
        )}
        {collapsed && (
          <img src="/logo/favicon.svg" className="h-6 mx-auto" alt="FF" />
        )}
      </div>
      
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => 
                `group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                ${isActive 
                  ? 'bg-orange-500 text-white' 
                  : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                }`
              }
            >
              <Icon size={20} className="shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              {collapsed && (
                <span className="pointer-events-none absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-gray-900 border border-gray-800 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 z-50">
                  {item.label}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
      
      <div className="p-3 space-y-2 border-t border-gray-800">

        {/* Collapse/Expand Button */}
        {collapsed ? (
          <button 
            className="w-full flex items-center justify-center p-2 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white transition-colors" 
            onClick={() => setCollapsed(false)}
          >
            <ChevronRight size={20} />
          </button>
        ) : (
          <button 
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white transition-colors" 
            onClick={() => setCollapsed(true)}
          >
            <ChevronsLeft size={20} />
            <span className="text-sm">Collapse</span>
          </button>
        )}

        

        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white transition-colors"
        >
          {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          {!collapsed && <span className="text-sm">Dark Mode</span>}
        </button>

        {/* User Profile Section */}
        <div className="border-b border-gray-800 pb-2 mb-2">
          <button
            onClick={() => navigate('/profile')}
            className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-900 transition-colors"
          >
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={user.displayName || user.email || ''} 
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-medium">
                {(user?.displayName || user?.email || '?')[0].toUpperCase()}
              </div>
            )}
            {!collapsed && (
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-white truncate">
                  {user?.displayName || user?.email?.split('@')[0] || 'User'}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {user?.email}
                </div>
              </div>
            )}
          </button>
        </div>

        {/* Sign Out Button */}
        <button 
          onClick={signOutUser}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          {!collapsed && <span className="text-sm">Sign Out</span>}
        </button>
        
        
      </div>
    </aside>
  );
}


