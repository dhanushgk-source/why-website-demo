import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BlogThemeContext = createContext();

const THEME_KEY = 'why_blog_theme';

export function BlogThemeProvider({ children }) {
  const location = useLocation();
  const pathname = location.pathname;

  // Check if current page is within Blog or Newsletter section
  const isBlogSection =
    pathname.startsWith('/blog') ||
    pathname.startsWith('/newsletter');

  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch {
      // localStorage disabled / unavailable
    }
    // Default to system preference if available, else 'dark'
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    return 'dark';
  });

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_KEY, newTheme);
    } catch {
      // ignore
    }
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  // Sync dataset attributes when in blog/newsletter section
  useEffect(() => {
    if (isBlogSection) {
      document.documentElement.setAttribute('data-blog-theme', theme);
    } else {
      document.documentElement.removeAttribute('data-blog-theme');
    }
  }, [isBlogSection, theme]);

  return (
    <BlogThemeContext.Provider
      value={{
        theme: isBlogSection ? theme : 'dark',
        effectiveTheme: theme,
        setTheme,
        toggleTheme,
        isBlogSection,
      }}
    >
      {children}
    </BlogThemeContext.Provider>
  );
}

export function useBlogTheme() {
  const context = useContext(BlogThemeContext);
  if (!context) {
    return {
      theme: 'dark',
      effectiveTheme: 'dark',
      setTheme: () => {},
      toggleTheme: () => {},
      isBlogSection: false,
    };
  }
  return context;
}
