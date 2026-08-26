import React from 'react';
import { ArrowDown, FileText, Sparkles, Send, Github, Linkedin, Code } from 'lucide-react';
import { personalData, socialLinks } from '../data/portfolioData';
import { motion } from 'framer-motion';

export const Hero = () => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background ambient radial cyan glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan/5 dark:bg-cyan/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-cyan/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Editorial Content (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-navy-800/80 border border-slate-200 dark:border-cyan/30 text-xs font-medium text-slate-700 dark:text-slate-300 mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
              </span>
              <span className="font-mono text-cyan-muted dark:text-cyan font-semibold tracking-wide">
                {personalData.status}
              </span>
            </div>

            {/* Main Name & Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.1] mb-4">
              Building scalable, end-to-end web architectures.
            </h1>

            {/* Role designation */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-cyan-muted dark:text-cyan text-sm sm:text-base font-medium tracking-wider uppercase">
                Aman Singh Negi
              </span>
              <span className="text-slate-400 dark:text-slate-500">•</span>
              <span className="text-slate-700 dark:text-slate-300 text-sm sm:text-base font-semibold">
                {personalData.role}
              </span>
            </div>

            {/* Concise Value Proposition */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mb-8">
              Specialized in engineering full-stack systems across React, Node.js, Express, and MongoDB.
              Focused on robust RESTful API design, secure authentication workflows, and modern high-performance interfaces.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <button
                onClick={() => scrollTo('projects')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan text-navy-950 font-semibold text-sm hover:bg-cyan-hover shadow-lg shadow-cyan/20 hover:shadow-glow-cyan transition-all duration-200"
              >
                <span>View Projects</span>
                <ArrowDown size={16} />
              </button>

              <a
                href={personalData.resumePath}
                download="Aman_Singh_Negi_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-navy-800/90 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-white/10 hover:border-cyan/40 hover:text-cyan-muted dark:hover:text-cyan transition-all duration-200 shadow-sm"
              >
                <FileText size={16} />
                <span>Download Resume</span>
              </a>

              <button
                onClick={() => scrollTo('connect')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 text-sm font-medium transition-colors"
              >
                <Send size={15} />
                <span>Let's Connect</span>
              </button>
            </div>

            {/* Quick Core Tech & Social Pill Bar */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-white/10 w-full">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Profiles:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/amannegi001"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="text-slate-500 dark:text-slate-400 hover:text-cyan-muted dark:hover:text-cyan transition-colors"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/aman-negi-08a166386/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="text-slate-500 dark:text-slate-400 hover:text-cyan-muted dark:hover:text-cyan transition-colors"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://leetcode.com/u/aman_negi_001/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode Profile"
                  className="text-slate-500 dark:text-slate-400 hover:text-cyan-muted dark:hover:text-cyan transition-colors font-mono text-xs font-bold"
                >
                  [LC]
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Profile Photo & Visual Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[360px] group">
              {/* Decorative cyan accent glow ring */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-br from-cyan/20 via-transparent to-cyan/5 dark:from-cyan/30 dark:via-transparent dark:to-cyan/10 opacity-70 blur-lg group-hover:opacity-100 transition duration-500" />

              {/* Main Card Container */}
              <div className="relative rounded-3xl overflow-hidden bg-white/90 dark:bg-navy-900/90 border border-slate-200 dark:border-white/15 shadow-2xl p-4 backdrop-blur-xl">
                
                {/* Photo Frame */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 dark:bg-navy-950 border border-slate-200 dark:border-white/10">
                  <img
                    src={personalData.profilePhoto}
                    alt="Aman Singh Negi — Full-Stack Developer"
                    className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-[0.98] transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />
                  {/* Subtle editorial gradient overlay at bottom of photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 dark:from-navy-950/90 via-transparent to-transparent pointer-events-none" />

                  {/* Minimal Floating badge on photo */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/90 dark:bg-navy-900/80 border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-sm">
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-200">
                      Aman Singh Negi
                    </p>
                    <p className="text-[11px] font-mono text-cyan-muted dark:text-cyan font-medium">
                      Full-Stack Engineer · Node / React
                    </p>
                  </div>
                </div>

                {/* Card Meta Stats Footer */}
                <div className="grid grid-cols-2 gap-2 mt-3 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-850/80 border border-slate-200 dark:border-white/5">
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      Core Stack
                    </span>
                    <span className="text-xs font-semibold font-mono text-slate-900 dark:text-slate-200">
                      MERN & C++
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-850/80 border border-slate-200 dark:border-white/5">
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      Location / Mode
                    </span>
                    <span className="text-xs font-semibold text-cyan-muted dark:text-cyan">
                      Remote & Relocatable
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
