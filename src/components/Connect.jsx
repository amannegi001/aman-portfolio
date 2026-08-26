import React, { useState } from 'react';
import { Mail, Github, Linkedin, ExternalLink, Copy, Check, ArrowUpRight } from 'lucide-react';
import { personalData, socialLinks } from '../data/portfolioData';
import { motion } from 'framer-motion';

export const Connect = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getSocialIcon = (name) => {
    switch (name) {
      case 'GitHub':
        return <Github size={20} />;
      case 'LinkedIn':
        return <Linkedin size={20} />;
      case 'LeetCode':
        return <span className="font-mono font-bold text-xs">[LC]</span>;
      case 'X':
        return <span className="font-mono font-bold text-xs">𝕏</span>;
      case 'Instagram':
        return <span className="font-mono text-xs">IG</span>;
      default:
        return <ExternalLink size={18} />;
    }
  };

  const primaryLinks = socialLinks.filter((s) => s.featured);
  const secondaryLinks = socialLinks.filter((s) => !s.featured);

  return (
    <section id="connect" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background cyan glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-cyan/5 dark:bg-cyan/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-8 sm:p-12 md:p-16 bg-white/90 dark:bg-navy-900/80 border border-slate-200 dark:border-white/15 shadow-2xl relative overflow-hidden backdrop-blur-xl"
        >
          <div className="max-w-3xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 text-cyan-muted dark:text-cyan text-xs font-mono font-semibold mb-6 border border-cyan/20">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              Direct Communication & Collaboration
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.15] mb-6">
              Have an engineering challenge or role worth discussing?
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
              I am actively seeking full-time Software Development Engineer and Full-Stack Developer opportunities. Let's connect to discuss how I can contribute to your engineering team.
            </p>

            {/* Email Actions */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12">
              <a
                href={`mailto:${personalData.email}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-cyan text-navy-950 font-bold text-sm hover:bg-cyan-hover shadow-lg shadow-cyan/20 hover:shadow-glow-cyan transition-all duration-200"
              >
                <Mail size={18} />
                <span>Send Email</span>
                <ArrowUpRight size={16} />
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 dark:bg-navy-800 text-slate-800 dark:text-slate-200 font-medium text-sm border border-slate-200 dark:border-white/10 hover:border-cyan/40 hover:text-cyan-muted dark:hover:text-cyan transition-all"
              >
                {copied ? <Check size={16} className="text-cyan-muted dark:text-cyan" /> : <Copy size={16} />}
                <span>{copied ? 'Copied to Clipboard' : personalData.email}</span>
              </button>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="pt-10 border-t border-slate-200 dark:border-white/10">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
              Elsewhere / Engineering Profiles
            </h3>

            {/* Primary Profiles (GitHub, LinkedIn, LeetCode) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {primaryLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200 dark:border-white/5 hover:border-cyan/40 group transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-xl bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 group-hover:text-cyan-muted dark:group-hover:text-cyan transition-colors">
                      {getSocialIcon(link.name)}
                    </div>
                    <ArrowUpRight size={16} className="text-slate-400 group-hover:text-cyan-muted dark:group-hover:text-cyan transition-colors" />
                  </div>
                  <div className="font-semibold text-sm text-slate-900 dark:text-slate-200">
                    {link.name}
                  </div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate">
                    {link.handle}
                  </div>
                </a>
              ))}
            </div>

            {/* Secondary Profiles (X, Instagram) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Other channels:</span>
              {secondaryLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-navy-950/40 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 text-xs border border-slate-200 dark:border-white/5 transition-colors"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight size={12} className="opacity-60" />
                </a>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
