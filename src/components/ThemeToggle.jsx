import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative p-2.5 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan/50 ${
        isDark
          ? 'bg-navy-850 border-white/10 text-slate-300 hover:text-cyan hover:border-cyan/40'
          : 'bg-white border-slate-200 text-slate-700 hover:text-cyan-muted hover:border-cyan/40 shadow-sm'
      } ${className}`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun size={17} className="text-cyan" />
        ) : (
          <Moon size={17} className="text-slate-800" />
        )}
      </motion.div>
    </button>
  );
};
