import React from 'react';
import { skillsData } from '../data/portfolioData';
import { Code, Terminal, Globe, Server, Database, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Languages':
      return <Terminal size={18} className="text-cyan-muted dark:text-cyan" />;
    case 'Frontend':
      return <Globe size={18} className="text-cyan-muted dark:text-cyan" />;
    case 'Backend':
      return <Server size={18} className="text-cyan-muted dark:text-cyan" />;
    case 'Database':
      return <Database size={18} className="text-cyan-muted dark:text-cyan" />;
    case 'Tools & Technologies':
      return <Wrench size={18} className="text-cyan-muted dark:text-cyan" />;
    default:
      return <Code size={18} className="text-cyan-muted dark:text-cyan" />;
  }
};

export const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 text-cyan-muted dark:text-cyan font-mono text-xs uppercase tracking-widest mb-2 font-semibold">
            <span>03</span>
            <span className="w-8 h-[1px] bg-cyan/50"></span>
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-3">
            Core stack & technical proficiencies.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            A focused toolkit spanning object-oriented programming, modern JavaScript frameworks, API architectures, and database modeling.
          </p>
        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((cat, idx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-white/80 dark:bg-navy-900/60 border border-slate-200 dark:border-white/10 hover:border-cyan/40 transition-all duration-300 backdrop-blur-xl shadow-sm"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-white/10">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-navy-800">
                  {getCategoryIcon(cat.category)}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  {cat.category}
                </h3>
              </div>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-navy-950/80 text-slate-800 dark:text-slate-200 text-xs font-mono font-medium border border-slate-200 dark:border-white/5 hover:border-cyan/40 hover:text-cyan-muted dark:hover:text-cyan transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
