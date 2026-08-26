import React, { useState, useRef } from 'react';
import { ArrowDown, FileText, Sparkles, Send, Github, Linkedin, Code, RotateCw, Mail, ArrowUpRight } from 'lucide-react';
import { personalData, socialLinks } from '../data/portfolioData';
import { motion } from 'framer-motion';

const WhatsAppIcon = ({ size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export const Hero = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [forceUnflipped, setForceUnflipped] = useState(false);
  const cardRef = useRef(null);

  const handleFlipBack = (e) => {
    if (e) e.stopPropagation();
    setIsFlipped(false);
    setForceUnflipped(true);
    if (document.activeElement && cardRef.current && cardRef.current.contains(document.activeElement)) {
      document.activeElement.blur();
    }
  };

  const handleMouseEnter = () => {
    setForceUnflipped(false);
  };

  const handleMouseLeave = () => {
    setForceUnflipped(false);
    setIsFlipped(false);
    if (document.activeElement && cardRef.current && cardRef.current.contains(document.activeElement)) {
      document.activeElement.blur();
    }
  };

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

          {/* Right Column: 3D Interactive Flip Profile Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div
              ref={cardRef}
              className={`relative w-full max-w-[360px] hero-flip-card group ${
                isFlipped ? 'is-flipped' : ''
              } ${forceUnflipped ? 'is-force-unflipped' : ''}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              role="region"
              aria-label="Interactive 3D Profile and Contact Card"
            >
              {/* Decorative cyan accent ambient glow behind card */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-br from-cyan/20 via-transparent to-cyan/5 dark:from-cyan/30 dark:via-transparent dark:to-cyan/10 opacity-70 blur-lg group-hover:opacity-100 transition duration-500" />

              {/* 3D Flip Inner Wrapper */}
              <div className="hero-flip-inner">

                {/* 1. FRONT FACE — Existing Profile & Photo */}
                <div className="hero-flip-front relative rounded-3xl overflow-hidden bg-white/90 dark:bg-navy-900/90 border border-slate-200 dark:border-white/15 shadow-2xl p-4 backdrop-blur-xl">
                  
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

                    {/* Flip Cue Badge (Top Right) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(true);
                      }}
                      className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/70 dark:bg-navy-950/80 border border-white/20 backdrop-blur-md text-[11px] font-mono text-cyan font-medium shadow-sm transition-transform active:scale-95 cursor-pointer z-10"
                      aria-label="Flip card to view contact info"
                    >
                      <RotateCw size={11} className="transition-transform group-hover:rotate-180 duration-500 text-cyan" />
                      <span>Hover to flip</span>
                    </button>

                    {/* Floating badge on photo */}
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
                      <span className="text-xs font-semibold font-mono text-cyan-muted dark:text-cyan">
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

                {/* 2. BACK FACE — Contact & WhatsApp Business Card */}
                <div
                  className="hero-flip-back relative rounded-3xl overflow-hidden bg-white/95 dark:bg-navy-900/95 border border-slate-200 dark:border-cyan/30 shadow-2xl p-5 backdrop-blur-xl flex flex-col justify-between"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header Area */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Direct Contact</span>
                      </div>

                      <button
                        type="button"
                        onClick={handleFlipBack}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:text-cyan-muted dark:hover:text-cyan border border-slate-200 dark:border-white/10 text-[11px] font-mono transition-colors active:scale-95 cursor-pointer z-20"
                        aria-label="Flip card back to profile"
                      >
                        <RotateCw size={11} />
                        <span>Flip back</span>
                      </button>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                      Aman Singh Negi
                    </h3>
                    <p className="text-xs font-mono text-cyan-muted dark:text-cyan font-medium mb-4">
                      Full-Stack Developer · Software Engineer
                    </p>
                  </div>

                  {/* Primary Channels Area */}
                  <div className="space-y-2.5 my-auto">
                    {/* Featured WhatsApp Button */}
                    <a
                      href="https://wa.me/917417158879"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-500/60 dark:hover:border-emerald-400 flex items-center justify-between group/wa transition-all shadow-sm"
                      aria-label="Chat with Aman Singh Negi on WhatsApp at +91 7417158879"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-sm">
                          <WhatsAppIcon size={18} />
                        </div>
                        <div>
                          <span className="block text-[11px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold">
                            WhatsApp Direct
                          </span>
                          <span className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">
                            +91 7417158879
                          </span>
                        </div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover/wa:translate-x-0.5 transition-transform">
                        <ArrowUpRight size={16} />
                      </div>
                    </a>

                    {/* Email Channel */}
                    <a
                      href={`mailto:${personalData.email}`}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-white/5 hover:border-cyan/40 flex items-center justify-between group/mail transition-all text-xs"
                      aria-label={`Send email to ${personalData.email}`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="p-1.5 rounded-lg bg-slate-200 dark:bg-navy-800 text-cyan-muted dark:text-cyan shrink-0">
                          <Mail size={14} />
                        </div>
                        <div className="truncate">
                          <span className="block text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                            Email
                          </span>
                          <span className="font-mono text-slate-800 dark:text-slate-200 truncate block">
                            {personalData.email}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight size={14} className="text-slate-400 group-hover/mail:text-cyan-muted dark:group-hover/mail:text-cyan shrink-0 ml-2" />
                    </a>

                    {/* Engineering Social Profiles Grid */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <a
                        href="https://github.com/amannegi001"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-white/5 hover:border-cyan/40 flex flex-col items-center justify-center gap-1 text-center transition-all group/soc"
                        aria-label="GitHub Profile"
                      >
                        <Github size={16} className="text-slate-700 dark:text-slate-300 group-hover/soc:text-cyan-muted dark:group-hover/soc:text-cyan transition-colors" />
                        <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-medium">
                          GitHub
                        </span>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/aman-negi-08a166386/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-white/5 hover:border-cyan/40 flex flex-col items-center justify-center gap-1 text-center transition-all group/soc"
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin size={16} className="text-slate-700 dark:text-slate-300 group-hover/soc:text-cyan-muted dark:group-hover/soc:text-cyan transition-colors" />
                        <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-medium">
                          LinkedIn
                        </span>
                      </a>
                      <a
                        href="https://leetcode.com/u/aman_negi_001/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-white/5 hover:border-cyan/40 flex flex-col items-center justify-center gap-1 text-center transition-all group/soc"
                        aria-label="LeetCode Profile"
                      >
                        <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 group-hover/soc:text-cyan-muted dark:group-hover/soc:text-cyan transition-colors">
                          [LC]
                        </span>
                        <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-medium">
                          LeetCode
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* Card Meta Stats Footer */}
                  <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span>Based in India</span>
                    <span className="text-cyan-muted dark:text-cyan font-medium">
                      Open for SDE Roles
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
