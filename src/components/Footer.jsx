import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalData } from '../data/portfolioData';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left Info */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-semibold text-slate-900 dark:text-slate-200">
            {personalData.name}
          </span>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-600">•</span>
          <span>Full-Stack Developer & SDE Candidate</span>
        </div>

        {/* Right Info & Back to Top */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan inline-block"></span>
            <span>2026</span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-navy-850 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-cyan-muted dark:hover:text-cyan hover:border-cyan/40 transition-all shadow-sm"
          >
            <ArrowUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
};
