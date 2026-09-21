import { Sun, Moon } from 'lucide-react';
import { useBlogTheme } from '../contexts/BlogThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme, isBlogSection } = useBlogTheme();

  if (!isBlogSection) return null;

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`
        relative flex items-center justify-center
        w-9 h-9 rounded-full
        transition-all duration-300 ease-in-out
        border shadow-sm cursor-pointer outline-none focus:outline-none
        ${isDark
          ? 'bg-[#131F37] border-slate-700 text-[#52B5BD] hover:bg-[#1C2C4E] hover:border-[#52B5BD]'
          : 'bg-white border-slate-200 text-[#0F172A] hover:bg-slate-50 hover:border-[#52B5BD]'
        }
        ${className}
      `}
      title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun size={17} className="transition-transform duration-300 transform rotate-0 scale-100 text-[#52B5BD]" />
        ) : (
          <Moon size={17} className="transition-transform duration-300 transform rotate-0 scale-100 text-[#0F172A]" />
        )}
      </div>
    </button>
  );
}
