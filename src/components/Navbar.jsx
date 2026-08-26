import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useActiveSection } from '../hooks/useActiveSection';
import { personalData } from '../data/portfolioData';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Certifications', href: '#certifications', id: 'certifications' },
    { name: 'Connect', href: '#connect', id: 'connect' },
  ];

  const sectionIds = ['hero', ...navLinks.map((l) => l.id)];
  const activeSection = useActiveSection(sectionIds, 150);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const topOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 lg:px-8 pt-4 pb-2 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        <nav
          className={`flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl transition-all duration-300 ${
            isScrolled
              ? 'bg-white/85 dark:bg-navy-900/80 border-slate-200 dark:border-white/10 shadow-lg backdrop-blur-xl'
              : 'bg-white/60 dark:bg-navy-900/40 border-slate-200/60 dark:border-white/5 backdrop-blur-md'
          } border`}
          aria-label="Main Navigation"
        >
          {/* Logo / Brand */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-cyan/50 rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-white/10 flex items-center justify-center text-cyan-muted dark:text-cyan font-bold text-sm tracking-wider group-hover:border-cyan/50 transition-colors">
              AN
            </div>
            <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm tracking-tight hidden sm:inline">
              Aman Singh Negi
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3.5 py-1.5 rounded-xl text-xs lg:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-cyan-muted dark:text-cyan font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-xl bg-cyan/10 border border-cyan/30 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Download Resume Button */}
            <a
              href={personalData.resumePath}
              download="Aman_Singh_Negi_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-cyan text-navy-950 hover:bg-cyan-hover shadow-sm hover:shadow-glow-cyan-sm transition-all duration-200"
            >
              <FileText size={14} />
              <span>Resume</span>
              <ArrowUpRight size={13} className="opacity-75" />
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-cyan-muted dark:hover:text-cyan focus:outline-none"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 p-5 rounded-2xl bg-white/95 dark:bg-navy-900/95 border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-cyan/15 text-cyan-muted dark:text-cyan border border-cyan/30'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}

              <div className="pt-3 mt-2 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
                <a
                  href={personalData.resumePath}
                  download="Aman_Singh_Negi_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold rounded-xl bg-cyan text-navy-950 hover:bg-cyan-hover transition-all"
                >
                  <FileText size={16} />
                  <span>Download Resume (PDF)</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
