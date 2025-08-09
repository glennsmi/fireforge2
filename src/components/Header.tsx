import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';

type HeaderProps = { onOpenSidebar: () => void };

export default function Header({ onOpenSidebar }: HeaderProps) {
  const toggleDark = () => {
    const el = document.documentElement;
    el.classList.toggle('dark');
    localStorage.setItem('ff.theme.dark', String(el.classList.contains('dark')));
  };

  React.useEffect(() => {
    const saved = localStorage.getItem('ff.theme.dark');
    if (saved === 'true') document.documentElement.classList.add('dark');
  }, []);

  return (
    <header className="h-14 border-b flex items-center px-3 gap-2 sticky top-0 bg-[rgb(var(--bg))]/80 backdrop-blur z-10">
      <button className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onOpenSidebar}>
        <Menu />
      </button>
      <div className="ml-auto flex items-center gap-2">
        <button aria-label="Toggle theme" className="p-2 rounded hover:bg-black/5 dark:hover:bg-white/5" onClick={toggleDark}>
          <Sun className="dark:hidden" />
          <Moon className="hidden dark:block" />
        </button>
      </div>
    </header>
  );
}


