import React from 'react';
import { certificationsData } from '../data/portfolioData';
import { Award, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const Certifications = () => {
  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 text-cyan-muted dark:text-cyan font-mono text-xs uppercase tracking-widest mb-2 font-semibold">
            <span>04</span>
            <span className="w-8 h-[1px] bg-cyan/50"></span>
            <span>Accreditation & Achievements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-3">
            Certifications & competitive milestones.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Verified participation and foundational credentials in competitive software hackathons and AI engineering paradigms.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificationsData.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-navy-900/60 border border-slate-200 dark:border-white/10 hover:border-cyan/40 transition-all duration-300 flex flex-col justify-between backdrop-blur-xl shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-navy-800 text-cyan-muted dark:text-cyan">
                    <Award size={22} />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cyan/10 text-cyan-muted dark:text-cyan text-xs font-mono font-medium border border-cyan/20">
                    {cert.badgeText}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {cert.organization}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <ShieldCheck size={14} className="text-cyan-muted dark:text-cyan" />
                  Verified Credential
                </span>
                <span>{cert.year}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
