import React from 'react';
import { GraduationCap, Code2, Compass, Camera, Trophy, Terminal } from 'lucide-react';
import { educationData, personalInterests } from '../data/portfolioData';
import { motion } from 'framer-motion';

export const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 text-cyan-muted dark:text-cyan font-mono text-xs uppercase tracking-widest mb-2 font-semibold">
            <span>01</span>
            <span className="w-8 h-[1px] bg-cyan/50"></span>
            <span>Background & Mindset</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Engineering end-to-end solutions from first principles.
          </h2>
        </div>

        {/* Grid: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Narrative & Technical Focus (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="portfolio-card p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-navy-900/60 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-cyan/30 backdrop-blur-xl shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2.5">
                <Code2 className="text-cyan-muted dark:text-cyan" size={22} />
                Full-Stack Architecture & Development
              </h3>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                <p>
                  I build web software with a focus on cohesive architecture — ensuring that database design, server-side APIs, and clientside user experiences work together seamlessly.
                </p>
                <p>
                  My engineering background spans structuring robust Node.js and Express RESTful services, enforcing authenticated authorization pipelines with JWT and bcrypt, and crafting reactive user interfaces in React.
                </p>
                <p>
                  Whether implementing complex connection mechanics and pagination in MongoDB or profiling DOM events for responsive client apps, I prioritize reliability, clean code structure, and maintainable systems.
                </p>
              </div>

              {/* Engineering Focus Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-200 dark:border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                  RESTful API Design & Validation
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                  State Management & Clean UI
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                  Database Indexing & Mongoose Schemas
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                  Security & Password Hashing
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Education & Secondary Interests (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Education Card */}
            <div className="portfolio-card p-6 rounded-2xl bg-white/80 dark:bg-navy-900/60 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-cyan/30 backdrop-blur-xl shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2 rounded-xl bg-cyan/10 text-cyan-muted dark:text-cyan">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Education
                  </h3>
                  <span className="text-xs font-mono text-cyan-muted dark:text-cyan font-medium">
                    B.Tech Computer Science & Engineering
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-white/5">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1">
                  {educationData.institution}
                </h4>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono mt-2">
                  <span>CGPA: <strong className="text-slate-900 dark:text-slate-200">{educationData.cgpa} / 10</strong></span>
                  <span>{educationData.graduation}</span>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-white/5 text-[11px] text-cyan-muted dark:text-cyan font-medium">
                  {educationData.statusNote}
                </div>
              </div>
            </div>

            {/* Secondary Interests Card */}
            <div className="portfolio-card p-6 rounded-2xl bg-white/80 dark:bg-navy-900/60 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-cyan/30 backdrop-blur-xl shadow-sm">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
                <Compass size={15} className="text-cyan-muted dark:text-cyan" />
                Interests & Problem Solving
              </h3>

              <div className="grid grid-cols-1 gap-2.5">
                {personalInterests.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/40 border border-slate-200 dark:border-white/5 flex items-start gap-3"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-200 dark:bg-navy-800 text-cyan-muted dark:text-cyan shrink-0 mt-0.5">
                      {idx === 0 ? <Terminal size={14} /> : idx === 1 ? <Camera size={14} /> : <Trophy size={14} />}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
